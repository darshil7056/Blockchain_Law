#!/bin/bash
# Script to instantiate chaincode
cp $FABRIC_CFG_PATH/core.yaml /vars/core.yaml
cd /vars
export FABRIC_CFG_PATH=/vars

export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_ID=cli
export CORE_PEER_ADDRESS=192.168.8.120:7005
export CORE_PEER_TLS_ROOTCERT_FILE=/vars/keyfiles/peerOrganizations/lawyer.auto.com/peers/peer1.lawyer.auto.com/tls/ca.crt
export CORE_PEER_LOCALMSPID=lawyer-auto-com
export CORE_PEER_MSPCONFIGPATH=/vars/keyfiles/peerOrganizations/lawyer.auto.com/users/Admin@lawyer.auto.com/msp
export ORDERER_ADDRESS=192.168.8.120:7009
export ORDERER_TLS_CA=/vars/keyfiles/ordererOrganizations/auto.com/orderers/orderer1.auto.com/tls/ca.crt

# 1. Fetch the channel configuration
peer channel fetch config config_block.pb -o $ORDERER_ADDRESS \
  --cafile $ORDERER_TLS_CA --tls -c autochannel

# 2. Translate the configuration into json format
configtxlator proto_decode --input config_block.pb --type common.Block \
  | jq .data.data[0].payload.data.config > autochannel_current_config.json
echo "--<<-->>--"

# 3. Update the current config in json with the organization anchor peer we want to add
jq '.channel_group.groups.Application.groups."lawyer-auto-com".values += {"AnchorPeers":{"mod_policy": "Admins","value":{"anchor_peers": [{"host": "192.168.8.120","port": 7005}]},"version": "0"}}' autochannel_current_config.json > autochannel_modified_anchor_config.json

# 4. Translate the current config in json format to protobuf format
configtxlator proto_encode --input autochannel_current_config.json \
  --type common.Config --output config.pb

# 5. Translate the desired config in json format to protobuf format
configtxlator proto_encode --input autochannel_modified_anchor_config.json \
  --type common.Config --output modified_config.pb

# 6. Calculate the delta of the current config and desired config
configtxlator compute_update --channel_id autochannel \
  --original config.pb --updated modified_config.pb \
  --output autochannel_anchor_update.pb

# 7. Decode the delta of the config to json format
configtxlator proto_decode --input autochannel_anchor_update.pb \
  --type common.ConfigUpdate | jq . > autochannel_anchor_update.json

# 8. Now wrap of the delta config to fabric envelop block
echo '{"payload":{"header":{"channel_header":{"channel_id":"autochannel", "type":2}},"data":{"config_update":'$(cat autochannel_anchor_update.json)'}}}' | jq . > autochannel_anchor_update_envelope.json

# 9. Encode the json format into protobuf format
configtxlator proto_encode --input autochannel_anchor_update_envelope.json \
  --type common.Envelope --output autochannel_anchor_update_envelope.pb

# 10. Need to sign anchor update envelop by org admin
peer channel update -o $ORDERER_ADDRESS --tls --cafile $ORDERER_TLS_CA \
  -f autochannel_anchor_update_envelope.pb -c autochannel

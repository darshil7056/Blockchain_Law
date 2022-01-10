#!/bin/bash
cd $FABRIC_CFG_PATH
# cryptogen generate --config crypto-config.yaml --output keyfiles
configtxgen -profile OrdererGenesis -outputBlock genesis.block -channelID systemchannel

configtxgen -printOrg citizen-auto-com > JoinRequest_citizen-auto-com.json
configtxgen -printOrg lawyer-auto-com > JoinRequest_lawyer-auto-com.json
configtxgen -printOrg police-auto-com > JoinRequest_police-auto-com.json

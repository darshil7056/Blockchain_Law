/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
// const crypto = require('crypto');

async function getCollectionName(ctx) {
    //const mspid = ctx.clientIdentity.getMSPID();
    //const collectionName = `_implicit_org_${mspid}`;
   const collectionName = `CollectionOrder`;
    return collectionName;
}

class SecureChatContract extends Contract {

    async secureChatExists(ctx, secureChatId) {
        const collectionName = await getCollectionName(ctx);
        const data = await ctx.stub.getPrivateDataHash(collectionName, secureChatId);
        return (!!data && data.length > 0);
    }

    async createSecureChat(ctx, secureChatId) {
        const mspID = ctx.clientIdentity.getMSPID();
            const chatAsset = {};
            const transientData = ctx.stub.getTransient();
            if (
                transientData.size === 0 ||
        !transientData.has('FIRId') ||
        !transientData.has('clientName') ||
        !transientData.has('message') ||
        !transientData.has('details')
            ) {
                throw new Error(
                    'The privateValue key was not specified in transient data. Please try again.'
                );
            }
            chatAsset.FIRId = transientData.get('FIRId').toString();
            chatAsset.clientName = transientData.get('clientName').toString();
            chatAsset.message = transientData.get('message').toString();
            chatAsset.details = transientData.get('details').toString();
            chatAsset.assetType = 'chat';

            const collectionName = await getCollectionName(ctx);
            await ctx.stub.putPrivateData(
                collectionName,
                secureChatId,
                Buffer.from(JSON.stringify(chatAsset))
            );
        } 

    async readSecureChat(ctx, secureChatId) {
        const exists = await this.secureChatExists(ctx, secureChatId);
        if (!exists) {
            throw new Error(`The asset secure chat ${secureChatId} does not exist`);
        }
        let privateDataString;
        const collectionName = await getCollectionName(ctx);
        const privateData = await ctx.stub.getPrivateData(collectionName, secureChatId);
        privateDataString = JSON.parse(privateData.toString());
        return privateDataString;
    }


//     async updateSecureChat(ctx, secureChatId) {
//         const exists = await this.secureChatExists(ctx, secureChatId);
//         if (!exists) {
//             throw new Error(`The asset secure chat ${secureChatId} does not exist`);
//         }
//         const privateAsset = {};

//         const transientData = ctx.stub.getTransient();
//         if (transientData.size === 0 || !transientData.has('privateValue')) {
//             throw new Error('The privateValue key was not specified in transient data. Please try again.');
//         }
//         privateAsset.privateValue = transientData.get('privateValue').toString();

//         const collectionName = await getCollectionName(ctx);
//         await ctx.stub.putPrivateData(collectionName, secureChatId, Buffer.from(JSON.stringify(privateAsset)));
//     }

//     async deleteSecureChat(ctx, secureChatId) {
//         const exists = await this.secureChatExists(ctx, secureChatId);
//         if (!exists) {
//             throw new Error(`The asset secure chat ${secureChatId} does not exist`);
//         }
//         const collectionName = await getCollectionName(ctx);
//         await ctx.stub.deletePrivateData(collectionName, secureChatId);
//     }

//     async verifySecureChat(ctx, mspid, secureChatId, objectToVerify) {

//         // Convert provided object into a hash
//         const hashToVerify = crypto.createHash('sha256').update(objectToVerify).digest('hex');
//         const pdHashBytes = await ctx.stub.getPrivateDataHash(`_implicit_org_${mspid}`, secureChatId);
//         if (pdHashBytes.length === 0) {
//             throw new Error('No private data hash with the key: ' + secureChatId);
//         }

//         const actualHash = Buffer.from(pdHashBytes).toString('hex');

//         // Compare the hash calculated (from object provided) and the hash stored on public ledger
//         if (hashToVerify === actualHash) {
//             return true;
//         } else {
//             return false;
//         }
//     }


}

module.exports = SecureChatContract;

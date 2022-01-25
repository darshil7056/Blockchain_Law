'use strict';
const { Contract } = require("fabric-contract-api");

class sampleContract extends Contract {

    async createAsset(ctx, assetId) {
        const asset = {
            name:"darsh",
            
        }
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(assetId, buffer);
    }

    async readAsset(ctx,assetId){
          const buffer =  await ctx.stub.getState(assetId);
          const asset = JSON.parse(buffer);
          return asset;
    }

}
module.exports = sampleContract;
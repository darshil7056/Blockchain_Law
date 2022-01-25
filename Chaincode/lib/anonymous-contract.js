/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';
const { Contract } = require('fabric-contract-api');

class AnonymousContract extends Contract 
{

    async GenerateReport(
        ctx,
        reportId,
        crime_type,
        offense_date,
        offense_time,
        description,
        area,
        victim_name,
        victim_address,
        suspect_name,
        suspect_address,
    )
    {
        const ReportAsset = {
            crime_type,
            offense_date,
            offense_time,
            description,
            area,
            victim_name,
            victim_address,
            suspect_name,
            suspect_address,
            assetType: 'reportcrime',
            
        };
        const buffer = Buffer.from(JSON.stringify(ReportAsset));
        await ctx.stub.putState(reportId, buffer);
    
        
    }

    async readReport(ctx, reportId) {
      
        const buffer = await ctx.stub.getState(reportId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }
    async queryAllReport(ctx) {
        const queryString = {
            selector: {
                assetType: 'reportcrime',
            },
        };
        let resultIterator = await ctx.stub.getQueryResult(
            JSON.stringify(queryString)
        );
        let result = await this.getAllResults(resultIterator, false);
        return JSON.stringify(result);
    }
    async getAllResults(iterator, isHistory) {
        let allResult = [];

        for (
            let res = await iterator.next();
            !res.done;
            res = await iterator.next()
        ) {
            if (res.value && res.value.value.toString()) {
                let jsonRes = {};

                if (isHistory && isHistory === true) {
                    jsonRes.TxId = res.value.tx_id;
                    jsonRes.timestamp = res.value.timestamp;
                    jsonRes.Value = JSON.parse(res.value.value.toString());
                } else {
                    jsonRes.Key = res.value.key;
                    jsonRes.Record = JSON.parse(res.value.value.toString());
                }
                allResult.push(jsonRes);
            }
        }
        await iterator.close();
        return allResult;
    }


}
module.exports = AnonymousContract;
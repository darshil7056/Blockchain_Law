/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';
const { Contract } = require('fabric-contract-api');

class PoliceContract extends Contract 
{

    async FIRExists(ctx, FIRId) {
        const buffer = await ctx.stub.getState(FIRId);
        return !!buffer && buffer.length > 0;
    }
    async createFIR(
        ctx,
        FIRId,
        case_status,
        law_name,
        offense_date,
        offense_time,
        description,
        station_name,
        witness_name,
        witness_age,
        witness_address,
        id_proof_status,
    )
    {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID === 'police-auto-com'){
            const exists = await this.FIRExists(ctx, FIRId);
            if (exists) {
                throw new Error(`The FIR ${FIRId} already exists`);
            }
            const FIRAsset = {
                FIRId,
                case_status,
                law_name,
                offense_date,
                offense_time,
                description,
                station_name,
                witness_name,
                witness_age,
                witness_address,
                id_proof_status,
            };
            const buffer = Buffer.from(JSON.stringify(FIRAsset));
            await ctx.stub.putState(FIRId, buffer);
        } else {
            return `User under following MSP:${mspID} cannot able to perform this action`;
        }
       
    
        
    }

    async readFIR(ctx, FIRId) {
      
        const buffer = await ctx.stub.getState(FIRId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async registerCase(ctx, FIRId, station_name,case_status) 
    {

            const caseBuffer = await ctx.stub.getState(FIRId);
            const caseDetails = JSON.parse(caseBuffer.toString());

            caseDetails.status = `Case status is ${case_status} and case is registered at ${station_name}`;
            caseDetails.station_name = station_name;

            const newCaseBuffer = Buffer.from(JSON.stringify(caseDetails));
            await ctx.stub.putState(FIRId, newCaseBuffer);

    }
    // async createWarrant(ctx, warrantId,station_name,accused_name,law_name)
    // {
    //     const WarrantAsset = {
    //         station_name,
    //         accused_name,
    //         offense_date,
    //         offense_time,
    //         law_name,
    //     };
    //     const buffer = Buffer.from(JSON.stringify(WarrantAsset));
    //     await ctx.stub.putState(warrantId, buffer);
    // }
    // async readWarrant(ctx, warrantId) {
      
    //     const buffer = await ctx.stub.getState(warrantId);
    //     const asset = JSON.parse(buffer.toString());
    //     return asset;
    // }
    async queryAllCases(ctx) 
    {
        const queryString = {
            selector: {
                case_status: 'true',
            },
       
        };
        let resultIterator = await ctx.stub.getQueryResult(
            JSON.stringify(queryString)
        );
        let result = await this.getAllResults(resultIterator, false);
        return JSON.stringify(result);
    }

    async getCaseHistory(ctx, FIRId)
    {
        let resultsIterator = await ctx.stub.getHistoryForKey(FIRId);
        let results = await this.getAllResults(resultsIterator, true);
        return JSON.stringify(results);
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
                    jsonRes.FIRId = res.value.FIRId;
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
module.exports = PoliceContract;
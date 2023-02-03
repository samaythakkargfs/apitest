const { Test } = require("supertest")

request = require("supertest")
testdata = require("../config.json")
describe("Validate that conversion from unix timestamp to date string is working as expected", ()=>{
    const baseUrl = testdata.BaseURL
    const unixTimeStampConverterEndpoint = testdata.UnixTimestampConverterEndpoint

    test.each`
    time   |   resType   |statusCode
    ${"2016-01-01 2:3:22"} | ${"number"} |   ${200}
    ${"2022-01-01 2:3:22"} | ${"number"} |   ${200}
    ${"2025-01-01 2:3:22"} | ${"number"} |   ${200}
    ${"2200-01-01 2:3:22"} | ${"number"} |   ${200}
    ${"3000-01-01 2:3:22"} | ${"number"} |   ${200}
    ${"2023-15-02 2:3:22"} | ${"boolean"} |   ${200}
    ${"2023-01-90 2:3:22"} | ${"boolean"} |   ${200}
    ${"2023-01-01 222:30:22"} | ${"boolean"} |   ${200}
    ${"2023-01-01 2:322:22"} | ${"boolean"} |   ${200}
    ${"2023-01-01 2:3:999999999"} | ${"number"} |   ${200}
    ${"2023-01-01"} | ${"number"} |   ${200}
    ${"2:3:999999999"} | ${"number"} |   ${200}

    `('returns $resType and $statusCode when passed time as $time',async ({resType, statusCode, time})=>{
        const d = new Date()
        const res = await request(baseUrl).get(unixTimeStampConverterEndpoint).query({cached:"true",s:time});
        await expect(res.statusCode).toBe(statusCode)
        await expect(typeof res.body).toBe(resType)
        if(resType == "boolean"){
            await expect(res.body).toBe(false)
        }
    })


})

describe("Validate that conversion from date string to unix times stamp is working as expected", ()=>{
    const baseUrl = testdata.BaseURL
    const unixTimeStampConverterEndpoint = testdata.UnixTimestampConverterEndpoint
    test.each`
    timestamp   |   resType   |statusCode
    ${1000} | ${"string"} |   ${200}
    ${123123} | ${"string"} |   ${200}
    ${-10000} | ${"string"} |   ${200}
    ${-1000000000} | ${"string"} |   ${200}
    ${1451613802} | ${"string"} |   ${200}
    ${"asdfas"}|${"boolean"} | ${200}
    ${"++"}|${"boolean"} | ${200}
    ${""}|${"boolean"} | ${200}
    `('returns $resType and $statusCode when passed timestamp as $timestamp',async ({resType, statusCode, timestamp})=>{
        const d = new Date()
        const res = await request(baseUrl).get(unixTimeStampConverterEndpoint).query({cached:"true",s:timestamp});
        await expect(res.statusCode).toBe(statusCode)
        await expect(typeof res.body).toBe(resType)
        if(resType == "boolean"){
            await expect(res.body).toBe(false)
        }
        if(timestamp == 1451613802){
            await expect(res.body).toBe("2016-01-01 02:03:22")
        }
    })


})
import { Handler, Context } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk'

const TABLE_NAME: string = 'discord-resources'

console.log("hey")

function mockCallback(error, data){
    const retObj = {
        error: error,
        data: data
    }
    console.log(retObj)
}

const handler = (event, context: Context, callback) => {
    return "HELLO"warn
    console.warn("lessss gooooo")
    console.log("lessss gooooo")
    // try{ 
    // const DDBClient = new DynamoDB.DocumentClient()
    // console.log(DDBClient)
    // } catch(e){
    //     callback(e,null)
    // }
    callback(null, "YOOOOOO")
    callback("dududu", null)

    // const params = { 
    //     TableName: TABLE_NAME,
    //     Key:{
    //     "primary_key1": "article",
    //     },
    // }
    //
    // DDBClient.get(params, function(err, data){
    //     if(err) callback("yo", null)
    //     else return callback(null, data)
    // })

};

handler(null,null,mockCallback)

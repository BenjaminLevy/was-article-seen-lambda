import { Handler, Context } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk'

const TABLE_NAME: string = 'discord-resources'



export const handler: Handler = async (event, context: Context, callback) => {
    try{ 
    const DDBClient = new DynamoDB.DocumentClient()
    console.log(DDBClient)
    } catch(e){
        callback(e,null)
    }
    callback(null, "YOOOOOO")
    return callback("dududu", null)

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

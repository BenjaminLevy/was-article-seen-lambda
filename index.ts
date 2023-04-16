import { Handler, Context } from 'aws-lambda';
import { DynamoDBClient, ListTablesCommand, GetItemCommand, BatchGetItemCommand, BatchGetItemInput, KeysAndAttributes} from '@aws-sdk/client-dynamodb'



const TABLE_NAME: string = 'discord-resources'
const batchInput: BatchGetItemInput = {
    RequestItems: {
        'discord-resources': {
           Keys: [
                {
                    "resource-name": {
                      "S": "pubmedArticle"
                    },
                    "sort-key": {
                      "S": "37037067#10.1016/j.bbrc.2023.03.084"
                    }
                },
                {
                    "resource-name": {
                      "S": "article"
                    },
                    "sort-key": {
                      "S": "10.1097/JCMA.0000000000000921"
                    }
                },
                {
                    "resource-name": {
                      "S": "article"
                    },
                    "sort-key": {
                      "S": "asdasdas"
                    }
                }
            ],
        ProjectionExpression: "#S, serverMap",
        ExpressionAttributeNames: {"#S": "sort-key"}
        }
    }
}


const input = {
  "Key": {
    "resource-name": {
      "S": "pubmedArticle"
    },
    "sort-key": {
      "S": "37037067#10.1016/j.bbrc.2023.03.084"
    }
  },
  "TableName": TABLE_NAME 
};

const AWS_REGION: string = 'us-east-1'
const client = new DynamoDBClient({ region: AWS_REGION });


export const handler: Handler = async (event, context: Context, callback) => {
  // const command = new GetItemCommand(input)
  const command = new BatchGetItemCommand(batchInput)
  try {
    const results = await client.send(command);
    const res = results
    console.log(res);
    callback(null,res)
  } catch (err) {
    console.error(err);
    callback(err,null)
  }
    // try{ 
    // const DDBClient = new DynamoDB.DocumentClient()
    // console.log(DDBClient)
    // } catch(e){
    //     callback(e,null)
    // }
    // callback(null, "YOOOOOO")
    // return callback("dududu", null)

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

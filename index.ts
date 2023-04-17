import { Handler, Context } from 'aws-lambda';
import { DynamoDBClient, ListTablesCommand, GetItemCommand, BatchGetItemCommand, BatchGetItemInput, KeysAndAttributes, BatchGetItemCommandOutput, BatchGetItemCommandInput} from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, BatchGetCommand, BatchGetCommandInput } from "@aws-sdk/lib-dynamodb"; // ES6 import


const TABLE_NAME: string = 'discord-resources'
const batchInput: BatchGetItemCommandInput = {
    RequestItems: {
        discordResources: {
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
const batchInputCommandForDocClient = new BatchGetCommand({
          RequestItems: {
            'discord-resources': {
              Keys: [
                {
                  "resouce-name": "pubmedArticle",
                  "sort-key": "37037067#10.1016/j.bbrc.2023.03.084",
                },
                {
                  "resouce-name": "article",
                  "sort-key": "10.1097/JCMA.0000000000000921",
                },
              ],
              // For this use case, the data does not changed often so why not get the
              // reads at half the cost? Your use case might be different and need true.
              ConsistentRead: false,
            },
          },
          //This line returns in the response how much capacity the batch get uses
          ReturnConsumedCapacity: "TOTAL",
        })
const batchInputForDocClient: BatchGetCommandInput = {
    RequestItems: {
        'discord-resources': {
           Keys: [
                {
                    "resource-name": "pubmedArticle",
                    "sort-key": "37037067#10.1016/j.bbrc.2023.03.084"
                    
                },
                {
                    "resource-name": "article",
                    "sort-key": "10.1097/JCMA.0000000000000921"
                    
                }
            ],
        ProjectionExpression: "#S, serverMap",
        ExpressionAttributeNames: {"#S": "sort-key"}
        }
    }
}
let testInput = new BatchGetCommand(batchInputForDocClient)

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
const baseClient = new DynamoDBClient({ region: AWS_REGION });
const client = DynamoDBDocumentClient.from(baseClient); // client is DynamoDB client

function parseResults(res: BatchGetItemCommandOutput){
 let resWithoutMetadata = res.Responses[TABLE_NAME]
  return [resWithoutMetadata, "hello"]
  resWithoutMetadata.map((item) => {
    for(const key in item){
      item 
      const extraKeyObject = item[key]
      item[key] = Object.values(extraKeyObject)
    }
  })
}

export const handler: Handler = async (event, context: Context, callback) => {
  // const command = new GetItemCommand(input)
  // const command = new BatchGetCommand(batchInput)
  try {
    const results = await client.send(testInput);
    const res = parseResults(results)
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

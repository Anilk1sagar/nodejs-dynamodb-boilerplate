import AWS from 'aws-sdk';
import AwsConfigInit from '../../utils/awsConfig';

AwsConfigInit();

let dynamodb = new AWS.DynamoDB();

let params = {
    TableName : "movies",
    KeySchema: [       
        { AttributeName: "id", KeyType: "HASH"}
    ],
    AttributeDefinitions: [       
        { AttributeName: "id", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, (err, data) => {

    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
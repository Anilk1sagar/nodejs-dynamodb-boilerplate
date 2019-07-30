import AWS from 'aws-sdk';
import AwsConfigInit from '../../utils/awsConfig';

AwsConfigInit();

let dynamodb = new AWS.DynamoDB();

let params = {
    TableName : "tests",
    KeySchema: [       
        { AttributeName: "name", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "name", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
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
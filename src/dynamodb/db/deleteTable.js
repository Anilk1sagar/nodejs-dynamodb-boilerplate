import AWS from 'aws-sdk';
import AwsConfigInit from '../../utils/awsConfig';

AwsConfigInit();

let dynamodb = new AWS.DynamoDB();

let params = {
    TableName : "movies"
};

dynamodb.deleteTable(params, (err, data) => {

    if (err) {
        console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
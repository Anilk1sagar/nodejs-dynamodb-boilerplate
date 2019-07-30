import AWS from 'aws-sdk';
import fs from 'fs';
import AwsConfigInit from '../../utils/awsConfig';

AwsConfigInit();

let tableName = "tests";
let interfaceDb = new AWS.DynamoDB.DocumentClient();

console.log("Importing movies into DynamoDB. Please wait.");

let allMovies = JSON.parse(fs.readFileSync('dummy/moviedata.json', 'utf8'));

// allMovies.forEach((movie) => {

//     let params = {
//         TableName: tableName,
//         Item: {
//             "year":  movie.year,
//             "title": movie.title,
//             "info":  movie.info
//         }
//     };

//     interfaceDb.put(params, (err, data) => {
//         if (err) {
//             console.error("Unable to add movie", movie.title, ". Error JSON:", JSON.stringify(err, null, 2));
//         } else {
//             console.log("PutItem succeeded:", movie.title, data);
//         }
//     });
// });
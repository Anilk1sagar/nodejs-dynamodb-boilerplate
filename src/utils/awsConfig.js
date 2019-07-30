import AWS from 'aws-sdk';

export default () => {
    
    AWS.config.update({
        region: "ap-south-1",
        endpoint: "http://localhost:8000",
        // accessKeyId: AWS_ACCESS_KEY_ID,
        // secretAccessKey: AWS_SECRET_ACCESS_KEY
    });
}
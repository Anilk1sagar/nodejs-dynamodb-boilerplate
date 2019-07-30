import Express from "express";
import Routes from './../routes';
import AWS from 'aws-sdk';


export default {

    /**
     * Queries a Baz for items.
     * @param {Express} app 
     * @param {AWS.DynamoDB.DocumentClient} dynamodb,
     * or itemId, or null to search everything.
    */

    initRoutes: (app, dynamodb) => {
        
        let routes = Routes(app, dynamodb);
        
        console.log("_initRoutes");
        
        app.use("/api", routes);

        return app;

    }

    
}
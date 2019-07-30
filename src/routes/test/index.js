import Express from "express";
import AWS from 'aws-sdk';

//Routes
import TestRoutes from './test';


/**
 * Queries a Baz for items.
 * @param {Express} app Subgroup id to query.
 * @param {AWS.DynamoDB.DocumentClient} dynamodb,
 * or itemId, or null to search everything.
 */

export default (app, dynamodb) => {

    let testRoutes = TestRoutes(app, dynamodb);


    return {
        add: testRoutes.add,
        getAll: testRoutes.getAll
    }
}
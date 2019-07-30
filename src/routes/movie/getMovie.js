import Express from 'express';
import _ from 'lodash';
import AWS from 'aws-sdk';

//Interfaces
import { DynamodbMovie } from '../../dynamodb/interface';


/**
 * Queries a Baz for items.
 * @param {Express} app Subgroup id to query.
 * @param {AWS.DynamoDB.DocumentClient} dynamodb,
 * or itemId, or null to search everything.
 */

export default (app, dynamodb) =>  {

    let dynamodbMovie = DynamodbMovie(app, dynamodb);


    /**
     * @param {Request} req 
     * @param {Response} res 
     * @param {*} next
     */
    let getAllByQuery = async (req, res, next) => {

        let { year, title } = req.query;

        try {

            // let year = 2013;
            // let title = "Rush";


            let dbObject = await dynamodbMovie.getAllByQuery(year, title);

            // console.log("GetItem succeeded: ", dbObject);


            return res.status(200).json(dbObject);

        } catch (e) {
            next(e);
        }
    }


    /**
     * @param {Request} req 
     * @param {Response} res 
     * @param {*} next
     */
    let getAll = async (req, res, next) => {

        try {

            let dbObject = await dynamodbMovie.getAll();

            // console.log("GetItem succeeded: ", dbObject);

            return res.status(200).json(dbObject);

        } catch (e) {
            next(e);
        }
    }



    return {
        getAllByQuery: getAllByQuery,
        getAll: getAll
    }

}
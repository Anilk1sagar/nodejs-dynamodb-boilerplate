import Express from 'express';
import _ from 'lodash';
import AWS from 'aws-sdk';
import Moment from 'moment';

//Interfaces
import { DynamodbTest } from './../../dynamodb/interface';


/**
 * Queries a Baz for items.
 * @param {Express} app Subgroup id to query.
 * @param {AWS.DynamoDB.DocumentClient} dynamodb,
 * or itemId, or null to search everything.
 */

export default (app, dynamodb) =>  {

    // let dynamodbTest = DynamodbTest(app, dynamodb);


    /**
    * @param {Request} req 
    * @param {Response} res 
    * @param {*} next 
    */
    let add = async (req, res, next) => {
        
        // req.checkBody("name", "Enter a valid name.").isAscii();

        var errors = await req.validationErrors();

        if (errors) {
            errors = _.first(errors);
            let errValidation = {
                code: 400,
                message: errors.msg
            };
            return next(errValidation);
        }


        let { name } = req.body;
        
        try {

            // let dbModel = {
            //     name: name
            // }

            // console.log(dbModel);

            // let dbObject = await dynamodbTest.add(dbModel);

            // console.log("Test added: ", dbObject);


            // return res.status(200).json(dbObject);

        } catch (e) {
            next(e);
        }
    };


    /**
    * @param {Request} req 
    * @param {Response} res 
    * @param {*} next
    */
   let getAll = async (req, res, next) => {

    try {

        // let dbObject = await dynamodbTest.getAll();


        // return res.status(200).json(dbObject);

    } catch (e) {
        next(e);
    }
}



    return {
        add: add,
        getAll: getAll
    }

}
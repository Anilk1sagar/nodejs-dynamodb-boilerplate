import Express from 'express';
import _ from 'lodash';
import fs from 'fs';
import AWS from 'aws-sdk';
import Moment from 'moment';

//Interfaces
import { DynamodbMovie } from './../../dynamodb/interface';


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
    let add = async (req, res, next) => {
        
        req.checkBody("title", "Enter a valid title.").isAscii();

        var errors = await req.validationErrors();

        if (errors) {
            errors = _.first(errors);
            let errValidation = {
                code: 400,
                message: errors.msg
            };
            return next(errValidation);
        }


        let { title, year, image, rating } = req.body;
        
        try {

            let dbModel = {
                title: title,
                year: parseInt(year),
                image: image,
                rating: parseFloat(rating)
            }

            console.log("dbModel is: ", dbModel);

            let dbObject = await dynamodbMovie.add(dbModel);

            console.log("Movie added: ", dbObject);

            return res.status(200).json(dbObject);

        } catch (e) {
            next(e);
        }
    };


    /* Update Movie */
    let update = async (req, res, next) => {
        
        req.checkParams("id", "Enter a valid id.").isAscii();

        var errors = await req.validationErrors();

        if (errors) {
            errors = _.first(errors);
            let errValidation = {
                code: 400,
                message: errors.msg
            };
            return next(errValidation);
        }

        let { id } = req.params;
        let { title, year, image, rating  } = req.body;
        
        try {

            /* Checking Movie */
            let movie = await dynamodbMovie.getById(id);

            if (_.isEmpty(movie)) {
                return res.boom.notAcceptable("Movie does not exist.");
            }

            let dbModel = {
                title: title,
                year: parseInt(year),
                image: image,
                rating: parseFloat(rating)
            }

            console.log("dbModel is: ", dbModel);

            let isUpdated = await dynamodbMovie.update(id, dbModel);

            console.log("Movie Updated: ", isUpdated);


            return res.status(200).json({
                isUpdated: isUpdated
            });

        } catch (e) {
            next(e);
        }
    };


    /* Delete Movie */
    let remove = async (req, res, next) => {

        req.checkParams("id", "Enter a valid id.").isAscii();

        var errors = await req.validationErrors();

        if (errors) {
            errors = _.first(errors);
            let errValidation = {
                code: 400,
                message: errors.msg
            };
            return next(errValidation);
        }

        let { id } = req.params;

        try {

            /* Checking Movie */
            let movie = await dynamodbMovie.getById(id);

            if (_.isEmpty(movie)) {
                return res.boom.notAcceptable("Movie does not exist.");
            }
            

            let isDeleted = await dynamodbMovie.remove(id);
            console.log("Movie Deleted : ", isDeleted);


            return res.status(200).json({
                isDeleted: isDeleted
            });


        } catch (e) {

            next(e);
        }
    };


    return {
        add: add,
        update: update,
        remove: remove
    }

}
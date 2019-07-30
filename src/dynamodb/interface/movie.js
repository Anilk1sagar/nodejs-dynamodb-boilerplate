import Express from 'express';
import _ from 'lodash';
import AWS from 'aws-sdk';
import moment from 'moment';
import AwsConfigInit from '../../utils/awsConfig';
import logger from "./../../utils/logger";
import dataProcessor from '../../utils/dataProcessor';
import common from '../../utils/common';

//Models
import { ModelMovie } from './../modelTypes';


/**
 * Queries a Baz for items.
 * @param {Express} app Subgroup id to query.
 * @param {AWS.DynamoDB.DocumentClient} dynamodb,
 * or itemId, or null to search everything.
 */
export default function (app, dynamodb)  {

	/*
	 * need to debug it is getting called multiple times
	 * to check uncomment  logger 
	 */
    //log.info("********* Movie controller started ***********");

    AwsConfigInit();
    let dbTable = "movies";


    /**  
     * Get By Id
     * @param {string} pId
     * @return {Promise<ModelMovie>}
     */
    let getById = async (pId) => {

        try {

            let params = {
                TableName: dbTable,
                Key: {
                    "id": pId
                }
            };

            let dbObject = await dynamodb.get(params).promise();


            console.log("GetById succeeded: ", dbObject);

            return dbObject.Item;

        } catch (err) {

            logger.error("error in Movie.getItem {}", err);
            throw err;
        }
    };


    /**  
     * Get All By Query
     * @param {number} pYear
     * @param {string} title
     * @return {Promise<ModelMovie[]>}
     */
    let getAllByQuery = async (pYear, pTitle) => {

        console.log("Interface: ", pYear, pTitle);

        try {

            let params = {
                TableName: dbTable,
                ProjectionExpression: "#yr, title, info.rating",
                FilterExpression: "#yr between :start_yr and :end_yr",
                ExpressionAttributeNames: {
                    "#yr": "year",
                    "title": "title"
                },
                ExpressionAttributeValues: {
                     ":start_yr": 1950,
                     ":end_yr": 1959 
                }
            };


            let dbObject = await dynamodb.scan(params).promise();

            console.log("GetItem succeeded: ", dbObject);

            return dbObject.Items;

        } catch (err) {

            logger.error("error in Movie.getAllByQuery {}", err);
            throw err;
        }
    };


    /**  
     * Get All
     * @return {Promise<ModelMovie[]>}
     */
    let getAll= async () => {

        try {

            let params = {
                TableName: dbTable
            };


            let dbObject = await dynamodb.scan(params).promise(); 

            console.log("GetItem succeeded: ", dbObject);

            if(_.isEmpty(dbObject.Items)) return [];

            
            return dbObject.Items;

        } catch (err) {

            logger.error("error in Movie.getAll {}", err);
            throw err;
        }
    };


    /**  
     * Add Movie
     * @param {ModelMovie} pModel
     * @return {Promise<ModelMovie>}
     */
    let add = async (pModel) => {

        try {

            pModel["id"] = common.generateUUID();
            pModel["createdAt"] = moment().toISOString();
            pModel["updatedAt"] = moment().toISOString();

            let params = {
                TableName: dbTable,
                Item: pModel,
                ReturnValues: 'ALL_OLD'
            };

            // console.log("Interface Params: ", params);

            let dbObject = await dynamodb.put(params).promise();

            console.log("PutItem succeeded: ", dbObject);

            return pModel;

        } catch (err) {

            logger.error("error in Movie-dynamodb.add {}", err);
            throw err;
        }
    };


    /**
     * Update Channel
     * @param {string} pId 
     * @param {ModelMovie} pModel
     */
    let update = async (pId, pModel) => {

        if (_.isEmpty(pModel)) return false;

        let dbModel = {};

        if (pModel.title) {
            dbModel.title = pModel.title;
        }
        if (pModel.year) {
            dbModel.year = pModel.year;
        }
        if (pModel.image) {
            dbModel.image = pModel.image;
        }
        if (pModel.rating) {
            dbModel.rating = pModel.rating;
        }
        dbModel.updatedAt = moment().toISOString();


        try {

            let params = {
                TableName: dbTable,
                Key:{
                    "id": pId
                },
                UpdateExpression: "set title=:t, updatedAt=:updt",
                ExpressionAttributeValues: {
                    ":t": dbModel.title,
                    ":img": dbModel.image,
                    ":updt": dbModel.updatedAt
                },
                ReturnValues:"UPDATED_NEW"
            };

            console.log("Updating the item...");

            // Updating
            let dbObject = await dynamodb.update(params).promise();

            console.log("Interface Movie update: ", dbObject);

            if (_.isEmpty(dbObject)) return false;

            return true;

        } catch (err) {

            logger.error("error in Movie-dynamodb.update {}", err);
            throw err;
        }
    };



    /**
     * Delete Movie
     * @param {string} pId 
     */
    let remove = async (pId) => {

        console.log(pId);

        try {

            let params = {
                TableName: dbTable,
                Key:{
                    "id": pId
                },
                ReturnValues: 'ALL_OLD'
            };

            console.log("Deleting the item...");

            // Deleting
            let dbObject = await dynamodb.delete(params).promise();

            console.log("Interface Movie Deleted: ", dbObject);

            if(!_.isEmpty(dbObject)) {
                return true;
            } else {
                return false;
            }

        } catch (err) {

            logger.error("error in Movie-dynamodb.Delete {}", err);
            throw err;
        }
    };



    return {
        getById: getById,
        getAllByQuery: getAllByQuery,
        getAll: getAll,
        add: add,
        update: update,
        remove: remove
    };
}
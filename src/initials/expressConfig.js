import Express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import Boom from 'express-boom';
import cors from 'cors';
import path from 'path';
import util from 'util';
import morgan from 'morgan';
import Validator from 'express-validator';
import RouterConfig from './routerConfig';
// Dynamodb
import AWS from 'aws-sdk';
import AwsConfigInit from './../utils/awsConfig';


export default {

    /**
     * Queries a Baz for items.
     * @param {Express} app Subgroup id to query.
     * @param {string|null} publicKey An itemName,
     * or itemId, or null to search everything.
    */

    configure: async (app, publicKey) => {

        console.log(__dirname);
        app.use('/', express.static(path.join(__dirname, './../../public')));
        app.use(morgan('dev'));

        app.use(bodyParser.urlencoded({
            extended: true,
            limit: 1024 * 1024 * 100,
            parameterLimit: 100000
        }));

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cookieParser());

        app.use(cors());

        app.use(Validator());
        app.use(Boom());

        global.util = util;

        /* Dynamodb Initialize */
        AwsConfigInit();
        let dynamodb = new AWS.DynamoDB.DocumentClient();

        app = RouterConfig.initRoutes(app, dynamodb);

        return app;

    }
}
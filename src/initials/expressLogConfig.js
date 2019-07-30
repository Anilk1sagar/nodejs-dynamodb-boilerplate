import Express from "express";
import logger from './../utils/logger';
const expressWinston = require('express-winston');


export default {

    /**
     * Queries a Baz for items.
     * @param {Express} app Subgroup id to query.
    */
   
    configure: (app) => {

        app.use(expressWinston.logger({
            winstonInstance: logger
        }));

        return app;
    }
}

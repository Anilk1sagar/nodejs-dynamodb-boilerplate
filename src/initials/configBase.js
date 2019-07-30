import  express from "express";
import  ExpressConfig from "./expressConfig";
import  ExpressLogConfig from "./expressLogConfig";
import  Config from "./../utils/config";


// var winston = require('winston');
// var expressWinston = require('express-winston');

export default {

    configure: async ()=> {

        let app = express();
        
        app = await ExpressConfig.configure(app,  Config.webtokenSecretAccess());
        
        app= ExpressLogConfig.configure(app);

        //console.log(app);

        return app;
    }



}
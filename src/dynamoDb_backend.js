import Express from 'express';
import http from 'http';
import ConfigBase from './initials/configBase';
import Config from "./utils/config";
import EnvSetup from './utils/env_setup';


//Environment Setup
EnvSetup.init();


// ====================== Server Configurations =====================//

console.log("Server PORT: ", process.env.API_PORT);

let server = {};

ConfigBase.configure().then((app) => {
    
    server = http.createServer(app);

    server.listen(Config.apiPort(), function () {
        console.log("Server is Listening on ", Config.apiPort());
    });
}).catch((error) => {
    __logErrorAndExit("unable to start", error);
});




function __logErrorAndExit(message, err) {
    console.log("message|| ", message);
    console.log("error|| ", err);
    logger.debug(" error __logErrorAndExit {}", err);
    setTimeout(function () {
        process.exit();
    }, 3000);
}

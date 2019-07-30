import Config from './../utils/config'
import logger from './../utils/logger';


export default function errorHandler(err, req, res, next) {

    logger.info("*********************** errorHandler started **********************");

    console.log("working error");
    if (!err) {
        return res.sendStatus(500);
    }


    const error = {
        message: err.message || 'Internal Server Error.',
    };

    if (Config.isProduction()) {
        error.stack = {};
    } else {
        error.stack = err.stack;
    }

    // if (process.env.RUN_MODE==='dev') {
    //   error.stack = err.stack;
    // }

    if (err.errors) {

        error.errors = {};

        const { errors } = err;

        for (const type in errors) {
            if (type in errors) {
            error.errors[type] = errors[type].message;
            }
        }
    }

    console.log(err);
    //log.info("dede");
    //res.status(err.status || 500).json(error);
    logger.debug(" error middleware {}", err);
    res.status(err.code || 500).json(error);

}
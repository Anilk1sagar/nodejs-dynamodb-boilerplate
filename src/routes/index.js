import Express from "express";
import Router from 'express';
import AWS from 'aws-sdk';

// Middleware
import errorHandler from './../middleware/errorHandler';

//Routes Path
import Test from './test';
import Movie from './movie';



/**
 * Queries a Baz for items.
 * @param {Express} app 
 * @param {AWS.DynamoDB.DocumentClient} dynamodb,
 * or itemId, or null to search everything.
*/

export default (app, dynamodb) => {
    
    let routes = Router();

    
    /* ==== Test Routes ==== */
    const test = Test(app, dynamodb);
    routes.post('/test/add', test.add);
    routes.get('/test/getAll', test.getAll);



    /* ==== Movie Routes ==== */
    const movie = Movie(app, dynamodb);
    routes.post('/movie/add', movie.add);
    routes.put('/movie/update/:id', movie.update);
    routes.delete('/movie/delete/:id', movie.remove);
    //Get
    routes.get('/movie/getAllByQuery', movie.getAllByQuery);
    routes.get('/movie/getAll', movie.getAll);




    
    // Error Handler
    routes.use(errorHandler);

    return routes;
}
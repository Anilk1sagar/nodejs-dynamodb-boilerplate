import Express from "express";
import AWS from 'aws-sdk';

//Routes
import MovieRoutes from './movie';
import GetMovieRoutes from './getMovie';


/**
 * Queries a Baz for items.
 * @param {Express} app Subgroup id to query.
 * @param {AWS.DynamoDB.DocumentClient} dynamodb,
 * or itemId, or null to search everything.
 */

export default (app, dynamodb) => {

    let movieRoutes = MovieRoutes(app, dynamodb);
    let getMovieRoutes = GetMovieRoutes(app, dynamodb);


    return {
        add: movieRoutes.add,
        update: movieRoutes.update,
        remove: movieRoutes.remove,
        //Get Movie
        getAllByQuery: getMovieRoutes.getAllByQuery,
        getAll: getMovieRoutes.getAll
    }
}
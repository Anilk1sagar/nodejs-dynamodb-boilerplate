import { stat } from "fs";

/* *
* Queries a Baz for items.
* @param {any} db 
* @prop {Sequelize.Sequelize} sequelize 
* @param {Sequelize} Sequelize ,
*     or itemId, or null to search everything.
*/


/**
 * @typedef{{
    id: number,
    name: string
}}
 */
let ModelTest = {};


/* =============== Cron Job ================ */
/**
 * @typedef{{
    id: string,
    title: string,
    year: number,
    image: string,
    rating: number,
    createdAt: string,
    updatedAt: string
}}
 */
let ModelMovie = {};






export { 
    ModelTest,
    // Movie
    ModelMovie,

}
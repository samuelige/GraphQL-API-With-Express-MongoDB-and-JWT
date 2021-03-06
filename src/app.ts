import * as dotenv from "dotenv";
dotenv.config();

import express from 'express';
import { graphqlHTTP } from "express-graphql";
import logger from 'morgan';
import coonectDB from "./db";
import graphQLSchema from "./graphQl/schema";
import router from './routes/index';
const cors = require("cors");

const app = express();

app.use(cors());
app.options('*', cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
coonectDB();


app.use('/api/v1', router);

app.use('/graphql', graphqlHTTP({
    schema: graphQLSchema,
    graphiql: true,
}));

module.exports = app;
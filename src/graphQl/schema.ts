import { GraphQLSchema, GraphQLObjectType } from "graphql";
import {register, login} from "./mutations";
import users from "./queries";

const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: "Queries",
    fields: { users }
});

const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "Mutations",
    fields: {register, login}
});

const graphQLSchema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});

export default graphQLSchema;
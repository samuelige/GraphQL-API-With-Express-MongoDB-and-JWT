import { GraphQLList } from "graphql";
import { User } from "../models";
import { UserType } from "./types";

const users = {
    type: new GraphQLList(UserType),
    resolve() {
        return User.find();
    },
}



export default users;
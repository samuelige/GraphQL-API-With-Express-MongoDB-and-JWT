import { GraphQLString } from "graphql";
import { GraphQLError } from 'graphql';
import { User } from "../models";
import { comparePasswords, createJwtToken, hashPassword } from "../service";
import { CustomObj } from "../types";

const register: any = {
    type: GraphQLString,
    args: {
        fName: {type: GraphQLString},
        lName: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        userName: {type: GraphQLString}
    },
    async resolve(_parent:unknown, args: CustomObj) {
        const { fName, lName, email, password, userName } = args;

        const oldUser = await User.findOne({ email });

        if(oldUser) {
            throw new GraphQLError("User already exists");
        };

        const hashedPassword = await hashPassword(password);

        const user = new User({fName, lName, email, password: hashedPassword, userName});

        await user.save();

    }
}

const login = {
    type: GraphQLString,
    args: {
        email: {type: GraphQLString},
        password: {type: GraphQLString}
    },
    async resolve(_parent:unknown, args: CustomObj) {
        const { email, password } = args;

        const user = await User.findOne({ email }).select('password');;

            if(!user) {
                throw new GraphQLError("User not found");
            };

            const result = await comparePasswords(password, user.password)

            if (!result) {
                throw new Error('invalid username or password') ;
            }

            
            const token = createJwtToken({ _id: user._id });
            user.token = token;
            user.save();


            return token;

        // try {
            
        // } catch (error) {
        //     throw new Error("Error logging in");
        // }  
    }
}

export {register, login};
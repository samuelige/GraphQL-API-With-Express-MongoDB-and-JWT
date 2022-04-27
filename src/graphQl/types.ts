import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } from "graphql";

import { Comment, Post, User } from "../models/index";

const UserType = new GraphQLObjectType({
    name: "User",
    description: "User Type",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        fName: {
            type: GraphQLString
        },
        lName: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        userName: {
            type: GraphQLString
        }
    })
});


const PostType: GraphQLObjectType<any, any> = new GraphQLObjectType({
    name: "Post",
    description: "Post Type",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        title: {
            type: GraphQLString
        },
        content: {
            type: GraphQLString
        },
        author: {
            type: UserType,
            resolve: (parent, _args) => {
                return User.findById(parent.authorId);
            }
        },
        comments: {
            type: new GraphQLList(CommentType),
            resolve: (parent, _args) => {
                return Comment.find({ postId: parent.id });
            }
        }
    })
});

const CommentType = new GraphQLObjectType({
    name: "Comment",
    description: "Comment Type",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        comment: {
            type: GraphQLString
        },
        user: {
            type: UserType,
            resolve: (parent, _args) => {
                return User.findById(parent.userId);
            }
        },
        post: {
            type: PostType,
            resolve: (parent, _args) => {
                return Post.findById(parent.postId);
            }
        }
    })
});


export { UserType, PostType, CommentType };
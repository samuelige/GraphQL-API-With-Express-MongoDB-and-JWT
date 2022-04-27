import {model, Schema} from "mongoose";

const postSchema = new Schema(
    {
        authorId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    }, 
    {timestamps: true}
);

const Post = model("Post", postSchema);
export default Post;
import {model, Schema} from "mongoose";

const commentSchema = new Schema(
    {
        comment: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        postId: {
            type: Schema.Types.ObjectId,
            required: true,
        }
    }, 
    {timestamps: true}
);

const Comment = model("Comment", commentSchema);
export default Comment;
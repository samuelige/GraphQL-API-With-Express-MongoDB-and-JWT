import {model, Schema} from "mongoose"

const userSchema = new Schema(
    {
        fName: {
            type: String,
            required: true
        },
        lName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 12,
            select: false
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        userName: {
            type: String,
        }
    }, 
    {
        timestamps: true
    }
);

const User = model("User", userSchema);
export default User;
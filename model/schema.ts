import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
}, {
   timestamps: true
})

const User = mongoose.models.user || mongoose.model("user", userSchema)

export default User



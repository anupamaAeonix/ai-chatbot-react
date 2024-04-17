import mongoose, { mongo } from "mongoose";

const userSchema = mongoose.Schema({
  uid: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

export default User;

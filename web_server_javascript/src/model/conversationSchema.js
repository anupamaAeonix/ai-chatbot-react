import mongoose from "mongoose";
import User from "./userSchema.js";
import Question from "./questionSchema.js";

const messageSchema = mongoose.Schema({
  qid: {
    type: Number,
    ref: Question,
  },
  reply: {
    type: String,
  },
});

const conversationSchema = mongoose.Schema({
  userID: {
    type: String,
    ref: User,
  },
  messages: [messageSchema],
});

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;

import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
  qid: {
    type: Number,
    unique: true,
  },
  text: {
    type: String,
  },
  type: {
    type: String,
    enum: ["string", "number", "boolean"], // corrected enum values
  },
  yes: {
    type: Number, // Assuming you want to store the qid of the related question
    ref: "Question", // Reference to the Question model
  },
  no: {
    type: Number,
    ref: "Question",
  },
});

const Question = mongoose.model("Question", questionSchema);

export default Question;

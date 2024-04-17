import questionsData from "../../../data/questionsData.js";
import Conversation from "../../../model/conversationSchema.js";
import Question from "../../../model/questionSchema.js";
export const postResponse = async (req, res) => {
  try {
    const { qid, reply } = req.body;
    console.log(req.body);
    if (qid === 0) {
      const question = await Question.findOne({ qid: 1 });
      const conversation = await Conversation.create({});
      console.log(conversation);
      req.session.conversationID = conversation._id;
      res.status(200).json({ status: "success", result: question });
    } else {
      const question = await Question.findOne({ qid: qid });
      console.log(question);
      const nextQuestion = await Question.findOne({
        qid: reply === "yes" ? question.yes : question.no,
      });

      //save the response to conversation
      if (req.session.userID) {
        const conversation = await Conversation.findOneAndUpdate(
          {
            userID: req.session.userID,
          },
          { $push: { messages: { qid, reply } } },
          { new: true }
        );
      } else {
        const conversation = await Conversation.findOneAndUpdate(
          {
            _id: req.session.conversationID,
          },
          {
            $push: { messages: { qid, reply } },
          },
          { new: true }
        );
      }
      res.status(200).json({ status: "success", result: nextQuestion });
    }
  } catch (error) {
    console.log(error);
  }
};

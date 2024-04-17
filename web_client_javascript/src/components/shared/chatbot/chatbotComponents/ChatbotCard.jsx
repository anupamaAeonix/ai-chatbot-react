import React, { useEffect, useState } from "react";
import "../chatbotMain/chatbot.css";
import MessageCard from "./MessageCard";
import ConfirmationPopup from "../../modal/confirmationPopup/ConfirmationPopup";
import axios from "axios";

const ChatbotCard = ({ isOpen, setIsOpen }) => {
  const [allMessage, setAllMessage] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [questionData, setQuestionData] = useState(0);
  const [buttonOutput, setButtonOutput] = useState(false);

  // const [userId, setUserId] = useState({});

  const handleYesNoOutputButton = async (value) => {
    console.log(value);
    setButtonOutput(value);

    const newMessage = {
      userInput: value ? "yes" : "no",
    };
    await storeMessage(newMessage);
    let replyMessage = {
      qid: questionData,
      reply: buttonOutput,
    };
    axios
      .post("https://4caa-122-176-164-234.ngrok-free.app/api/v1", replyMessage)
      .then(function (response) {
        console.log(response.data.result);
        console.log(response.data?.result?.qid);
        setQuestionData(response.data.result.qid);
        const botMessage = {
          botOutput: response.data.result,
        };
        console.log(botMessage);
        storeMessage(botMessage);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    const fetchBotReply = async () => {
      const botReply = "Welcome to AI Chatbot! Say 'hi' to start our conversation!";
      const botMessage = {
        botOutput: botReply,
      };
      await storeMessage(botMessage);
    };

    fetchBotReply(); // Call the function when the component mounts
  }, []);
  // handle user and bot message
  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    const messageValue = e?.target?.message?.value.trim();

    if (!messageValue) return;
    // user input will be stored to array
    const newMessage = {
      userInput: messageValue,
    };
    await storeMessage(newMessage);
    let replyMessage = {
      qid: messageValue === "hi" ? 0 : questionData,
      reply: messageValue,
    };
    console.log(replyMessage);
    e.target.reset();
    // wait for 2 seconds for bot reply
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // now data will be send to backend for response
    axios
      .post("https://4caa-122-176-164-234.ngrok-free.app/api/v1", replyMessage)
      .then(function (response) {
        console.log(response.data.result);
        console.log(response.data.result.qid);
        setQuestionData(response.data.result.qid);
        const botMessage = {
          botOutput: response.data.result,
        };
        console.log(botMessage);
        storeMessage(botMessage);
      })
      .catch(function (error) {
        console.log(error);
      });
    // and response will be stored to the state

    // now i am sending dummy data from bot side
    // const botReply = `Thank you for your great response!\nHave a great day!`;
    // const botMessage = {
    //   botOutput: botReply,
    // };
    // await storeMessage(botMessage);

    // console.log(allMessage);
  };

  const storeMessage = async (newMessage) => {
    console.log(newMessage);
    if (allMessage.length === 1) {
      setAllMessage([newMessage]);
    } else {
      setAllMessage((prevMessage) => [...prevMessage, newMessage]);
    }
  };
  return (
    <div className="chatbot-card-main-component" id="chatbot-card-main-component">
      <div className="chatbot-card-layout">
        <h1 className="heading-style chatbot-card-heading">AI Chatbot</h1>
        {/* close button  */}
        <button className="close-button" onClick={() => setOpenModal(true)}>
          X
        </button>
        {openModal && <ConfirmationPopup setOpenModal={setOpenModal} setIsOpen={setIsOpen} />}
        {/* chat container  */}
        <div className="message-main-container">
          <MessageCard
            allMessage={allMessage}
            questionData={questionData}
            handleYesNoOutputButton={handleYesNoOutputButton}
            setButtonOutput={setButtonOutput}
            buttonOutput={buttonOutput}
          ></MessageCard>
        </div>
        {/* input field  */}
        <form className="input-container" onSubmit={handleMessageSubmit}>
          <input
            type="text"
            name="message"
            className="input-field-style"
            placeholder="Enter your meessage..."
            required
          />
          {/* <textarea
            name="text"
            className="input-field-style"
            cols="30"
            rows={autoRow}
            value={text}
            onChange={handleTextChange}
          ></textarea> */}
          <button type="submit" className="send-button-style">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatbotCard;

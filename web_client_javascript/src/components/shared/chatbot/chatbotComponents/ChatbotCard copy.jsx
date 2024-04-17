import React, { useCallback, useEffect, useState } from "react";
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

  const handleStoreMessage = useCallback(
    async (newMessage) => {
      if (allMessage.length === 1) setAllMessage([newMessage]);
      else setAllMessage((prevMessage) => [...prevMessage, newMessage]);
    },
    [allMessage.length]
  );

  const handleFetchBotResponse = useCallback(async () => {
    const botResponse = "Welcome to AI Chatbot! Say 'hi' to start our conversation!";
    const botMessage = {
      botOutput: botResponse,
    };
    await handleStoreMessage(botMessage);
  }, [handleStoreMessage]);

  const handleYesNoOutputButton = useCallback(
    async (value) => {
      console.log(value);
      setButtonOutput(value);

      const newMessage = {
        userInput: value ? "yes" : "no",
      };
      await handleStoreMessage(newMessage);
      let replyMessage = {
        qid: questionData,
        reply: buttonOutput,
      };
      axios
        .post("https://4caa-122-176-164-234.ngrok-free.app/api/v1", replyMessage)
        .then(function (response) {
          console.log(response.data.result);
          console.log(response.data?.result?.qid || questionData);
          setQuestionData(response.data.result.qid);
          const botMessage = {
            botOutput: response.data.result,
          };
          console.log(botMessage);
          handleStoreMessage(botMessage);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    [buttonOutput, handleStoreMessage, questionData]
  );

  // handle user and bot message
  const handleMessageSubmitClick = async (event) => {
    event.preventDefault();

    const messageValue = event?.target?.message?.value.trim();
    if (!messageValue) return;

    // user input will be stored to array
    const newMessagePayload = {
      userInput: messageValue,
    };

    await handleStoreMessage(newMessagePayload);

    const replyMessage = {
      qid: messageValue === "hi" ? 0 : questionData,
      reply: messageValue,
    };

    event.target.reset();

    const apiRoute = "https://4caa-122-176-164-234.ngrok-free.app/api/v1";
    // now data will be send to backend for response

    try {
      const messageResponse = await axios.post(apiRoute, replyMessage);
      if (messageResponse) throw new Error();
      const {
        data: { response, result },
      } = messageResponse;

      const { qid } = response;

      setQuestionData(qid);
      handleStoreMessage(result);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    handleFetchBotResponse();
  }, [handleFetchBotResponse]);

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
        <form className="input-container" onSubmit={handleMessageSubmitClick}>
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

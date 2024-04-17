import React, { useState } from "react";
import "./chatbot.css";
import ChatbotCard from "../chatbotComponents/ChatbotCard";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  // function to handle start chat
  const handleStartChat = () => {
    setIsOpen(true);
  };
  return (
    <div>
      <div
        className={
          !isOpen ? "chatbot-main-container" : "chatbot-main-second-style"
        }
      >
        <h1 className="heading-style">AI Chatbot</h1>
        <div className="start-button-div">
          <button className="start-chat-button" onClick={handleStartChat}>
            Start Chat
          </button>
        </div>
      </div>
      {isOpen && (
        <ChatbotCard isOpen={isOpen} setIsOpen={setIsOpen}></ChatbotCard>
      )}
    </div>
  );
};

export default Chatbot;

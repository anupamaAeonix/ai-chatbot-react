import React from "react";
import Chatbot from "../../shared/chatbot/chatbotMain/Chatbot";

const Home = () => {
  console.log("This is the main chatbot file");
  return (
    <div className="home-main-container" id="home-main-container">
      <Chatbot></Chatbot>
    </div>
  );
};

export default Home;

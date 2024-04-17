import React from "react";
import allMessage from "./ChatbotCard";
import "../chatbotMain/chatbot.css";

const MessageCard = ({ allMessage, handleYesNoOutputButton }) => {
  return (
    <div className="message-container">
      {allMessage &&
        allMessage.map((message, index) => (
          <div
            key={index}
            className={message?.userInput && "incoming-message-container"}
          >
            {message?.userInput && <p>{message?.userInput}</p>}
            {message?.botOutput && (
              <>
                <div className="outcoming-message-container">
                  <p>{message?.botOutput?.text || message?.botOutput}</p>

                  {message?.botOutput?.type === "boolean" && (
                    <div
                      className="output-button-message-container"
                      // onClick={handleYesNoOutputButton}
                    >
                      <button
                        onClick={() => handleYesNoOutputButton(true)}
                        className="button-yes-message-option button-message-option"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => handleYesNoOutputButton(false)}
                        className="button-no-message-option button-message-option"
                      >
                        No
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
    </div>
  );
};

export default MessageCard;

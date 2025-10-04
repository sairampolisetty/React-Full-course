import {useRef,useEffect} from 'react'
import {ChatMessage} from './ChatMessage'
import './ChatMessages.css'

export function ChatMessages({chatMessages}){
        const chatMessageRef = useRef(null);
        useEffect(()=>{
          const containerElem=chatMessageRef.current
          if(containerElem){
            containerElem.scrollTop=containerElem.scrollHeight
          }
        },[chatMessages])
        return(
          <div className="chat-message-container" ref={chatMessageRef}>
            {chatMessages.length===0&&(
              <div>
                <p className="chat-initial-text">Welcome to the chatbot project! Send a message using the textbox below.</p>
              </div>
            )}
            {
              chatMessages.map((chatMessage) => {
                return(
                  <ChatMessage
                    message={chatMessage.message}
                    sender={chatMessage.sender}
                    key={chatMessage.id}
                  />
                )
              })
            }
            </div>
        )
      }
import { useState, useEffect} from 'react'
import {ChatInput} from './components/ChatInput'
import {ChatMessages} from './components/ChatMessages'
import {Chatbot} from 'supersimpledev'

import './App.css'

function App(){
  const [chatMessages,setChatMessages]=useState([])
  //const chatMessages=arra[0];
  //const setChatMessages=arra[1];
  useEffect(() => {
    Chatbot.addResponses({
      'goodbye': 'Goodbye. Have a great day!',
      'give me a unique id': function() {
        return `Sure! Here's a unique ID: ${crypto.randomUUID()}`;
      }
    });
  // [] tells useEffect to only run once. We only want to run
  // this setup code once because we only want to add these
  // extra responses once.
  }, []);

  return(
    <div className="app-container">
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput chatMessages={chatMessages} setChatMessages={setChatMessages}/>
    </div>
  )
}

export default App

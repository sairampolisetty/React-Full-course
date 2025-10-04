import React, {useState} from 'react'
import LoadingSpinner from '../assets/loading-spinner.gif'
import {Chatbot} from 'supersimpledev'
import './ChatInput.css'

export function ChatInput({chatMessages,setChatMessages}){
    const [inputText,setInputText]=useState('');
    
    function clearChat(){
        window.location.reload();
    }

    async function sendMessage(){
        if(inputText.length===0){
        return;
        }
        const newChatMessages=[
        ...chatMessages,
        {
            message: inputText,
            sender:"user",
            id:crypto.randomUUID()
        }
        ];

        setChatMessages([
        ...newChatMessages,
        {
            message: <img src={LoadingSpinner} className="loading-spinner" />,
            sender: 'robot',
            id: crypto.randomUUID()
        }
        ])
        setInputText("")
        const response=await Chatbot.getResponseAsync(inputText);
        setChatMessages([
        ...newChatMessages,
        {
            message: response,
            sender:"robot",
            id:crypto.randomUUID()
        }
        ])
        
    }
    
    return(
        <div className='chat-input-container'>
            <input 
            placeholder="send message here" 
            type="text" 
            size="30"
            value={inputText}
            className='chat-input'
            onChange={(e)=>setInputText(e.target.value)}
            onKeyDown={(e)=>{
                if(e.key=="Enter"){
                sendMessage();
                }else if(e.key=="Escape"){
                setInputText("")
            }
            }}
            />
            <button
            onClick={sendMessage}
            className='send-button'
            >
            send
            </button>
            <button
            onClick={clearChat}
            className='clear-button'
            >
            clear
            </button>
        </div>
    )
}

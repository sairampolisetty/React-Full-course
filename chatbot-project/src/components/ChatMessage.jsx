import RobotImage from '../assets/robot.png'
import UserImage from '../assets/user.jpg'
import dayjs from 'dayjs'

import './ChatMessage.css'

export function ChatMessage({message,sender}){
    // const message=props.message;
    // const sender=props.sender;
    // const {message,sender}=props;
    
    /*
    if(sender==="robot"){
      return(
        <div>
          <img src="robot.png" alt="robot" width="50"/>
          {message}
        </div>
      )
    }*/
   const time=dayjs().format('h:mm a')

return(
    <div className={
    sender==="user"?
    "chat-message-user"
    :"chat-message-robot"}>
    {sender==="robot" && (
        <img src={RobotImage} alt="robot" className="profile"/>
    )}
    <div className="chat-message-text">{message}<div className="time">{time}</div></div>
    {sender==="user" && (
        <img src={UserImage} alt="user" className="profile"/>
    )}
    </div>
)
}

import 'react-chatbox-component/dist/style.css';
import {ChatBox, ReceiverMessage, SenderMessage } from 'react-chatbox-component';

const messages = [
  {
    "text": "Hello there",
    "id": "1",
    "sender": {
      "name": "Ironman",
      "uid": "user1",
      "avatar": "https://data.cometchat.com/assets/images/avatars/ironman.png",
    },
  },
  {
    "text": "Hello there2",
    "id": "1",
    "sender": {
      "name": "Ironman",
      "uid": "user1",
      "avatar": "https://data.cometchat.com/assets/images/avatars/ironman.png",
    },
  },
  {
    "text": "Hello",
    "id": "2",
    "sender": {
      "name": "Ironman",
      "uid": "user2",
      "avatar": "https://data.cometchat.com/assets/images/avatars/ironman.png",
    },
  },
]
const user = {
    "uid" : "user1"
}


export default function Chatbox(){
return(
<div className='container'>
  <div className='chat-header'>
    <br/>
    <br/>
    <br/>
    <br/>
    <h5>Chat With Dolar</h5>
  </div>
  <ChatBox messages={messages} user={user}/>
</div>
)
}
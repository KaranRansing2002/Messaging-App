import { Search,AttachFile,MoreVert,InsertEmoticon,Mic } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Chat.css';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import { useStateValue } from './StateProvider';
import db from './firebase';

function Chat() {

    const [input,setInput]=useState('');
    const {roomId}=useParams();
    const [roomName,setRoomName]=useState('');
    const [messages,setMesages]=useState([]);
    const [{user},dispatch]=useStateValue();

    useEffect(()=>{
        if(roomId){
            
            db.collection('rooms').doc(roomId).onSnapshot((snapshot)=>
                setRoomName(snapshot.data().name)
            )

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','asc').onSnapshot((snapshot)=>(
                setMesages(snapshot.docs.map(doc=>doc.data()))
            ))
            
        }
    },[roomId])
    const sendMessage=(e)=>{
        e.preventDefault();

        db.collection('rooms').doc(roomId).collection('messages').add({
            message : input,
            name : user.displayName,
            timestamp : firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput('')
    }
  return (
    <div className='chat'>
        <div className='chat_header'>
            <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`}/>
            <div className='chat_headerInfo'>
                <h3>{roomName}</h3>
                <p>{(messages.length>0 && messages[messages.length-1].timestamp) && new Date(messages[messages.length-1].timestamp.toDate()).toUTCString()}</p>
            </div>
            <div className='chat_headerRight'>
                <IconButton>
                    <Search/>
                </IconButton>
                <IconButton>
                    <AttachFile/>
                </IconButton>
                <IconButton>
                    <MoreVert/>                
                </IconButton>
            </div>
        </div>
        <div className='chat_body'>
            {
                messages.map((message)=>(
                    <p className={`chat_message ${message.name===user.displayName && 'chat_reciever'}`}>
                        <span className='chat_name'>{message.name}</span>
                            {message.message}
                        <span className='chat_timestamp'>
                            {message.timestamp && new Date(message.timestamp.toDate()).toUTCString()}
                        </span>
                    </p>
                ))
            }
            
        </div>
        <div className='chat_footer'>
            <InsertEmoticon/>
            <form>
                <input value={input} onChange={e=>(setInput(e.target.value))} type='text' placeholder='Type a message'/>
                <button type='submit' onClick={sendMessage}>Send a message</button>
            </form>
            <Mic/>
        </div>
    </div>
  )
}

export default Chat
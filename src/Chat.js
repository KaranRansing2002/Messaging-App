import { Search,AttachFile,MoreVert,InsertEmoticon,Mic } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Chat.css';
import db from './firebase';

function Chat() {

    const [input,setInput]=useState('');
    const {roomId}=useParams();
    const [roomName,setRoomName]=useState('');

    useEffect(()=>{
        if(roomId){
            
            db.collection('rooms').doc(roomId).onSnapshot((snapshot)=>
                setRoomName(snapshot.data().name)
            )
            
        }
    },[roomId])
    const sendMessage=(e)=>{
        e.preventDefault();
        setInput('')
    }
  return (
    <div className='chat'>
        <div className='chat_header'>
            <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`}/>
            <div className='chat_headerInfo'>
                <h3>{roomName}</h3>
                <p>Last seen at ...</p>
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
            <p className={`chat_message ${true && 'chat_reciever'}`}>
                <span className='chat_name'>karan</span>
                Hey Guys
                <span className='chat_timestamp'>11:57</span>
            </p>
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
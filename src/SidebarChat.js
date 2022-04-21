import React from 'react'
import {Avatar} from '@mui/material'
import './SidebarChat.css'
import { useState } from 'react'
import { useEffect } from 'react';
import db from './firebase';
import { Link } from 'react-router-dom';

function SidebarChat({addNewChat,name,id}) {

    const [seed,setSeed]=useState(''); 

    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000))
    },[]);

    const[messages,setMessages]=useState([])

    useEffect(()=>{
      if(id){
        db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot=>(
          setMessages(snapshot.docs.map(doc=>doc.data()))
        ))
      }
    },[id])

    const createChat=()=>{
      const roomname=prompt('please enter the name');
      if(roomname){
        db.collection('rooms').add({
          name : roomname,
        })
      }
    }

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className='sidebarChat'>
          <Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`}/>
          <div className='sidebarChat_info'>
              <h2>{name}</h2>
              <p>{messages[0] && messages[0].message}</p>
          </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className='sidebarChat'>
      <h2>Add New Chat</h2>
    </div>
  )
}

export default SidebarChat
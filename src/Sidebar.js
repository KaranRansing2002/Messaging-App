import { Avatar,IconButton} from '@mui/material'
import React from 'react' 
import {Chat,DonutLarge,MoreVert,Search} from '@mui/icons-material';
import './Sidebar.css'
import SidebarChat from './SidebarChat';
import { useEffect } from 'react';
import db from './firebase';
import { useState } from 'react';

function Sidebar() {

  const [rooms,setRooms]=useState([])

  useEffect(()=>{
    const unsubscribe=db.collection('rooms').onSnapshot(snapshot=>(
      setRooms(snapshot.docs.map(doc=>(
        {
          id : doc.id,
          data : doc.data()
        }
      )))
    ))

    return ()=>{
      unsubscribe();
    }
  },[])

  return (
    <div className='sidebar'>
        <div className='sidebar_header'>
            <Avatar />
            <div className='sidebar_headerRight'>
              <IconButton>
                <DonutLarge/>
              </IconButton>
              <IconButton>
                <Chat/>
              </IconButton>
              <IconButton>
                <MoreVert/>
              </IconButton>
            </div>
        </div>
        <div className='sidebar_search'>

          <div className='sidebar_searchContainer'>
            <Search/>
            <input placeholder='Search or Start new Conversation' type='text'/>
          </div>

        </div>

        <div className='sidebar_chats'>
          <SidebarChat addNewChat/>
          {
            rooms.map(room=>(
              <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
            ))
          }
        </div>
    </div>
  )
}

export default Sidebar
import './App.css';
import React from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import {BrowserRouter ,Routes,Route} from "react-router-dom"
import { useState } from 'react';

function App() {

  const [user,setUser]=useState('');

  return (
    <div className="app"> 
      {!user ? (
        <h1>LOGIN</h1> 
      ) :
      <div className='app_body'>
          <BrowserRouter>
            <Sidebar/>
            <Routes>
              <Route path="/rooms/:roomId" element={<Chat/>}/>
            </Routes>
          </BrowserRouter>  
      </div> 
      }
    </div> 
      
  );
}

export default App;

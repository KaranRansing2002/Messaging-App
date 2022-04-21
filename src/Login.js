import { Button } from '@mui/material'
import React from 'react'
import './Login.css'
import {auth,provider} from './firebase'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'

function Login() {
    const [{},dispatch]=useStateValue();
    const signIn=()=>{
        auth.signInWithPopup(provider).then((result)=>
            dispatch({
                type : actionTypes.SET_USER,
                user : result.user
            })
        ).catch((error)=>alert(error.message));
    }

  return (
    <div className='login'>
        <div className='login_container'>
            <img src='data:image/jpeg;base64,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' alt=''/>
            <div className='login_text'>
                <h1>Sign in to Whatsapp</h1>
            </div>

            <Button type='submit' onClick={signIn}>
                Sign In With Google
            </Button>
        </div>
    </div>
  )
}

export default Login
import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import React from 'react';

export const StateContext=createContext();

export const StateProvider=({reducer,initialState,children})=>(
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
)

export const useStateValue=()=>useContext(StateContext)
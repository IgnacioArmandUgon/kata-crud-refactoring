import React, { useContext, useReducer, useEffect, useRef, useState, createContext } from 'react';
import { reducerList } from '../reducer/reducerList';
import { initialState, Store } from '../constants/constants';

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducerList, initialState);
  
    return <Store.Provider value={{ state, dispatch }}>
      {children}
    </Store.Provider>
  
  }
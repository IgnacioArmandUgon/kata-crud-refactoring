import React, { useContext, useReducer, useEffect, useRef, useState, createContext } from 'react';
import { reducer } from '../reducer/reducer';
import { initialState, Store } from '../constants/constants';

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    return <Store.Provider value={{ state, dispatch }}>
      {children}
    </Store.Provider>
  
  }
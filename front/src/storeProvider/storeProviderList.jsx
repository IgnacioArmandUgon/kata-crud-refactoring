import React, { useContext, useReducer, useEffect, useRef, useState, createContext } from 'react';
import { reducerList } from '../reducer/reducerList';
import { initialStateList, StoreLists } from '../constants/constantsLists';

export const StoreProviderList = ({ children }) => {
    const [state, dispatch] = useReducer(reducerList, initialStateList);
  
    return <StoreLists.Provider value={{ state, dispatch }}>
      {children}
    </StoreLists.Provider>
  }
import React, { useContext, useReducer, useEffect, useRef, useState, createContext } from 'react';
import Form from './components/Form';
import List from './components/List';
import FormList from './components/FormList';
import ListList from './components/ListList';
import { StoreProviderList } from './storeProvider/storeProviderList';
import {Store} from "./constants/constants";

function App() {
  return <StoreProviderList>
    <h1>Tus tareas</h1>
    <FormList />
    <ListList />
  </StoreProviderList>
}

export default App;

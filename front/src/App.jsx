import React, { useContext, useReducer, useEffect, useRef, useState, createContext } from 'react';
import Form from './components/Form';
import List from './components/List';
import FormList from './components/FormList';
import ListList from './components/ListList';
import { StoreProvider } from './storeProvider/StoreProvider';

function App() {
  return <StoreProvider>
    <h1>To-Do List</h1>
    <FormList />
    <ListList/>
    <Form />
    <List />
  </StoreProvider>
}

export default App;

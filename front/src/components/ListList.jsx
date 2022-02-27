import React, { useContext, useReducer, useEffect, useRef, useState, createContext } from 'react';
import { StoreLists, HOST_API, initialStateList } from '../constants/constantsLists';
import { Store, initialState } from "../constants/constants";
import Form from './Form';
import List from "./List";
import { StoreProvider } from '../storeProvider/StoreProvider';

const ListList = () => {
    const { dispatch, state: { todoList } } = useContext(StoreLists);
    const currentList = todoList.list;
  
    useEffect(() => {
      fetch(HOST_API + "/list")
        .then(response => response.json())
        .then((list) => {
          dispatch({ type: "update-list", list })
        })
    }, [dispatch]);
  
  
    const onDelete = (id) => {
      fetch(HOST_API + "/" + id + "/todoList", {
        method: "DELETE"
      }).then((list) => {
        dispatch({ type: "delete-item", id })
      })
    };
  
    const onEdit = (todoList) => {
      dispatch({ type: "edit-item", item: todoList })
    };
  
    const onChange = (event, todoList) => {
      const request = {
        name: todoList.name,
        id: todoList.id,
        completed: event.target.checked
      };
      fetch(HOST_API + "/todo", {
        method: "PUT",
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((todoList) => {
          dispatch({ type: "update-item", item: todoList });
        });
    };

    return <div>
      <table >
        <thead>
          <tr>
            <td className='ancho textoCentrado'>ID</td>
            <td className='muyAncho textoCentrado' >Nombre de lista</td>
          </tr>
        </thead>
        <tbody>
          {currentList.map((todoList) => {
            return <tr key={todoList.id} className="conBordes">
              <td className='textoCentrado'>{todoList.id}</td>
              <td className='textoCentrado'>{todoList.name}</td>

              <td ><button className="niceBtn" onClick={() => onDelete(todoList.id)}>Eliminar</button></td>
              <td><button className="niceBtn" onClick={() => onEdit(todoList)}>Editar</button></td>
              <td><StoreProvider>
                  <Form listId={todoList.id}/>
                  <List listId={todoList.id}/>
                </StoreProvider></td>
              
            </tr>
          })}
        </tbody>
      </table>
      
    </div>
  }

  export default ListList
  
  
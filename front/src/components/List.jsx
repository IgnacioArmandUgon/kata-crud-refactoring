import React, { useContext, useReducer, useEffect, useRef, useState, createContext } from 'react';
import { Store, initialState, HOST_API } from "../constants/constants";


const List = ({listId}) => {
    const { dispatch, state: { todo } } = useContext(Store);
    const currentList = todo.list;
  
    useEffect(() => {
      fetch(HOST_API + "/todos")
        .then(response => response.json())
        .then((list) => {
          dispatch({ type: "update-list", list })
        })
    }, [dispatch]);
  
  
    const onDelete = (id) => {
      fetch(HOST_API + "/" + id + "/todo", {
        method: "DELETE"
      }).then((list) => {
        dispatch({ type: "delete-item", id })
      })
    };
  
    const onEdit = (todo) => {
      dispatch({ type: "edit-item", item: todo })
    };
  
    const onChange = (event, todo) => {
      const request = {
        name: todo.name,
        id: todo.id,
        completed: event.target.checked,
        groupListId: listId
      };
      fetch(HOST_API + "/todo", {
        method: "PUT",
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((todo) => {
          dispatch({ type: "update-item", item: todo });
        });
    };
  
    const decorationDone = {
      textDecoration: 'line-through'
    };
    return <div>
      <table >
        <thead>
          <tr>
            <td className='ancho textoCentrado'>ID</td>
            <td className='muyAncho textoCentrado' >Tarea</td>
            <td className='ancho textoCentrado' >¿Completado?</td>
          </tr>
        </thead>
        <tbody>
          {currentList.map((todo) => {
            if(todo.groupListId == listId ){
            return <tr key={todo.id} style={todo.completed ? decorationDone : {}}>
              <td className="conBordes textoCentrado">{todo.id}</td>
              <td className="conBordes textoCentrado">{todo.name}</td>
              <td className="conBordes textoCentrado"><input type="checkbox" defaultChecked={todo.completed} onChange={(event) => onChange(event, todo)}></input></td>
              <td className="conBordes textoCentrado" ><button className="niceBtn" onClick={() => onDelete(todo.id)}>Eliminar</button></td>
              <td className="conBordes textoCentrado"><button className="niceBtn" onClick={() => onEdit(todo)}>Editar</button></td>
            </tr>}
          })}
        </tbody>
      </table>
    </div>
  }

  export default List
  
  
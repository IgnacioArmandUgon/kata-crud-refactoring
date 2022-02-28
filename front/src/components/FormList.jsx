import React, {
    useContext,
    useReducer,
    useEffect,
    useRef,
    useState,
    createContext,
  } from "react";
  import { StoreLists, HOST_API, initialState } from "../constants/constantsLists";

  
  const FormList = () => {
    const formRef = useRef(null);
    const {
      dispatch,
      state: { todoList },
    } = useContext(StoreLists);
    const item = todoList.item;
    const [state, setState] = useState(item);
  
    const [esVacio, setesVacio] = useState(false);
  
    const onAdd = (event) => {
      event.preventDefault();
      const request = {
        name: state.name,
        id: null
      };
  
      if (state.name !== undefined) {
        if (state.name.trim().length > 2) {
          fetch(HOST_API + "/todolist", {
            method: "POST",
            body: JSON.stringify(request),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((todo) => {
              dispatch({ type: "add-item", item: todo });
              setState({ name: "" });
              formRef.current.reset();
            });
  
          setesVacio(false);
        } else {
          setesVacio(true);
          formRef.current.reset();
        }
      } else {
        setesVacio(true);
      }
    };
  
    const onEdit = (event) => {
      event.preventDefault();
  
      const request = {
        name: state.name,
        id: item.id
      };
      console.log(event);
  
      fetch(HOST_API + "/"+ request.id +"/todoList", {
        
        method: "PUT",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((todoList) => {
          dispatch({ type: "update-item", item: todoList });
          setState({ name: "" });
          formRef.current.reset();
        });
    };
  
    return (
      <form ref={formRef}>
        <input
          className="niceTextInput"
          type="text"
          name="name"
          placeholder="¿Cual será el nombre de tu lista?"
          defaultValue={item.name}
          onChange={(event) => {
            setState({ ...state, name: event.target.value });
          }}
        ></input>
        {item.id && <button className="niceBtn" onClick={onEdit}>Actualizar</button>}
        {!item.id && <button className="niceBtn" onClick={onAdd}>Crear</button>}
        {esVacio && <p className="danger">No puede estar vacio</p>}
      </form>
    );
  };
  
  export default FormList;
  
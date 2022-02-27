import React, {
  useContext,
  useReducer,
  useEffect,
  useRef,
  useState,
  createContext,
} from "react";
import { Store, HOST_API, initialState } from "../constants/constants";

const Form = ({listId}) => {
  const formRef = useRef(null);
  const {
    dispatch,
    state: { todo },
  } = useContext(Store);
  const item = todo.item;
  const [state, setState] = useState(item);

  const [esVacio, setesVacio] = useState(false);

  const onAdd = (event) => {
    event.preventDefault();
    const request = {
      name: state.name,
      id: null,
      completed: false,
      groupListId: listId
    };

    if (state.name !== undefined) {
      if (state.name.trim().length > 2) {
        fetch(HOST_API + "/todo", {
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
      id: item.id,
      isCompleted: item.isCompleted,
      groupListId: listId
    };

    fetch(HOST_API + "/todo", {
      method: "PUT",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((todo) => {
        dispatch({ type: "update-item", item: todo });
        setState({ name: "" });
        formRef.current.reset();
      });
  };

  return (
    <form ref={formRef} >
      <input
        className="niceTextInput"
        type="text"
        name="name"
        autoComplete="off"
        placeholder="¿Que quieres agregar a esta lista?"
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

export default Form;

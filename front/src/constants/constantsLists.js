import { createContext } from 'react'

export const HOST_API = "http://localhost:8080/api";
export const initialStateList = {
    todoList: { list: [], item: {} }
};
export const StoreLists = createContext(initialStateList)
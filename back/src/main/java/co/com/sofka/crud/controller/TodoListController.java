package co.com.sofka.crud.controller;

import co.com.sofka.crud.model.Todo;
import co.com.sofka.crud.model.TodoList;
import co.com.sofka.crud.model.TodoListModel;
import co.com.sofka.crud.model.TodoModel;
import co.com.sofka.crud.services.TodoListService;
import co.com.sofka.crud.services.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TodoListController {
    @Autowired
    private TodoListService service;

    /*
    public TodoListController(TodoListService todoListService) {
        this.service = todoListService;
    }*/

    @PutMapping(value = "api/{listId}/todoList")
    public TodoList changeName(@PathVariable("listId") Long listId, @RequestBody TodoListModel todoListModel){
        return service.updateListByListId(listId,todoListModel);
    }

    @GetMapping(value = "api/{listId}/todoList")
    public Iterable<TodoListModel> getTodoListById(){
        return service.getAllListTodo();
    }

    @GetMapping(value = "api/list")
    public Iterable<TodoListModel> getAllListTodo(){
        return service.getAllListTodo();
    }

    @GetMapping(value = "api/{listId}/todos")
    public Iterable<TodoModel> getTodosByListId(@PathVariable("listId") Long listId){
        return service.getTodosByListId(listId);
    }

    @PostMapping(value = "api/todolist")
    public TodoListModel newTodoList(@RequestBody TodoListModel todoList){
        return service.newListTodo(todoList);
    }

    @DeleteMapping(value = "api/{id}/todoList")
    public void deleteListById(@PathVariable("id") Long id){
        service.deleteListById(id);
    }

    @PutMapping(value = "api/{listId}/todo")
    public TodoModel updateTodoByListId(@PathVariable("listId") Long listId, @RequestBody TodoModel todoModel){
        if(todoModel.getId() !=null){
            return service.updateTodoByListId(listId, todoModel);
        }
        throw new RuntimeException("Id nulo");
    }

    @PostMapping(value = "api/{listId}/todo")
    public TodoModel addNewTodoByListId(@PathVariable("listId") Long listId, @RequestBody TodoModel todoModel){
        return service.addNewTodoByListId(listId, todoModel);
    }

    /*@DeleteMapping(value = "api/{id}/todo")
    public void deleteTodoById(@PathVariable("id") Long id){
        service.deleteTodoById(id);
    }*/

}

package co.com.sofka.crud.controller;

import co.com.sofka.crud.model.TodoListDTO;
import co.com.sofka.crud.model.TodoDTO;
import co.com.sofka.crud.services.TodoListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TodoListController {
    @Autowired
    private TodoListService service;

    @GetMapping(value = "api/{listId}/todoList")
    public Iterable<TodoListDTO> getTodoListById(){
        return service.getAllListTodo();
    }

    @GetMapping(value = "api/list")
    public Iterable<TodoListDTO> getAllListTodo(){
        return service.getAllListTodo();
    }

    @GetMapping(value = "api/{listId}/todos")
    public Iterable<TodoDTO> getTodosByListId(@PathVariable("listId") Long listId){
        return service.getTodosByListId(listId);
    }

    @PostMapping(value = "api/todolist")
    public TodoListDTO newTodoList(@RequestBody TodoListDTO todoList){
        return service.newListTodo(todoList);
    }

    @DeleteMapping(value = "api/{id}/todoList")
    public void deleteListById(@PathVariable("id") Long id){
        service.delete(id);
    }

    @PutMapping(value = "api/{listId}/todo")
    public TodoDTO updateTodoByListId(@PathVariable("listId") Long listId, @RequestBody TodoDTO todoModel){
        if(todoModel.getId() !=null){
            return service.updateTodoByListId(listId, todoModel);
        }
        throw new RuntimeException("Id nulo");
    }

    @PostMapping(value = "api/{listId}/todo")
    public TodoDTO addNewTodoByListId(@PathVariable("listId") Long listId, @RequestBody TodoDTO todoModel){
        return service.addNewTodoByListId(listId, todoModel);
    }

    /*@DeleteMapping(value = "api/{id}/todo")
    public void deleteTodoById(@PathVariable("id") Long id){
        service.deleteTodoById(id);
    }*/

}

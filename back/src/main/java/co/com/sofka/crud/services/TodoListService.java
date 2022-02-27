package co.com.sofka.crud.services;

import co.com.sofka.crud.model.Todo;
import co.com.sofka.crud.model.TodoList;
import co.com.sofka.crud.model.TodoListModel;
import co.com.sofka.crud.model.TodoModel;
import co.com.sofka.crud.repository.TodoListRepository;
import co.com.sofka.crud.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class TodoListService {
    @Autowired
    private TodoListRepository todoListRepository;
    @Autowired
    private TodoRepository todoRepository;

    public TodoList updateListByListId(Long id, TodoListModel todoListModel){
        TodoList todoListModel1 = todoListRepository.findById(id).get();
        todoListModel1.setName(todoListModel.getName());
        return todoListModel1;
    }

    public List<TodoModel> getTodosByListId( Long id){
        return todoListRepository.findById(id)
                .orElseThrow()
                .getTodos().stream()
                .map(item -> new TodoModel(item.getId(), item.getName(), item.isCompleted(), id ))
                .collect(Collectors.toList());
    }
    public TodoModel addNewTodoByListId(Long listId, TodoModel todoModel){
        var listTodo = todoListRepository.findById(listId)
                .orElseThrow();
        var todo = new Todo();

        todo.setCompleted(todoModel.isCompleted());
        todo.setId(todoModel.getId());
        todo.setName(todoModel.getName());

        listTodo.getTodos().add(todo);

        var listUpdated = todoListRepository.save(listTodo);

        var lastTodo = listUpdated.getTodos()
                .stream()
                .max(Comparator.comparingInt(item -> item.getId().intValue()))
                .orElseThrow();
                todoModel.setId(lastTodo.getId());
                todoModel.setListId(listId);
                return todoModel;
    }

    public TodoModel updateTodoByListId(Long listId, TodoModel todoModel){
        var listTodo = todoListRepository.findById(listId)
                .orElseThrow();
        for(var item: listTodo.getTodos()){
            if(item.getId().equals(todoModel.getId())){
                item.setCompleted(todoModel.isCompleted());
                item.setName(todoModel.getName());
                item.setId(todoModel.getId());

            }
        }
        todoListRepository.save(listTodo);
        return todoModel;
    }

    public TodoListModel newListTodo(TodoListModel todoListModel){
        var listTodo = new TodoList();
        listTodo.setName(todoListModel.getName());
        var id = todoListRepository.save(listTodo).getId();
        todoListModel.setId(id);
        return todoListModel;
    }

    public List<TodoListModel> getAllListTodo(){
        return StreamSupport
                .stream(todoListRepository.findAll().spliterator(), false)
                .map(todoList -> {
                    var listDto = todoList.getTodos()
                            .stream()
                            .map(item -> new TodoModel(item.getId(), item.getName(), item.isCompleted(), todoList.getId()))
                            .collect(Collectors.toList());
                        return new TodoListModel(todoList.getId(), todoList.getName(), listDto);
                        })
                .collect(Collectors.toList());
    }

    public void deleteListById(Long listId){
        var listTodo = todoListRepository.findById(listId)
                .orElseThrow();
        todoListRepository.delete(listTodo);
    }

    public void deleteTodoById(Long id) {
        var todo = todoRepository.findById(id).orElseThrow();
        todoRepository.delete(todo);
    }
}

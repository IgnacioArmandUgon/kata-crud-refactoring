package co.com.sofka.crud.model;

import java.util.List;

public class TodoListDTO {
    private Long id;
    private String name;
    private List<TodoDTO> todos;

    public TodoListDTO(){}

    public TodoListDTO(Long id, String name, List<TodoDTO> todos) {
        this.id = id;
        this.name = name;
        this.todos = todos;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<TodoDTO> getTodos() {
        return todos;
    }

    public void setTodos(List<TodoDTO> todos) {
        this.todos = todos;
    }
}

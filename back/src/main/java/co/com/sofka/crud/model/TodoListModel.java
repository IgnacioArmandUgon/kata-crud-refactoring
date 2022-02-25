package co.com.sofka.crud.model;

import javax.persistence.CascadeType;
import javax.persistence.OneToMany;
import java.util.List;

public class TodoListModel {
    private Long id;
    private String name;
    private List<TodoModel> todos;

    public TodoListModel(){};

    public TodoListModel(Long id, String name, List<TodoModel> todos) {
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

    public List<TodoModel> getTodos() {
        return todos;
    }

    public void setTodos(List<TodoModel> todos) {
        this.todos = todos;
    }
}

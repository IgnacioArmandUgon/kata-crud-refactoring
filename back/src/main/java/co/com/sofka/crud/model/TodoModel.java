package co.com.sofka.crud.model;

public class TodoModel {
    private Long id;
    private String name;
    private boolean completed;
    private Long ListId;

    public TodoModel(){}

    public TodoModel(Long id, String name, boolean completed, Long listId) {
        this.id = id;
        this.name = name;
        this.completed = completed;
        ListId = listId;
    }

    public Long getListId() {
        return ListId;
    }

    public void setListId(Long ListId) {
        this.ListId = ListId;
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

    public boolean isCompleted() {
        return completed;
    }

}

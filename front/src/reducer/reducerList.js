export function reducerList(state, action) {
    switch (action.type) {
        case 'update-item':
            const todoUpItem = state.todoList;
            const listUpdateEdit = todoUpItem.list.map((item) => {
                if (item.id === action.item.id) {
                    return action.item;
                }
                return item;
            });
            todoUpItem.list = listUpdateEdit;
            todoUpItem.item = {};
            return {...state, todoList: todoUpItem }
        case 'delete-item':
            const todoUpDelete = state.todoList;
            const listUpdate = todoUpDelete.list.filter((item) => {
                return item.id !== action.id;
            });
            todoUpDelete.list = listUpdate;
            return {...state, todoList: todoUpDelete }
        case 'update-list':
            const todoUpList = state.todoList;
            todoUpList.list = action.list;
            return {...state, todoList: todoUpList }
        case 'edit-item':
            const todoUpEdit = state.todoList;
            todoUpEdit.item = action.item;
            return {...state, todoList: todoUpEdit }
        case 'add-item':
            const todoUp = state.todoList.list;
            todoUp.push(action.item);
            return {...state, todoList: { list: todoUp, item: {} } }
        default:
            return state;
    }
}
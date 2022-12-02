import type TodoItemI from "../components/todos/TodoItem";

const TODOS_KEY = "todos";
const COMPLETED_KEY = "completed";
const DELETED_KEY = " deleted";

interface TodoListState {
  todos: TodoItemI[];
  completed: TodoItemI[];
  deleted: TodoItemI[];
}

export function getTodosFromLocalStorage(): TodoListState {
  const state: TodoListState = {
    todos: [],
    completed: [],
    deleted: [],
  };

  state.todos = getTodos();
  state.completed = getCompleted();
  state.deleted = getDeleted();

  return state;
}

function getLocalStorage(key: string): TodoItemI[] {
  const str = localStorage.getItem(key);

  return JSON.parse(str || "[]");
}

function getTodos(): TodoItemI[] {
  return getLocalStorage(TODOS_KEY);
}

function getCompleted(): TodoItemI[] {
  return getLocalStorage(COMPLETED_KEY);
}

function getDeleted(): TodoItemI[] {
  return getLocalStorage(DELETED_KEY);
}

export function saveStateToLocalStorage(state: TodoListState) {
  const todosString = JSON.stringify(state.todos);
  const completedString = JSON.stringify(state.completed);
  const deletedString = JSON.stringify(state.deleted);

  localStorage.setItem(TODOS_KEY, todosString);
  localStorage.setItem(COMPLETED_KEY, completedString);
  localStorage.setItem(DELETED_KEY, deletedString);
}

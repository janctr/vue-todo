<script lang="ts">
import type TodoItem from './TodoItem';
import { getTodosFromLocalStorage, saveStateToLocalStorage } from '../../util/localStorage';

export default {
    data() {

        //const todoList: { deleted: boolean, completed: boolean, message: string }[] = []
        const todoList: TodoItem[] = [];
        return {
            todoList,
            textInput: ''
        }
    },
    computed: {
        // a computed getter
        isTodoListEmpty() {
            // `this` points to the component instance
            return !(this.todoList.length > 0)
        }
    },

    methods: {
        addTodo() {

            const todoItem = {
                deleted: false,
                completed: false,
                message: this.textInput
            }

            this.todoList = [...this.todoList, todoItem];

            this.textInput = '';

            this.saveTodos(null);
        },
        completeTodo(todo: TodoItem) {
            todo.completed = true;
            this.saveTodos(null);
        },
        deleteTodo(todo: TodoItem) {
            todo.deleted = true;
            this.saveTodos(null);
        },
        deleteAllTodos() { },
        onInputChange(e: any) {
            this.textInput = e.target.value;
        },
        saveTodos(newTodos: TodoItem[] | undefined | null) {
            let todos, completed, deleted;

            if (newTodos) {
                todos = newTodos.filter((todo: TodoItem) => !todo.completed && !todo.deleted);
                completed = newTodos.filter((todo: TodoItem) => todo.completed);
                deleted = newTodos.filter((todo: TodoItem) => todo.deleted);
            } else {
                todos = this.todoList.filter(todo => !todo.completed && !todo.deleted);
                completed = this.todoList.filter(todo => todo.completed);
                deleted = this.todoList.filter(todo => todo.deleted);
            }

            console.log('Saving todo list to local storage... ');

            saveStateToLocalStorage({ todos, completed, deleted });
        }
    },

    watch: {
        todoList(newTodoList) {
            this.saveTodos(newTodoList);
        }
    },

    mounted() {
        // Import any todos from local storage
        console.log('Fetching todos from local storage...');
        const { todos, completed, deleted } = getTodosFromLocalStorage();

        this.todoList = [...todos, ...completed, ...deleted];
    }
}
</script>

<template>
    <!-- Shorthand: v-model="textInput" -->
    <div>
        <input :value="textInput" @input="onInputChange" />
        <button @click="addTodo">Submit</button>
    </div>

    <div>
        <h3 v-if="isTodoListEmpty">Add some todos!</h3>
        <div v-else>

            <h5>Todo</h5>
            <ul>
                <li v-for="todo in todoList.filter(todo => !todo.completed && !todo.deleted)" :key="todo.message">
                    <span>{{ todo.message }}</span>
                    <button @click="deleteTodo(todo)">Delete</button>
                    <button @click="completeTodo(todo)">Complete</button>
                </li>
            </ul>

            <h5>Completed</h5>
            <ul>
                <li v-for="todo in todoList.filter(todo => todo.completed)" :key="todo.message">
                    <span>{{ todo.message }}</span>
                </li>
            </ul>

            <h5>Deleted</h5>
            <ul>
                <li v-for="todo in todoList.filter(todo => todo.deleted)" :key="todo.message">
                    <span>{{ todo.message }} </span>
                </li>
            </ul>
        </div>
    </div>
</template>
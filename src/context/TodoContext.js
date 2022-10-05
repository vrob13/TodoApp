import React from "react";
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider (props) {
    
    const {
        item: todos, 
        saveItem: saveTodos,
        loading,
        error,
      } = useLocalStorage('TODOS_V1', []);      
      
      const [searchValue, setSearchValue] = React.useState('')
      const [openModal, setOpenModal] = React.useState(false);

      const [darkMode, setDarkMode] = useState(true);

      const [filterTodo, setFilterTodo] = useState('all');
    
      const completedTodos = todos.filter((todo) => todo.completed).length;
      const totalTodos = todos.length;
    
      let searchedTodos = [];

      let filteredTodos = [];
    
      if (!searchValue.length>=1) {
        searchedTodos = todos;
      } else {
          searchedTodos = todos.filter(todo=>{
          const todoText = todo.text.toLowerCase();
          const searchText = searchValue.toLowerCase();
          return todoText.includes(searchText);
        })
      }
    
      if (filterTodo === 'all') filteredTodos = searchedTodos; 
      else
      if (filterTodo === 'active') {
        filteredTodos = searchedTodos.filter(todo => {
          return !todo.completed;
        }); 
      } else {
        filteredTodos = searchedTodos.filter(todo => {
          return todo.completed;
        });
      }

      const toggleDarkMode = () => {
        document.querySelector("body").classList.toggle("light");
        setDarkMode(!darkMode);
      }

      const toggleCompleteTodo = (todoId) => {
        const todoIndex = todos.findIndex(todo => todo.id === todoId);
        const newTodos = [...todos];
        newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
        saveTodos(newTodos);
      }
    
     const addTodo = (text) => {
      if (!text.trim()) {
          alert("El nombre está vacío, escribe algo");
          return;
        }
        const newTodos = [...todos];
        newTodos.push({
          id:todos.length + 1,
          completed: false,
          text,
        })
        saveTodos(newTodos);
      };
      const completeTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text);
        const newTodos = [...todos];
        newTodos[todoIndex].completed= true;
        saveTodos(newTodos);
      };

      const deleteTodo = (todoId) => {
        const todoIndex = todos.findIndex(todo => todo.id === todoId);
        const newTodos = [...todos];
        newTodos.splice(todoIndex,1);
        saveTodos(newTodos);    
      }

      const deleteCompletedTodos = () => {
        const activeTodos = todos.filter(todo => !todo.completed);
        saveTodos(activeTodos);
      }

      return (
        <TodoContext.Provider value = {{
            loading,
            error,
            totalTodos,
            completedTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            filterTodo,
            setFilterTodo,
            filteredTodos,
            toggleCompleteTodo,
            toggleDarkMode,
            completeTodo,
            deleteTodo,
            deleteCompletedTodos,
            openModal,
            setOpenModal,
            addTodo,
            darkMode
        }}>
            {props.children}
        </TodoContext.Provider>
      );
}

export { TodoContext, TodoProvider };
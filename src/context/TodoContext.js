import { createContext , useContext } from "react";

// context API likhnege . functality defined todo ki //

export const TodoContext = createContext({
 
    todos: [
        // simple template he todo list ki //
        {
            id:1,
            todo : "some message",
            complated : false,
        } 
        // end template //
    ], 

    //    functality //
      addTodo : (todo)  => {},
      updateTodo : (id,todo)  => {},
      deleteTodo : (id)  => {},
      toggleCompleted : (id)  => {},

})

export const TodoProvider  = TodoContext.Provider

export const useTodo  = ()  => {
    return useContext(TodoContext)
}
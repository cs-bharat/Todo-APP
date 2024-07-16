import { useEffect, useState } from 'react'
import {TodoProvider} from './context'

import './App.css'
import { TodoForm, TodoItem } from './components'

function App() {
  const [todos , setTodos] = useState([]) // phele se kuch existing todo ho sakte he

  const addTodo = (todo) => {
    // setTodos(todo) // no esa karne se phele se exsit todo all delete ho jaynge
    setTodos((prevTodos) => [{id:Date.now() , ...todo} , ...prevTodos])
    // id random date se ho rahi he
  }

  const updateTodo = (id, todo) => {
    setTodos((prevTodos) => prevTodos.map((EachTodo) => (EachTodo.id === id ? todo : EachTodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }

  const toggleCompleted =(id) => {
  //  setTodos((prevTodos) => prevTodos.map((EachTodo) => EachTodo.id === id ? "true" : "false")) //

  setTodos((prevTodos) => prevTodos.map((EachTodo) => EachTodo.id === id ? {...EachTodo , completed : !EachTodo.completed} : EachTodo))
  }

 // localstorage , ye only react me hi used karte he , na ki serverside per //
    // localstorage bydefault data ko string formate me store karta he to hame use json me convert karna hota he .//
  useEffect(() =>{
     const todos = JSON.parse(localStorage.getItem("todos"))
     if(todos && todos.length > 0 ){
      setTodos(todos);
     }
     } , [])

     useEffect(() => {
       localStorage.setItem("todos" , JSON.stringify(todos));
       // setItem ke time (key or string) me data dena padta he
     } ,[ todos])


  return (
    <>
    <TodoProvider value={{todos,addTodo , deleteTodo ,updateTodo , toggleCompleted}}>
     <div className="bg-[#172842] min-h-screen py-8">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                 <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                 <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm/>
                 </div>
                 <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                          <div key={todo.id} className='w-full'>
                            <TodoItem todo={todo}/>
                          </div>
                        ))}
                 </div>
           </div>
      </div>
      </TodoProvider>
    </>
  )
}

export default App

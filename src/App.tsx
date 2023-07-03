import "./App.css"
import { useEffect, useRef, useState } from "react"
import InputField from "./Component/InputField"
import { Todo } from "./model"

import TodoList from "./Component/TodoList"

import { DragDropContext } from "react-beautiful-dnd"

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])
  const [completedList, setCompletedList] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (todos) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }])
      setTodo("")
    }
  }

  return (
    <DragDropContext onDragEnd={() => {}}>
      <div className='w-full h-screen text-center bg-[#2f74c0]'>
        <span className='text-2xl text-white'>Taskify</span>

        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          comletedList={completedList}
          setCompletedList={setCompletedList}
        />
      </div>
    </DragDropContext>
  )
}

export default App

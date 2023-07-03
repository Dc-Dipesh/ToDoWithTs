import React, { useState, useEffect, useRef } from "react"
import { Todo } from "../model"
import { AiFillDelete, AiFillEdit } from "react-icons/ai"
import { MdDone } from "react-icons/md"
import { Draggable, Droppable } from "react-beautiful-dnd"
interface Props {
  todos: Todo[]
  comletedList: Todo[]
  setCompletedList: React.Dispatch<React.SetStateAction<Todo[]>>
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}
const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  comletedList,
  setCompletedList,
}) => {
  const [isEdit, setIsEdit] = useState<number>(0)
  const [toDoEdit, setToDoEdit] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [isEdit])

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    )
  }
  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault()
    setTodos(
      todos.map((todo) =>
        todo.id === isEdit ? { ...todo, todo: toDoEdit } : todo
      )
    )
    setIsEdit(0)
  }
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }
  return (
    <div className='flex justify-center gap-4 w-3/4 mx-auto'>
      <Droppable droppableId='TodoList'>
        {(provided) => (
          <div
            className='w-2/4  mt-5 bg-[#42e4f6] rounded-md p-4'
            ref={provided.innerRef}
            {...provided.droppableProps}>
            <h1>Active Task</h1>
            {todos.map((tds, index) =>
              tds.isDone ? null : (
                <Draggable draggableId={tds.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      key={tds.id}
                      className='bg-yellow-400 p-2 rounded-lg m-1 '
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}>
                      <form
                        className=' flex justify-around gap-10'
                        onSubmit={handleEdit}>
                        {isEdit === tds.id ? (
                          <div className='flex gap-2'>
                            <input
                              ref={inputRef}
                              className='outline-none rounded-md p-2'
                              type='text'
                              value={toDoEdit}
                              onChange={(e) => setToDoEdit(e.target.value)}
                            />
                            <button type='submit'>save</button>
                          </div>
                        ) : (
                          <div className='flex gap-10 w-full '>
                            <span className=''>{tds.todo}</span>
                            <div className='flex gap-4 items-center'>
                              <span
                                onClick={() => {
                                  setIsEdit(tds.id)
                                  setToDoEdit(tds.todo)
                                }}>
                                <AiFillEdit />
                              </span>
                              <span onClick={() => handleDelete(tds.id)}>
                                <AiFillDelete />
                              </span>
                              <span onClick={() => handleDone(tds.id)}>
                                <MdDone />
                              </span>
                            </div>
                          </div>
                        )}
                      </form>
                    </div>
                  )}
                </Draggable>
              )
            )}
          </div>
        )}
      </Droppable>
      <Droppable droppableId='TodoComplete'>
        {(provided) => (
          <div
            className='w-2/4 mt-5 bg-[#e17b66] rounded-md p-4'
            ref={provided.innerRef}
            {...provided.droppableProps}>
            <h1>Complete</h1>
            {comletedList.map((tds, index) => (
              <div key={tds.id} className='bg-yellow-400 p-2 rounded-lg m-1 '>
                <div className='flex gap-10'>
                  <span className=''>{tds.todo}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default TodoList

import { useRef } from "react"

interface Props {
  todo: string
  setTodo: React.Dispatch<React.SetStateAction<string>>
  handleAdd: (e: React.FormEvent) => void
}
const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className='flex justify-center '>
      <form
        className='w-1/4 relative'
        onSubmit={(e) => {
          handleAdd(e)
          inputRef.current?.blur()
        }}>
        <input
          ref={inputRef}
          type='text'
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder='Enter your task'
          className='rounded-lg w-full h-10'
        />
        <button
          type='submit'
          className='absolute right-2 shadow-black shadow-md active:scale-90 bg-blue-500 rounded-full h-8 w-8 mt-1'>
          Go
        </button>
      </form>
    </div>
  )
}

export default InputField

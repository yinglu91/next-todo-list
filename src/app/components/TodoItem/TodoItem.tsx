import { FaTrash } from 'react-icons/fa'
import { MouseEvent } from 'react'
import type { Todo } from '@/types/Todo'

type Props = {
  todo: Todo
  toggleTodo: (id: number) => void
  deleteTodo: (id: number) => void
}

export default function TodoItem({ todo, toggleTodo, deleteTodo }: Props) {
  const handleChange = async () => {
    toggleTodo(todo.id)
  }

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    deleteTodo(todo.id)
  }

  return (
    <article className='my-4 flex justify-between items-center'>
      <label
        className='text-2xl hover:underline'
        data-testid='todo-item'
        htmlFor={todo.id.toString()}
      >
        {todo.title}
      </label>
      <div className='flex items-center gap-4'>
        <input
          type='checkbox'
          checked={todo.completed}
          id={todo.id.toString()}
          name='completed'
          onChange={handleChange}
          className='min-w-[2rem] min-h-[2rem]'
        />

        <button
          data-testid='delete-button'
          onClick={handleDelete}
          className='p-3 text-xl rounded-2xl text-black border-solid border-black border-2 max-w-xs bg-red-400 hover:cursor-pointer hover:bg-red-300'
        >
          <FaTrash />
        </button>
      </div>
    </article>
  )
}

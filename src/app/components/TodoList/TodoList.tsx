import TodoItem from '../TodoItem/TodoItem'
import type { Todo } from '@/types/Todo'

type Props = {
  todos: Todo[]
  toggleTodo: (id: number) => void
  deleteTodo: (id: number) => void
}

export default function TodoList({ todos, toggleTodo, deleteTodo }: Props) {
  let content
  if (todos.length === 0) {
    content = <p>No Todos Available</p>
  } else {
    const sortedTodos = todos.sort((a, b) => b.id - a.id)

    content = (
      <>
        {sortedTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </>
    )
  }

  return content
}

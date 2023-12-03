'use client'

import TodoList from './components/TodoList/TodoList'
import AddTodo from './components/AddTodo/AddTodo'
import { useState } from 'react'
import type { Todo } from '@/types/Todo'
import { initTodos } from '@/data/constants'

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>(initTodos)

  const addTodo = (title: string) => {
    const highestId = Math.max(...todos.map((todo) => todo.id))

    const newTodo = {
      title: title,
      completed: false,
      id: highestId + 1,
    }

    const updatedTodos = [...todos, newTodo]

    setTodos(updatedTodos)
  }

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id)

    setTodos(updatedTodos)
  }

  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed }
      } else {
        return todo
      }
    })

    setTodos(updatedTodos)
  }

  return (
    <>
      <AddTodo addTodo={addTodo} />

      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </>
  )
}

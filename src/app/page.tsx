'use client'

import TodoList from './components/TodoList/TodoList'
import AddTodo from './components/AddTodo/AddTodo'
import { useEffect, useState } from 'react'
import type { Todo } from '@/types/Todo'

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  console.log(todos)

  useEffect(() => {
    const fetchTodos = async () => {
      const respone = await fetch('http://localhost:3004/todos')
      const result = (await respone.json()) as Todo[]

      setTodos(result)
    }

    fetchTodos()
  }, [])

  const addTodo = async (title: string) => {
    const highestId = Math.max(...todos.map((todo) => todo.id))

    const newTodo = {
      title: title,
      completed: false,
      id: highestId + 1,
    }

    await fetch('http://localhost:3004/todos', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo), // body data type must match "Content-Type" header
    })

    const updatedTodos = [...todos, newTodo]

    setTodos(updatedTodos)
  }

  const deleteTodo = async (id: number) => {
    await fetch(`http://localhost:3004/todos/${id}`, {
      method: 'DELETE',
    })
    console.log('deleted id=', id)

    const updatedTodos = todos.filter((todo) => todo.id !== id)

    setTodos(updatedTodos)
  }

  const toggleTodoCompleted = async (id: number) => {
    const foundTodo = todos.find((todo) => todo.id === id) as Todo
    const updatedTodo = { ...foundTodo, completed: !foundTodo.completed }

    await fetch(`http://localhost:3004/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTodo), // body data type must match "Content-Type" header
    })
    console.log('updated id=', id)

    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return updatedTodo
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
        toggleTodo={toggleTodoCompleted}
        deleteTodo={deleteTodo}
      />
    </>
  )
}

import { useCallback, useState } from 'react'
import type { Todo, Category } from '@/types/index.types'

type States = {
  allTodos: Todo[]
  shownTodos: Todo[]
  category: Category
}
type Actions = {
  addNewTodo: (item: Todo) => void
  toggleTodoChecked: (title: string) => void
  deleteTodo: (item: Todo) => void
  selectCategory: (cat: Category) => void
  clearCompleted: () => void
}
type ReturnProps = { states: States; actions: Actions }

export function useTodo(): ReturnProps {
  const [allTodos, setAllTodos] = useState<Todo[]>([])
  const [category, setCategory] = useState<Category>('All')

  const selectCategory = useCallback((cat: Category) => {
    setCategory(cat)
  }, [])

  const shownTodos = allTodos.filter((item) => {
    if (category === 'All') {
      return true
    } else {
      return item.status === category
    }
  })

  const addNewTodo = useCallback((item: Todo) => {
    setAllTodos((prev) => [...prev, item])
  }, [])

  const deleteTodo = (item: Todo) => {
    setAllTodos((prev) => prev.filter((i) => i.title !== item.title))
  }

  const clearCompleted = () => {
    setAllTodos((prev) => prev.filter((item) => item.status !== 'Completed'))
  }

  const toggleTodoChecked = (title: string) => {
    setAllTodos(
      allTodos.map((item) => {
        if (item.title === title) {
          item.status = item.status === 'Active' ? 'Completed' : 'Active'
        }
        return item
      })
    )
  }

  const states = {
    allTodos,
    shownTodos,
    category,
  }
  const actions = {
    selectCategory,
    addNewTodo,
    toggleTodoChecked,
    deleteTodo,
    clearCompleted,
  }

  return { states, actions }
}

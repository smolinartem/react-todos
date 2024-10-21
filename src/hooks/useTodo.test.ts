import { act, renderHook } from '@testing-library/react'
import { useTodo } from './useTodo'
import { Todo } from '@/types/index.types'
it('should filter todos based on category', () => {
  const { result } = renderHook(() => useTodo())
  const { actions } = result.current

  act(() => {
    actions.addNewTodo({ title: 'Test1', status: 'Active' })
    actions.addNewTodo({ title: 'Test2', status: 'Completed' })
    actions.selectCategory('Completed')
  })

  expect(result.current.states.shownTodos).toHaveLength(1)
  expect(result.current.states.shownTodos[0].title).toBe('Test2')
})

it('should delete a todo when "Delete button" is clicked', () => {
  const { result } = renderHook(() => useTodo())
  const { actions } = result.current

  const todoToDelete: Todo = { title: 'Test1', status: 'Active' }
  act(() => {
    actions.addNewTodo(todoToDelete)
    actions.deleteTodo(todoToDelete)
  })

  expect(result.current.states.allTodos).not.toContainEqual(todoToDelete)
})

it('should clear completed todos when "Clear Completed" is clicked', () => {
  const { result } = renderHook(() => useTodo())
  const { actions } = result.current

  const todoActive: Todo = { title: 'Test1-Active', status: 'Active' }
  const todoCompleted: Todo = { title: 'Test2-Completed', status: 'Completed' }

  act(() => {
    actions.addNewTodo(todoActive)
    actions.addNewTodo(todoCompleted)
    actions.clearCompleted()
  })

  expect(result.current.states.allTodos).toHaveLength(1)
  expect(result.current.states.allTodos[0].title).toBe('Test1-Active')
})

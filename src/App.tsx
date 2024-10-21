import { useTodo } from './hooks/useTodo'

import AddTodoForm from './components/shared/AddTodoForm'
import TodoList from './components/shared/TodoList'
import Filters from './components/shared/Filters'
import { Button } from './components/ui/button'
import { Separator } from './components/ui/separator'
import { Toaster } from './components/ui/toaster'

export default function App() {
  const { states, actions } = useTodo()

  return (
    <>
      <main className='min-h-screen container flex items-center justify-center'>
        <div className='flex flex-col gap-8 w-full py-10 sm:max-w-screen-sm sm:shadow-main sm:p-5 sm:rounded-md'>
          <h1 className='text-4xl text-green-600 font-light uppercase text-center'>Todos</h1>
          <AddTodoForm addNewTodo={actions.addNewTodo} />
          <Separator />
          <TodoList
            items={states.shownTodos}
            onTodoCheck={actions.toggleTodoChecked}
            deleteTodo={actions.deleteTodo}
          />
          {states.allTodos.length > 0 && (
            <div className='flex items-center justify-between gap-2'>
              <Filters category={states.category} selectCategory={actions.selectCategory} />
              <Button onClick={actions.clearCompleted} variant='outline'>
                Clear completed
              </Button>
            </div>
          )}
        </div>
      </main>
      <Toaster />
    </>
  )
}

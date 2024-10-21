import { Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useState, memo } from 'react'
import { Todo } from '@/types/index.types'
import { useToast } from '@/hooks/use-toast'

interface Props {
  addNewTodo: (item: Todo) => void
}

export default memo(function AddTodoForm({ addNewTodo }: Props) {
  const [value, setValue] = useState('')
  const { toast } = useToast()
  console.log('form')

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (value.trim() === '') {
      return toast({
        description: 'Please enter any todo.',
        duration: 3000,
        className: 'border border-red-600',
      })
    }
    addNewTodo({ title: value, status: 'Active' })
    setValue('')
  }
  return (
    <form className='flex gap-2' onSubmit={handleFormSubmit} autoComplete='off'>
      <Input
        name='todo'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type='text'
        placeholder='what needs to be done?'
        className='h-12'
      />
      <Button
        type='submit'
        className='shrink-0 size-12'
        variant='outline'
        aria-label='Add todo button.'
      >
        <Plus />
      </Button>
    </form>
  )
})

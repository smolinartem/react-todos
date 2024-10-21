import { Todo } from '@/types/index.types'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'

interface Props {
  items: Todo[]
  onTodoCheck: (title: string) => void
  deleteTodo: (item: Todo) => void
}
export default function TodoList({ items, onTodoCheck, deleteTodo }: Props) {
  console.log('list')

  if (items.length === 0) return null
  return (
    <ul className='flex flex-col gap-4'>
      {items.map((item, index) => (
        <li key={index} className='flex gap-2 min-h-10'>
          <div className='w-full cursor-pointer border border-green-600 rounded-md px-3 flex gap-3 items-center'>
            <Checkbox
              id={`item-${index}`}
              checked={item.status === 'Completed'}
              onCheckedChange={() => onTodoCheck(item.title)}
            />
            <Label
              className={cn(
                item.status === 'Completed' && 'line-through',
                'text-sm font-normal cursor-pointer grow'
              )}
              htmlFor={`item-${index}`}
            >
              {item.title}
            </Label>
          </div>
          <Button
            className='shrink-0'
            onClick={() => deleteTodo(item)}
            variant='outline'
            size='icon'
          >
            <Trash2 />
          </Button>
        </li>
      ))}
    </ul>
  )
}

import { cn } from '@/lib/utils'
import { Category } from '@/types/index.types'
import { memo } from 'react'

const cats = ['All', 'Active', 'Completed']
interface Props {
  category: Category
  selectCategory: (cat: Category) => void
}
export default memo(function Filters({ category, selectCategory }: Props) {
  console.log('filter')

  return (
    <ul className='flex gap-2'>
      {cats.map((item, index) => (
        <li
          className={cn(category === item && 'text-green-600', 'cursor-pointer')}
          key={index}
          onClick={() => selectCategory(item as Category)}
        >
          {item}
        </li>
      ))}
    </ul>
  )
})

export type Category = 'All' | 'Active' | 'Completed'
export type Status = 'Active' | 'Completed'

export interface Todo {
  title: string
  status: Status
}

export namespace ITodo {
  export interface Model {
    id: number
    userId: number
    title: string
    completed: boolean
  }

  export enum Status {
    All = 'all',
    Completed = 'completed',
    Uncompleted = 'uncompleted',
    Favorites = 'favorites'
  }
}

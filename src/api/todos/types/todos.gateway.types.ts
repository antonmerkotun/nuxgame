import type { ITodo } from '@/types/models/todo';

export namespace ITodosGateway {
  export namespace Get {
    export type ApiResponse = ITodo.Model[] | undefined
  }

  export namespace addTodo {
    export type Params = { userId: number; title: string }
    export type ApiResponse = boolean | undefined
  }
}

import type { ITodosGateway } from '@/api/todos/types';

export class TodosGateway {
  public static async getMany(params: any): Promise<ITodosGateway.Get.ApiResponse> {
    try {
      const queryString = params ? '?' + new URLSearchParams(params).toString() : '';

      const response = await fetch(`https://jsonplaceholder.typicode.com/todos${queryString}`);

      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  public static async addTodo(
    newTodo: ITodosGateway.addTodo.Params
  ): Promise<ITodosGateway.addTodo.ApiResponse> {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodo)
      });

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
      }

      return response.ok;
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }
}

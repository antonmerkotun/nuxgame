import { defineStore } from 'pinia';
import { ref } from 'vue';

import { ITodo } from '@/types/models/todo';
import { TodosGateway } from '@/api/todos';

export const useTodosStore = defineStore(
  'todos',
  () => {
    const todos = ref<ITodo.Model[] | undefined>([]);
    const favorites = ref<number[]>([]);
    const selectedStatus = ref<ITodo.Status>(ITodo.Status.All);
    const selectedUserId = ref<string | number>(ITodo.Status.All);
    const searchTerm = ref<string>('');

    async function fetchTodos(params: any) {
      todos.value = await TodosGateway.getMany(params);
    }

    function toggleFavorite(todoId: number) {
      const index = favorites.value.indexOf(todoId);
      if (index !== -1) {
        favorites.value.splice(index, 1);
      } else {
        favorites.value.push(todoId);
      }
    }

    function isFavorite(todoId: number) {
      return favorites.value.includes(todoId);
    }

    async function addTodo(newTodo: ITodo.Model) {
      if (!todos.value) return;

      await TodosGateway.addTodo({ userId: newTodo.userId, title: newTodo.title });

      todos.value.push(newTodo);
    }

    return {
      todos,
      favorites,
      selectedStatus,
      selectedUserId,
      searchTerm,

      fetchTodos,
      toggleFavorite,
      isFavorite,
      addTodo
    };
  },
  { persist: true }
);

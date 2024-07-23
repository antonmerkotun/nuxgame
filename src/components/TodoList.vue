<template>
  <div class="todo-list">
    <div class="create-todo">
      <p>Create Todo</p>
      <input id="newUserId" placeholder="User ID" v-model.number="newTodoUserId" type="number" />
      <input id="newTitle" placeholder="Title" v-model="newTodoTitle" />
      <button @click="addTodo">Add todo</button>
    </div>

    <div class="filtration">
      <div class="params">
        <label for="statusFilter">Filter by Status:</label>
        <select class="select" id="statusFilter" v-model="selectedStatus">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
          <option value="favorites">Favorites</option>
        </select>
      </div>

      <div class="params">
        <label for="userFilter">Filter by User ID:</label>
        <select class="select" id="userFilter" v-model="selectedUserId">
          <option value="all">All Users</option>
          <option v-for="userId in userIds" :key="userId" :value="userId">{{ userId }}</option>
        </select>
      </div>

      <input id="searchTitle" v-model="searchTerm" placeholder="Search by title" />
    </div>

    <div class="todos">
      <div v-for="todo in todos" :key="todo.id" class="todo">
        <h3 class="todo-title" v-html="highlightSearchTerm(todo.title, searchTerm)"></h3>
        <p>Status: {{ todo.completed ? 'Completed' : 'Uncompleted' }}</p>
        <p>User id: {{ todo.userId }}</p>

        <button class="button-favorite" @click="toggleFavorite(todo.id)">
          {{ isFavorite(todo.id) ? 'Remove from Favorites' : 'Add to Favorites' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch } from 'vue';
import { useTodosStore } from '@/stores/todos';
import { storeToRefs } from 'pinia';

import { ITodo } from '@/types/models/todo';
import { TodosGateway } from '@/api/todos';

const todosStore = useTodosStore();
const { todos, selectedStatus, selectedUserId, searchTerm } = storeToRefs(todosStore);

const newTodoUserId = ref<number | null>(null);
const newTodoTitle = ref<string>('');
const userIds = ref<number[]>();

async function setUsersIds() {
  if (!todos.value) return;

  const ids = new Set<number>();

  const allTodos = await TodosGateway.getMany({});

  if (allTodos) {
    allTodos.forEach((todo) => ids.add(todo.userId));
    userIds.value = Array.from(ids);
  }
}

async function loadData() {
  const params: { completed?: boolean; userId?: number | string } = {};

  if (selectedStatus.value === ITodo.Status.Completed) {
    params.completed = true;
  }

  if (selectedStatus.value === ITodo.Status.Uncompleted) {
    params.completed = false;
  }

  if (selectedUserId.value !== ITodo.Status.All) {
    params.userId = selectedUserId.value;
  }

  await todosStore.fetchTodos(params);

  if (searchTerm.value) {
    filterTodos();
  }

  if (selectedStatus.value === ITodo.Status.Favorites) {
    filterFavorites();
  }
}

const toggleFavorite = (todoId: number) => {
  todosStore.toggleFavorite(todoId);
};

const isFavorite = (todoId: number) => {
  return todosStore.isFavorite(todoId);
};

function filterFavorites() {
  if (!todos.value) return;

  todos.value = todos.value.filter((todo) => todosStore.isFavorite(todo.id));
}

function filterTodos() {
  if (!todos.value) return;

  todos.value = todos.value.filter((todo) => {
    const searchValue = searchTerm?.value?.toLowerCase() || '';
    return searchValue === '' || todo.title.toLowerCase().includes(searchValue);
  });
}

const addTodo = () => {
  if (!todos.value) return;

  if (newTodoUserId.value !== null && newTodoTitle.value.trim() !== '') {
    const newTodo: ITodo.Model = {
      id: todos.value.length + 1,
      userId: newTodoUserId.value,
      title: newTodoTitle.value,
      completed: false
    };

    todosStore.addTodo(newTodo);
    newTodoUserId.value = null;
    newTodoTitle.value = '';
  }
};

function highlightSearchTerm(text: string, term: string): string {
  if (!term.trim()) return text;

  const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedTerm})`, 'gi');

  return text.replace(regex, '<mark>$1</mark>');
}

onBeforeMount(async () => {
  await Promise.all([await loadData(), await setUsersIds()]);
});

watch([selectedStatus, selectedUserId, searchTerm], loadData);
</script>

<style scoped>
.todo-list {
  margin: 50px 0;
}

.create-todo {
  max-width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 10px;
  margin: 0 auto;
}

.filtration {
  margin: 50px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

.params {
  max-width: 250px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.select {
  width: 120px;
}

.todos {
  display: flex;
  flex-flow: wrap;
  gap: 16px;
  justify-content: center;
}

.todo {
  max-width: 200px;
  width: 100%;
  height: 200px;
  border: 1px solid black;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
}

.todo-title {
  height: 100%;
  max-height: 85px;
}

.todo-title::first-letter {
  text-transform: uppercase;
}
</style>

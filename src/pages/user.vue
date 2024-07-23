<template>
  <div class="user">
    <UserDetails />

    <TodoList />
  </div>
</template>

<script setup lang="ts">
import TodoList from '@/components/TodoList.vue';
import UserDetails from '@/components/UserDetails.vue';
</script>

<style scoped>
.user {
  padding: 16px;
}
</style>

<template>
  <div class="sing-in">
    <div class="container">
      <div class="modal-title">description</div>

      <form @submit.prevent="singIn" class="form">
        <p class="form-title">description</p>

        <input
          class="username"
          type="text"
          id="username"
          placeholder="Username"
          v-model="username"
          @input="validateUsername"
          required
        />

        <input
          class="phone"
          type="text"
          id="phone"
          placeholder="Phone Number"
          v-model="phone"
          required
        />

        <button class="button-register" type="submit">Register</button>
      </form>

      <p class="error" v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';

const username = ref<string>('');
const phone = ref<string | number>('');
const error = ref<string>('');

const userStore = useUserStore();

const validateUsername = () => {
  username.value = username.value.replace(/[^a-zA-Z]/g, '');
};

async function singIn() {
  const user = await userStore.signIn({ username: username.value, phone: phone.value });

  if (!user) error.value = 'Login error';
}
</script>

<style scoped>
.sing-in {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #545454;
}

.container {
  max-width: 447px;
  width: 100%;
  border: 1px solid #c3c3c3;
  text-align: center;
  overflow: hidden;
  border-radius: 5px;
}

.modal-title {
  background-color: #a5a5a5;
  padding: 15px 0;
  font-size: 17px;
  font-weight: 400;
  line-height: 21px;
  color: #5f5f5f;
}

.form {
  display: flex;
  flex-direction: column;
  padding: 15px 25px 30px;
  background-color: #c3c3c3;
}

.form-title {
  font-size: 15px;
  font-weight: 400;
  line-height: 21px;
  text-align: left;
  color: #5f5f5f;
  padding: 15px 0;
}

.username {
  height: 41px;
  background-color: #ffffff;
  border: none;
}

.phone {
  margin-top: 20px;
  height: 41px;
  background-color: #ffffff;
  border: none;
}

.button-register {
  margin-top: 25px;
  font-size: 17px;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: -0.025em;
  color: #ffffff;
  background-color: #519945;
  border-radius: 5px;
  border: none;
  height: 41px;
}

.error {
  background-color: #c77a7a;
}
</style>

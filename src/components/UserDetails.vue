<template>
  <div class="user-details">
    <div>
      <div v-if="user">
        <button class="sign-out" @click="signOut">Sign Out</button>
        <div class="user-details">
          <h1>User Details</h1>

          <div class="detail">
            <span class="label">ID:</span>
            <span class="value">{{ user.id }}</span>
          </div>

          <div class="detail">
            <span class="label">Name:</span>
            <span class="value">{{ user.name }}</span>
          </div>

          <div class="detail">
            <span class="label">Username:</span>
            <span class="value">{{ user.username }}</span>
          </div>

          <div class="detail">
            <span class="label">Email:</span>
            <span class="value">{{ user.email }}</span>
          </div>

          <div class="detail">
            <span class="label">Address:</span>

            <ul>
              <li><strong>Street:</strong> {{ user.address.street }}</li>
              <li><strong>Suite:</strong> {{ user.address.suite }}</li>
              <li><strong>City:</strong> {{ user.address.city }}</li>
              <li><strong>Zipcode:</strong> {{ user.address.zipcode }}</li>
              <li>
                <strong>Geo:</strong> Latitude: {{ user.address.geo.lat }}, Longitude:
                {{ user.address.geo.lng }}
              </li>
            </ul>
          </div>

          <div class="detail">
            <span class="label">Phone:</span>
            <span class="value">{{ user.phone }}</span>
          </div>

          <div class="detail">
            <span class="label">Website:</span>
            <span class="value">
              <a :href="'http://' + user.website" target="_blank">{{ user.website }}</a>
            </span>
          </div>

          <div class="detail">
            <span class="label">Company:</span>

            <ul>
              <li><strong>Name:</strong> {{ user.company.name }}</li>
              <li><strong>Catch Phrase:</strong> {{ user.company.catchPhrase }}</li>
              <li><strong>BS:</strong> {{ user.company.bs }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

function signOut() {
  userStore.signOut();
}
</script>

<style scoped>
.user-details {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.user-details h1 {
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.detail {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  background-color: #fff;
}

.label {
  font-weight: bold;
  color: #555;
}

.value {
  color: #333;
}

ul {
  margin: 0;
  padding-left: 20px;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.sign-out {
  width: 100px;
  height: 30px;
  border-radius: 5px;
  border: none;
}
</style>

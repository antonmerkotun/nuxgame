import { defineStore } from 'pinia';
import { ref } from 'vue';
import router from '@/router';

import { AuthGateway, type IAuthGateway } from '@/api/auth';
import type { IUser } from '@/types/models/user';
import { Urls } from '@/constants/urls';

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref<IUser.Model | null>(null);

    function setUser(data: IUser.Model | null) {
      user.value = data;
    }

    async function signIn(body: IAuthGateway.SignIn.Params) {
      const { username, phone } = body;
      const users = await AuthGateway.getUsers();

      const user = users?.find(
        (user: IUser.Model) => user.username === username && user.phone === phone
      );
      if (!user) return false;

      setUser(user);

      await router.push(Urls.User);
    }

    async function signOut() {
      setUser(null);
      await router.push(Urls.SignIn);
    }

    return {
      user,

      signIn,
      signOut
    };
  },
  { persist: true }
);

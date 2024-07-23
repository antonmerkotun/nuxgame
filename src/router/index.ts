import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';

import SignIn from '@/pages/sign-in.vue';
import User from '@/pages/user.vue';
import { Urls } from '@/constants/urls';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: Urls.SignIn,
      name: 'sign-in',
      component: SignIn
    },
    {
      path: Urls.User,
      name: 'user',
      component: User
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  if (!userStore.user && to.name !== 'sign-in') {
    return next(Urls.SignIn);
  }

  next();
});

export default router;

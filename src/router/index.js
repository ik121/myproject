import { createRouter, createWebHistory } from 'vue-router';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/Index.vue'),
    },
    {
      path: '/',
      name: 'home',
      redirect: 'message',
      component: () => import('../views/Home/Index.vue'),
      children: [
        {
          path: 'message',
          name: 'message',
          component: () => import('../views/Home/HomeMessage/Index.vue'),
        },
        {
          path: 'information',
          name: 'information',
          component: () => import('../views/Home/Information/Index.vue'),
        },
        {
          path: 'idc',
          name: 'idc',
          children: [
            {
              path: 'community',
              name: 'community',
              component: () => import('../views/IDC/Community/Index.vue'),
            },
            {
              path: 'building',
              name: 'building',
              component: () => import('../views/IDC/Building/Index.vue'),
            },
            {
              path: 'car',
              name: 'car',
              component: () => import('../views/IDC/Car/Index.vue'),
            },
            {
              path: 'owner',
              name: 'owner',
              component: () => import('../views/IDC/Owner/Index.vue'),
            },
            {
              path: 'tenant',
              name: 'tenant',
              component: () => import('../views/IDC/Tenant/Index.vue'),
            },
            {
              path: 'visitor',
              name: 'visitor',
              component: () => import('../views/IDC/Visitor/Index.vue'),
            },
            {
              path: 'advertisement',
              name: 'advertisement',
              component: () => import('../views/IDC/Advertisement/Index.vue'),
            },
            {
              path: 'vehicle',
              name: 'vehicle',
              component: () => import('../views/IDC/Vehicle/Index.vue'),
            },
          ],
        },
        {
          path: 'statistic',
          name: 'statistic',
          children: [
            {
              path: 'personnel',
              name: 'personnel',
              component: () => import('../views/Statistic/Personnel/Index.vue'),
            },
          ],
        },
        {
          path: 'Property',
          name: 'Property',
          children: [
            {
              path: 'notice',
              name: 'notice',
              component: () => import('../views/Property/Notice/Index.vue'),
            },
            {
              path: 'maintain',
              name: 'maintain',
              component: () => import('../views/Property/maintain/Index.vue'),
            },
            {
              path: 'complaint',
              name: 'complaint',
              component: () => import('../views/Property/complaint/Index.vue'),
            },
            {
              path: 'renovation',
              name: 'renovation',
              component: () => import('../views/Property/renovation/Index.vue'),
            },
          ],
        },
      ],
    },
  ],
});

export default router;

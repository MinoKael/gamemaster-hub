import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/dice',
            name: 'dice',
            component: () => import('../pages/Dice.vue'),
        },
        {
            path: '/magias',
            name: 'magias',
            component: () => import('../pages/Magias.vue'),
        },
    ],
});

export default router;

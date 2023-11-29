import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';

const router = createRouter({
    history: createWebHistory('/gamemaster-hub/'),
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
        {
            // path: "*",
            path: '/:catchAll(.*)',
            name: 'NotFound',
            component: Home,
        },
    ],
});

export default router;

import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Dice from '../pages/Dice.vue';
import Magias from '../pages/Magias.vue';

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
            component: Dice,
        },
        {
            path: '/magias',
            name: 'magias',
            component: Magias,
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

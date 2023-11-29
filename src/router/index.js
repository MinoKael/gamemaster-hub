import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../pages/Home.vue';

const router = createRouter({
    history: createWebHashHistory('/gamemaster-hub'),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: 'dice',
            name: 'dice',
            component: () => import('../pages/Dice.vue'),
        },
        {
            path: 'magias',
            name: 'magias',
            component: () => import('../pages/Magias.vue'),
        },
    ],
});

export default router;

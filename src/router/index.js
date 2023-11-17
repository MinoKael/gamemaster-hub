import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/dice',
            name: 'dice',
            component: () => import('../views/DiceView.vue'),
        },
        {
            path: '/magias',
            name: 'magias',
            component: () => import('../views/MagiasView.vue'),
        },
    ],
});

export default router;

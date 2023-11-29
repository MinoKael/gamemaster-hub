import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DiceBoxVue from '@/components/DiceBox.vue';
import MagiasViewVue from '../views/MagiasView.vue';

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
            component: DiceBoxVue,
        },
        {
            path: '/magias',
            name: 'magias',
            component: MagiasViewVue,
        },
    ],
});

export default router;

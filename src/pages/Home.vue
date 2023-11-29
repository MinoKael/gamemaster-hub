<script setup>
import { ref } from 'vue';
import magiasBanner from '../assets/magias_banner.png';
import diceBanner from '../assets/dice_banner.png';

const items = ref([
    {
        route: '/dice',
        srcImg: diceBanner,
        title: 'Rolagem de Dados',
    },
    {
        route: '/magias',
        srcImg: magiasBanner,
        title: 'Magias Tormenta 20',
    },
]);
</script>
<template>
    <v-card
        class="justify-center align-center mt-4"
        max-width="650px"
        flat
        elevation="0"
        variant="text"
    >
        <v-row no-gutters align="center" justify="center">
            <v-hover v-slot="{ isHovering, props }" v-for="item in items">
                <RouterLink
                    :to="item.route"
                    style="text-decoration: none; color: inherit"
                >
                    <v-card
                        :elevation="isHovering ? 16 : 2"
                        v-bind="props"
                        :class="{ 'on-hover': isHovering }"
                        class="ma-2"
                        width="300px"
                        height="250px"
                    >
                        <v-img
                            :src="item.srcImg"
                            height="250px"
                            cover
                            class="align-end"
                        >
                            <v-card-title
                                class="text-white text-center text-h5 font-weight-bold bg-primary pa-1"
                            >
                                {{ item.title }}
                            </v-card-title>
                        </v-img>
                    </v-card>
                </RouterLink>
            </v-hover>
        </v-row>
    </v-card>
</template>

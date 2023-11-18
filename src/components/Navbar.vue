<script setup>
import {
    colorNav,
    toggleTheme,
    isDarkTheme,
} from '../plugins/globalFunctions.js';
import { useRoute } from 'vue-router';
import { useTheme } from 'vuetify';
const route = useRoute();
const theme = useTheme();
const emit = defineEmits(['toggleMagias', 'toggleTomo']);
const title = (route) => {
    switch (route) {
        case 'magias':
            return 'Magias Tormenta 20';
        case 'dice':
            return 'Rolagem de Dados';
        default:
            return 'Gamemaster Hub';
    }
};
</script>
<template>
    <v-toolbar :color="colorNav(route.name)" elevation="4">
        <v-btn v-if="route.name != 'home'" icon="mdi-arrow-left" to="/" />
        <v-row align="center" justify="center">
            <v-card-title>{{ title(route.name) }} </v-card-title>
        </v-row>
        <v-btn icon @click="toggleTheme(theme)" aria-label="Mudar tema">
            <v-icon>{{
                isDarkTheme(theme, 'mdi-weather-sunny', 'mdi-weather-night')
            }}</v-icon>
        </v-btn>
    </v-toolbar>
</template>

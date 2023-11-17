<script setup>
import {
    colorNav,
    toggleTheme,
    isDarkTheme,
} from '../plugins/globalFunctions.js';
import { useRoute } from 'vue-router';
import { useTheme } from 'vuetify';
const location = useRoute();
const theme = useTheme();
const emit = defineEmits(['toggleMagias', 'toggleTomo']);
</script>
<template>
    <v-toolbar :color="colorNav(location.name)" elevation="4">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-row align="center" justify="center">
            <RouterLink to="/" style="text-decoration: none; color: inherit">
                <v-card-title> Gamemaster Hub </v-card-title>
            </RouterLink>
        </v-row>
        <v-btn icon @click="toggleTheme(theme)" aria-label="Mudar tema">
            <v-icon>{{
                isDarkTheme(theme, 'mdi-weather-sunny', 'mdi-weather-night')
            }}</v-icon>
        </v-btn>
    </v-toolbar>
</template>

<script setup>
import { useTheme } from 'vuetify';

const emit = defineEmits(['toggleMagias', 'toggleTomo']);

const theme = useTheme();
const toggleTheme = () => {
    theme.global.name.value = theme.global.current.value.dark
        ? 'light'
        : 'dark';
};
</script>
<template>
    <v-toolbar color="primary" elevation="4">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-row align="center" justify="center">
            <v-card-title> Dice Roll </v-card-title>
        </v-row>
        <v-btn icon @click="toggleTheme" aria-label="Mudar tema">
            <v-icon>{{
                theme.global.current.value.dark
                    ? 'mdi-weather-sunny'
                    : 'mdi-weather-night'
            }}</v-icon>
        </v-btn>
    </v-toolbar>
</template>

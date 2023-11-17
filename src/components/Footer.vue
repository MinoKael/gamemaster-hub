<script setup>
import { colorNav, isDarkTheme } from '../plugins/globalFunctions.js';
import { useTheme } from 'vuetify';
import { useRoute } from 'vue-router';
const location = useRoute();
const theme = useTheme();
</script>
<template>
    <v-footer
        app
        bottom
        absolute
        padless
        :class="`bg-${colorNav(location.name)}`"
    >
        <v-row align="baseline" justify="center" no-gutters>
            2023 —
            <v-btn
                :color="isDarkTheme(theme, 'white', 'black')"
                variant="text"
                density="compact"
                class="pl-1"
                rounded="xl"
                append-icon="mdi-github"
                href="https://github.com/MinoKael/gamemaster-hub"
                target="_blank"
                >MinoKael</v-btn
            >
        </v-row>
    </v-footer>
</template>

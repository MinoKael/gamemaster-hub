<script setup>
import { useTheme } from 'vuetify';

const theme = useTheme();
</script>
<template>
    <v-footer app bottom absolute padless class="bg-primary">
        <v-row align="baseline" justify="center" no-gutters>
            2023 —
            <v-btn
                :color="theme.global.current.value.dark ? 'white' : 'black'"
                variant="text"
                density="compact"
                class="pl-1"
                rounded="xl"
                append-icon="mdi-github"
                href="https://github.com/MinoKael/dice-roll"
                target="_blank"
                >MinoKael</v-btn
            >
        </v-row>
    </v-footer>
</template>

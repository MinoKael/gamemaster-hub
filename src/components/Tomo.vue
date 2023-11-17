<script setup>
import Card from './Card.vue';
import { useDisplay } from 'vuetify';
const { prop, tomo } = defineProps(['prop', 'tomo']);

const emit = defineEmits(['removeTomo']);

const { mdAndUp } = useDisplay();
</script>
<template>
    <v-container class="fill-height justify-center">
        <v-responsive
            class="text-center fill-height"
            :max-width="mdAndUp ? '1000' : ''"
        >
            <h1 class="text-h3 text-tormenta font-weight-bold mb-2">
                Tomo de Magias
            </h1>
            <h2 v-if="prop.length === 0" class="font-weight-light">
                Seu tomo está vazio.
            </h2>
            <v-container class="d-flex flex-wrap justify-center pt-1">
                <Card
                    v-for="magia in prop"
                    :key="magia.id"
                    :prop="magia"
                    :tomo="tomo"
                    @sendMagia="emit('removeTomo', magia)"
                    v-bind="$attrs"
                >
                </Card>
            </v-container>
        </v-responsive>
    </v-container>
</template>
<style scoped>
:deep(.v-card-subtitle) {
    opacity: 1 !important;
}
</style>

<script setup>
import DetalhesMagia from './DetalhesMagia.vue';
import { ref } from 'vue';
const dialog = ref(false);
const { magia } = defineProps(['magia']);
</script>
<template>
    <v-dialog
        v-model="dialog"
        max-width="800px"
        scrollable
        transition="dialog-bottom-transition"
        activator="parent"
        scrim="background"
    >
        <v-card>
            <v-card-title
                class="text-h4 font-weight-bold text-tormentaText text-wrap px-6 pt-4"
                >{{ magia.nome }}</v-card-title
            >
            <v-card-subtitle class="d-flex align-center font-weight-bold px-6">
                {{ magia.tipo }} {{ magia.circulo }} ({{ magia.escola }})
                <span class="ml-2 text-tormentaText text-h6 font-weight-bold"
                    >{{ magia.custo }} PM</span
                >
            </v-card-subtitle>
            <v-card-text>
                <DetalhesMagia :data="magia" />

                <v-divider class="my-3"></v-divider>

                <p class="mt-2 text-pre-wrap">{{ magia.texto }}</p>

                <v-divider class="my-3"></v-divider>

                <p v-for="aprimoramento in magia.aprimoramentos">
                    <span class="text-tormentaText font-weight-bold">{{
                        aprimoramento.match(/.+?:/).toString()
                    }}</span>
                    {{ aprimoramento.match(/(?<=:).+/).toString() }}
                </p>
            </v-card-text>
            <v-card-actions>
                <v-btn color="tormentaText" block @click="dialog = false"
                    >Fechar</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<style scoped>
:deep(.v-card-subtitle) {
    opacity: 1 !important;
}
</style>

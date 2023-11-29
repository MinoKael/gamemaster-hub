<script setup>
import DialogCard from './DialogCard.vue';
import DetalhesMagia from './DetalhesMagia.vue';

const { magia } = defineProps(['magia']);
</script>
<template>
    <v-hover v-slot="{ isHovering, props }">
        <v-card
            class="ma-2 pb-2 d-flex flex-column"
            :class="{ 'on-hover': isHovering }"
            :elevation="isHovering ? 12 : 6"
            max-width="300"
            hover
            v-bind="props"
        >
            <v-card-item class="pb-0">
                <v-card-title class="text-tormentaText text-wrap">{{
                    magia.nome
                }}</v-card-title>
                <v-card-subtitle class="pb-2"
                    >{{ magia.tipo }} {{ magia.circulo }} ({{ magia.escola }})
                    <span class="text-tormentaText font-weight-black"
                        >{{ magia.custo }} PM</span
                    >
                </v-card-subtitle>
            </v-card-item>
            <v-card-text class="pb-1">
                <DetalhesMagia :data="magia" />
            </v-card-text>
            <v-spacer />
            <DialogCard :magia="magia" />
        </v-card>
    </v-hover>
</template>
<style scoped>
:deep(.v-card-subtitle) {
    opacity: 1 !important;
}
</style>

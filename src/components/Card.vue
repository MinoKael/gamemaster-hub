<script setup>
import ModalCard from './ModalCard.vue';
import DetalhesMagia from './DetalhesMagia.vue';
import red from '../assets/t20iconRed.png';
import black from '../assets/t20iconBW.png';
import { useTomoStore } from '../stores/tomo';
import { ref } from 'vue';

const { magia, tomo } = defineProps(['magia', 'tomo']);

const tomoStore = useTomoStore();
</script>
<template>
    <v-hover v-slot="{ isHovering, props }">
        <v-card
            class="ma-2 d-flex flex-column"
            :class="{ 'on-hover': isHovering }"
            :elevation="isHovering ? 12 : 6"
            max-width="300"
            hover
            v-bind="props"
        >
            <v-card-item class="pb-0">
                <v-card-title class="text-tormenta text-wrap">{{
                    magia.nome
                }}</v-card-title>
                <v-card-subtitle class="pb-2"
                    >{{ magia.tipo }} {{ magia.circulo }} ({{ magia.escola }})
                    <span class="text-tormenta font-weight-black"
                        >{{ magia.custo }} PM</span
                    >
                </v-card-subtitle>
            </v-card-item>
            <v-card-text class="pb-1">
                <DetalhesMagia :data="magia" />
            </v-card-text>
            <v-spacer />
            <ModalCard :magia="magia" />
            <v-btn
                max-height="36"
                variant="text"
                class="pl-7"
                aria-label="Adicionar magia ao Tomo"
                block
                @click.stop="tomoStore.addToTomo(magia)"
            >
                <v-img :src="tomoStore.find(magia) ? red : black" width="24" />
            </v-btn>
        </v-card>
    </v-hover>
</template>
<style scoped>
:deep(.v-card-subtitle) {
    opacity: 1 !important;
}
</style>

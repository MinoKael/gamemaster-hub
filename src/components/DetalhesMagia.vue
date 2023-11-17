<script setup>
const { data } = defineProps(['data']);
</script>

<template>
    <span v-if="data.execucao"
        ><strong>Execução: </strong> {{ data.execucao }};&nbsp</span
    >
    <span v-if="data.alcance"
        ><strong>Alcance: </strong> {{ data.alcance }};&nbsp</span
    >
    <span v-if="data.alvo"><strong>Alvo: </strong> {{ data.alvo }};&nbsp</span>
    <span v-if="data.area"><strong>Área: </strong> {{ data.area }};&nbsp</span>
    <span v-if="data.efeito"
        ><strong>Efeito: </strong> {{ data.efeito }};&nbsp</span
    >
    <span v-if="data.duracao"
        ><strong>Duração: </strong> {{ data.duracao }};&nbsp</span
    >
    <span v-if="data.resistencia"
        ><strong>Resistência: </strong> {{ data.resistencia }};&nbsp</span
    >
</template>

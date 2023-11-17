<script setup>
import red from "../assets/t20iconRed.png";
import black from "../assets/t20iconBW.png";

const prop = defineProps(["prop"]);
</script>

<template>
  <v-btn
    max-height="36"
    variant="text"
    class="pl-7"
    aria-label="Adicionar magia ao Tomo"
  >
    <template #prepend>
      <v-img :src="prop.prop ? red : black" width="24"></v-img>
    </template>
  </v-btn>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import DiceBox from './components/DiceBox.vue';
</script>
<template>
    <v-app class="bg-background">
        <Navbar />
        <v-main><DiceBox /> </v-main>
        <Footer />
    </v-app>
</template>

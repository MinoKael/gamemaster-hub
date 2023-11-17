<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>
<template>
    <v-app class="bg-background">
        <Navbar />
        <v-main class="d-flex justify-center">
            <RouterView v-slot="{ Component, route }">
                <Transition name="fade" mode="out-in">
                    <span :key="route.name">
                        <component :is="Component"></component>
                    </span>
                </Transition>
            </RouterView>
        </v-main>
        <Footer />
    </v-app>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>
<template>
    <v-app class="bg-background">
        <Navbar />
        <v-main class="d-flex justify-center">
            <RouterView v-slot="{ Component, route }">
                <Transition name="fade" mode="out-in" appear>
                    <span :key="route.name">
                        <component :is="Component" />
                    </span>
                </Transition>
            </RouterView>
        </v-main>
        <Footer />
    </v-app>
</template>
<style>
.fade-enter-active {
    transition: all 0.2s ease-out;
}

.fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>

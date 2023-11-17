<script setup></script>
<template>
    <div
        class="d-flex justify-space-between"
        color="background"
        flat
        elevation="0"
    >
        <v-hover v-slot="{ isHovering, props }">
            <RouterLink
                to="/dice"
                style="text-decoration: none; color: inherit"
            >
                <v-card
                    :elevation="isHovering ? 16 : 2"
                    v-bind="props"
                    :class="{ 'on-hover': isHovering }"
                    class="ma-2"
                    color="secondary"
                    width="300px"
                    height="200px"
                >
                    Rolagem de Dados
                </v-card>
            </RouterLink>
        </v-hover>
        <v-hover v-slot="{ isHovering, props }">
            <RouterLink
                to="/magias"
                style="text-decoration: none; color: inherit"
            >
                <v-card
                    :elevation="isHovering ? 16 : 2"
                    v-bind="props"
                    :class="{ 'on-hover': isHovering }"
                    class="ma-2"
                    color="secondary"
                    width="300px"
                    height="200px"
                >
                    Magias T20
                </v-card>
            </RouterLink>
        </v-hover>
    </div>
</template>

<script setup>
  import { ref, computed } from 'vue';
import Card from '../components/Card.vue';
import { useDisplay } from 'vuetify';
import Filtros from '../components/Filtros.vue';
import { useFiltrosStore } from '@/stores/filtros';
const filtros = useFiltrosStore();

const { mdAndUp } = useDisplay();

const maxItemsPerPage = ref(30);
const modelPagination = ref(1);
const posts = computed(() => {
    if (maxItemsPerPage.value === 'Tudo') {
        return filtros.filteredJson;
    } else {
        const startIndex =
            (modelPaginationComputed.value - 1) * maxItemsPerPage.value;
        const endIndex = startIndex + maxItemsPerPage.value;

        return filtros.filteredJson.slice(startIndex, endIndex);
    }
});

const paginationComputed = computed(() => {
    if (maxItemsPerPage.value === 'Tudo') return 1;
    return Math.ceil(filtros.filteredJson.length / maxItemsPerPage.value);
});
const modelPaginationComputed = computed({
    get: () =>
        modelPagination.value > paginationComputed.value
            ? paginationComputed.value
            : modelPagination.value,
    set: (val) => (modelPagination.value = val),
});
</script>
<template>
  <!-- MAGIAS CONTAINER -->
  <v-container class="fill-height justify-center">
    <v-responsive
        class="text-center fill-height"
        :width="mdAndUp ? '1000' : ''"
        >
        <!-- BARRA PESQUISA -->
      <v-responsive class="mx-0 pa-1">
        <v-text-field
            bg-color="tormenta"
            hide-details
            label="Magia"
            placeholder="Magia"
            v-model.trim="filtros.filtroPesquisa.nome"
            filled
            dense
            single-line
            clearable
            class="mx-4 custom-placeholer"
            @update:model-value="filtros.filterMagias"
            />

      </v-responsive>
      <v-responsive class="mx-0 pa-1">
        <v-select
            label="Referência"
            :items="filtros.filtroOpcoes.Referência"
            v-model="filtros.filtroPesquisa.referencia"
            multiple
            clearable
            chips
            variant="solo"
            density="comfortable"
            bg-color="tormenta"
            hide-details
            class="mx-4 custom-placeholer"
            @update:model-value="filtros.filterMagias"
            />
      </v-responsive>
      <v-container class="d-flex flex-wrap pt-1 pb-1">
        <Filtros v-if="mdAndUp" :mdAndUp="mdAndUp" />

        <v-expansion-panels v-else class="mx-1 pb-1" color="tormenta">
          <v-expansion-panel title="Filtros">
            <v-expansion-panel-text>
              <Filtros :mdAndUp="mdAndUp" />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>

      <v-btn color="tormenta" class="mx-2" @click="filtros.resetFiltro"
                              >Limpar Filtros</v-btn
                            >
                            <h4 class="pa-0 my-2">
                              {{ filtros.filteredJson.length }} de
                              {{ filtros.jsonMagias.length }} magias encontradas
                            </h4>
        <!-- CARDS CONTAINER -->
        <v-container class="d-flex flex-wrap justify-center pt-1">
          <Card
              v-for="magia in posts"
              :key="magia.id"
              :magia="magia"
              v-bind="$attrs"
              />
        </v-container>
        <v-responsive :width="mdAndUp ? '1000' : ''">
          <v-row no-gutters justify="end" class="my-4">
            <span class="mr-3 d-flex align-center"
                  >Itens por página</span
                >
                <v-select
                    v-model="maxItemsPerPage"
                    :items="[30, 50, 'Tudo']"
                    variant="solo-filled"
                    hide-details
                    style="max-width: fit-content !important"
                    ></v-select>

                <v-pagination
                    style="min-width: 400px !important"
                    v-model="modelPaginationComputed"
                    :length="paginationComputed"
                    :total-visible="3"
                    ></v-pagination>
          </v-row>
        </v-responsive>
    </v-responsive>
  </v-container>
</template>
<style scoped>
:deep(.v-label) {
  color: white !important;
  opacity: 1;
  font-weight: bolder;
}
:deep(.custom-placeholer) {
  font-weight: 100 !important;
}
:deep(.v-field--active) {
  font-weight: 400 !important;
}
</style>

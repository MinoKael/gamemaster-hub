import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useTomoStore = defineStore('tomo', () => {
    const list = ref([]);

    function find(item) {
        return list.value.some((id) => id == item.id);
    }
    function addToTomo(item) {
        list.value.some((id) => id == item.id)
            ? list.value.splice(list.value.indexOf(item.id), 1)
            : list.value.push(item.id);
    }

    return { find, addToTomo };
});

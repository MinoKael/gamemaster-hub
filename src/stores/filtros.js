import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import jsonMagias from '../data/Magias.json';

const base = {
    nome: '',
    tipo: [],
    circulo: [],
    escola: [],
    execucao: [],
    alcance: [],
    alvo: [],
    area: [],
    efeito: [],
    duracao: [],
    resistencia: [],
};

export const useFiltrosStore = defineStore('filtros', () => {
    const filtroPesquisa = reactive({ ...base });
    function resetFiltro() {
        Object.keys(base).forEach((key) => {
            filtroPesquisa[key] = base[key];
        });
        filterMagias();
    }

    const filtroOpcoes = reactive({
        Tipo: ['Arcana', 'Divina', 'Universal'],
        Círculo: [1, 2, 3, 4, 5],
        Escola: [
            'Abjuração',
            'Adivinhação',
            'Convocação',
            'Encantamento',
            'Evocação',
            'Ilusão',
            'Necromancia',
            'Transmutação',
        ],
        Execução: [
            'Livre',
            'Reação',
            'Padrão',
            'Movimento',
            'Completa',
            'Outros',
        ],
        Alcance: [
            'Pessoal',
            'Toque',
            'Curto',
            'Médio',
            'Longo',
            'Ilimitado',
            'Outros',
        ],
        Alvo: ['Criatura', 'Objeto', 'Você', 'Outros'],
        Área: [
            'Cilindro',
            'Cone',
            'Cubo',
            'Esfera',
            'Linha',
            'Quadrado',
            'Outros',
        ],
        Efeito: ['Efeitos'],
        Duração: [
            'Instantânea',
            'Cena',
            'Sustentada',
            'Descarregada',
            'Outros',
        ],
        Resistência: ['Fortitude', 'Reflexos', 'Vontade', 'Outros'],
    });

    const filteredJson = ref(jsonMagias);

    function stringSearch(input, filter) {
        if (!filter || filter.trim() === '') {
            return true;
        }
        return normalizeString(input).includes(normalizeString(filter));
    }
    function normalizeString(string) {
        if (string == null) return '';
        if (Number.isInteger(string)) return string.toString();
        return string
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s/g, '')
            .toLowerCase();
    }
    function filterMagias() {
        filteredJson.value = jsonMagias.filter((magia) => {
            return (
                stringSearch(magia.nome, filtroPesquisa.nome) &&
                applyFilter(
                    filtroPesquisa.alcance,
                    magia.alcance,
                    filtroOpcoes.Alcance
                ) &&
                applyFilter(
                    filtroPesquisa.alvo,
                    magia.alvo,
                    filtroOpcoes.Alvo
                ) &&
                applyFilter(
                    filtroPesquisa.area,
                    magia.area,
                    filtroOpcoes.Área
                ) &&
                applyFilter(filtroPesquisa.circulo, magia.circulo) &&
                applyFilter(
                    filtroPesquisa.duracao,
                    magia.duracao,
                    filtroOpcoes.Duração
                ) &&
                applyFilter(
                    filtroPesquisa.efeito,
                    magia.efeito,
                    filtroOpcoes.Efeito,
                    true
                ) &&
                applyFilter(filtroPesquisa.escola, magia.escola) &&
                applyFilter(
                    filtroPesquisa.execucao,
                    magia.execucao,
                    filtroOpcoes.Execução
                ) &&
                applyFilter(
                    filtroPesquisa.resistencia,
                    magia.resistencia,
                    filtroOpcoes.Resistência
                ) &&
                applyFilter(filtroPesquisa.tipo, magia.tipo)
            );
        });
    }

    function applyFilter(
        filterValues,
        magiaProperty,
        filterOptions,
        isTipoEfeito
    ) {
        if (isTipoEfeito) {
            return (
                filterValues.length === 0 ||
                (filterValues.length === 1 &&
                    filterValues[0] === 'Efeitos' &&
                    magiaProperty !== null)
            );
        }
        return (
            filterValues.length === 0 ||
            filterValues.some((x) =>
                normalizeString(magiaProperty).includes(normalizeString(x))
            ) ||
            (filterValues.includes('Outros') &&
                magiaProperty !== null &&
                !filterOptions.some((x) =>
                    normalizeString(magiaProperty).includes(normalizeString(x))
                ))
        );
    }

    return {
        filterMagias,
        filteredJson,
        jsonMagias,
        resetFiltro,
        normalizeString,
        filtroPesquisa,
        filtroOpcoes,
    };
});

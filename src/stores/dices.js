import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';
const dicesBase = [
    { name: 'd2', icon: 'mdi-dice-2', quantity: 0, keepModifier: '' },
    { name: 'd4', icon: 'mdi-dice-d4', quantity: 0, keepModifier: '' },
    { name: 'd6', icon: 'mdi-dice-d6', quantity: 0, keepModifier: '' },
    { name: 'd8', icon: 'mdi-dice-d8', quantity: 0, keepModifier: '' },
    { name: 'd10', icon: 'mdi-dice-d10', quantity: 0, keepModifier: '' },
    { name: 'd12', icon: 'mdi-dice-d12', quantity: 0, keepModifier: '' },
    { name: 'd20', icon: 'mdi-dice-d20', quantity: 0, keepModifier: '' },
    {
        name: 'd100',
        icon: 'mdi-dice-multiple',
        quantity: 0,
        keepModifier: '',
    },
];
export const useDicesStore = defineStore('dices', () => {
    const dices = reactive([...dicesBase]);
    function resetDices() {
        dices.forEach((_, index) => {
            dices[index].quantity = 0;
            dices[index].keepModifier = '';
        });
        adicionais.value = '';
    }
    const computedDice = computed(() => {
        return dices
            .filter((dice) => dice.quantity > 0)
            .map((dice) => {
                return `${dice.quantity}${dice.name}${dice.keepModifier}`;
            })
            .join('+');
    });
    const adicionais = ref('');
    const computedString = computed(() => {
        let plus =
            computedDice.value.length > 0 &&
            adicionais.value.length > 0 &&
            adicionais.value[0] !== '+' &&
            adicionais.value[0] !== '-'
                ? '+'
                : '';

        return (computedDice.value + plus + adicionais.value).replaceAll(
            ' ',
            ''
        );
    });
    function clickDice(dice, isSubtract = false) {
        isSubtract
            ? dice.quantity == 0
                ? null
                : (dice.quantity -= 1)
            : (dice.quantity += 1);
    }
    function clickKeepModifiers(keepModifier, active) {
        let die = dices.find((d) => d.name === 'd20');
        die.quantity =
            active != null ? (die.quantity > 0 ? die.quantity : 2) : 0;
        die.keepModifier = active != null ? keepModifier : '';
    }

    return {
        dices,
        adicionais,
        computedString,
        resetDices,
        clickDice,
        clickKeepModifiers,
    };
});

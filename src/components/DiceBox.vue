<script setup>
import { reactive, computed, ref } from 'vue';

const dices = ref([
    { name: 'd2', icon: 'mdi-dice-2', quantity: 0 },
    { name: 'd4', icon: 'mdi-dice-d4', quantity: 0 },
    { name: 'd6', icon: 'mdi-dice-d6', quantity: 0 },
    { name: 'd8', icon: 'mdi-dice-d8', quantity: 0 },
    { name: 'd10', icon: 'mdi-dice-d10', quantity: 0 },
    { name: 'd12', icon: 'mdi-dice-d12', quantity: 0 },
    { name: 'd20', icon: 'mdi-dice-d20', quantity: 0 },
    { name: 'd100', icon: 'mdi-dice-multiple', quantity: 0 },
]);

const rules = {
    validate: (
        value // TODO: Consertar a validacao para impedir exemplos como esse 1d4+1d
    ) =>
        !/^d[+-]|^[+-]d|^[+-]{2,}|^\d{5,}d/g.test(value) ||
        'Fórmula de dados inválida. Utilize o formato "NdL", onde N é o número de dados e L é o número de lados.',
    required: (value) => !!value || 'Campo Obrigatório!',
};

const computedDice = computed(() => {
    return dices.value
        .filter((dice) => dice.quantity > 0)
        .map((dice) => `${dice.quantity}${dice.name}`)
        .join('+');
});

const computedString = computed(() => {
    const modelFormatted =
        adicionais.value[0] == '+' ||
        adicionais.value[0] == '-' ||
        adicionais.value.length == 0
            ? adicionais.value
            : '+' + adicionais.value;
    return (computedDice.value + modelFormatted).replaceAll(' ', '');
});

const results = reactive([]);
const adicionais = ref('');
const rollForm = ref(null);
const resultsComputed = computed(() => results.reverse());

function clickDice(dice, isSubtract = false) {
    isSubtract
        ? dice.quantity == 0
            ? null
            : (dice.quantity -= 1)
        : (dice.quantity += 1);
}

async function processRoll() {
    const isValid = await rollForm.value.validate();
    if (isValid.valid) {
        const objResult = evaluateExpression(computedString.value);
        results.push(objResult);
    }
}
function rollDice(formula) {
    const [rolls, sides] = formula.split('d').map(Number);
    if (isNaN(rolls) || isNaN(sides) || rolls <= 0 || sides <= 0) {
        throw new Error(
            'Fórmula de dados inválida. Utilize o formato "NdL", onde N é o número de dados e L é o número de lados.'
        );
    }
    let result = [];
    for (let i = 0; i < rolls; i++) {
        result.push(Math.floor(Math.random() * sides) + 1);
    }
    return result;
}

function evaluateExpression(expression) {
    if (/d[+-]\b|[+-]d\b|[+-]{2,}|\d{4,}d/g.test(expression))
        throw new Error(
            'Fórmula de dados inválida. Utilize o formato "NdL", onde N é o número de dados e L é o número de lados.'
        );
    const terms = expression.match(/[+-]|\d+d\d+|\d+/g);
    const termsEvaluated = terms.map((x) => {
        if (x.includes('d')) return rollDice(x);
        else if (x === '+' || x === '-') return x;
        else return parseInt(x);
    });
    console.log(termsEvaluated);
    return {
        formula: `[ ${terms.join(' ')} ]`,
        rolagem: `[ ${termsEvaluated.join(' ')} ]`,
        total: termsEvaluated.reduce((acc, val, index) => {
            if (typeof val === 'number') {
                return index === 0 || termsEvaluated[index - 1] === '+'
                    ? acc + parseInt(val)
                    : acc - parseInt(val);
            } else if (typeof val === 'object') {
                return (
                    acc +
                    val.reduce((acc, value) => {
                        return acc + value;
                    }, 0)
                );
            }
            return acc;
        }, 0),
    };
}
</script>
<template>
    <v-card
        class="text-center d-flex justify-center"
        height="100%"
        :elevation="0"
        variant="text"
        max-width="730px"
    >
        <v-col>
            <v-card
                class="my-4 d-flex flex-column-reverse overflow-y-auto"
                max-height="180"
                height="200"
            >
                <div
                    class="pa-1 text-h6 font-weight-bold"
                    height="fit-content"
                    v-for="result in resultsComputed"
                    :key="result"
                >
                    <div>
                        {{ `Fórmula: ${result.formula}` }}
                    </div>
                    <div>
                        {{ `Rolagem: ${result.rolagem}` }}
                    </div>
                    <div>
                        {{ `Total: ${result.total}` }}
                    </div>
                    <v-divider :thickness="4" />
                </div>
            </v-card>

            <v-row no-gutters class="mb-3" justify="center">
                <v-btn
                    v-for="dice in dices"
                    size="80"
                    rounded="circle"
                    :ripple="false"
                    variant="outlined"
                    class="d-flex align-center justify-center mx-1"
                    @click="clickDice(dice)"
                    @click.right.prevent="clickDice(dice, true)"
                    @click.ctrl="clickDice(dice, true)"
                >
                    <v-badge
                        v-if="dice.quantity"
                        floating
                        :content="dice.quantity"
                        color="primary"
                    >
                        <v-icon :icon="dice.icon" size="50" />
                    </v-badge>
                    <v-icon v-else :icon="dice.icon" size="50" />
                </v-btn>
            </v-row>
            <v-form validate-on="submit" ref="rollForm">
                <v-text-field
                    v-model:model-value="computedString"
                    variant="outlined"
                    readonly
                    placeholder="Fórmula"
                    class="mb-2"
                    :rules="[rules.required, rules.validate]"
                />
                <!-- v-model:model-value="adicionais" -->
                <v-text-field
                    :value="adicionais"
                    @input="
                        (event) =>
                            (adicionais = event.target.value.replaceAll(
                                /[^0-9+\-d]/g,
                                ''
                            ))
                    "
                    variant="outlined"
                    label="Adicionais"
                    placeholder="+12..."
                    clearable
                    @click:clear="adicionais = ''"
                />
                <v-btn block @click="processRoll">Rolar</v-btn>
            </v-form>
        </v-col>
    </v-card>
</template>

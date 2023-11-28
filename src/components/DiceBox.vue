<script setup>
import { reactive, computed, ref, watch } from 'vue';
import { useDisplay } from 'vuetify';
import { v4 as uuidv4 } from 'uuid';
import { useDicesStore } from '../stores/dices';
const diceStore = useDicesStore();

const results = reactive([]);
const rollForm = ref(null);
const active = ref(null);
const resultsComputed = computed(() => results.toReversed());
const { mdAndUp } = useDisplay();
const regex = {
    maxRoll: /\d{4,}d/g,
    validate: /\d?d[+-]?\b|[+-]d\d+?\b|[+-]{2,}\b/g,
    terms: /\d+d\d+(k[hl])?|[+-]|\d+/g,
    replace: /[^0-9+\-d]/g,
};
const rules = {
    maxRoll: (value) =>
        !regex.maxRoll.test(value) ||
        'O número máximo de dados é 999. Por favor, insira um número menor.',
    validate: (value) =>
        !regex.validate.test(value) ||
        'Fórmula de dados inválida. Utilize o formato "NdL", onde N é o número de dados e L é o número de lados.',
    required: (value) => !!value || 'Campo Obrigatório!',
};

function removeLog(id) {
    results.splice(results.map((x) => x.id).indexOf(id), 1);
}
function reset() {
    diceStore.resetDices();
    active.value = null;
}
watch(diceStore.dices, (newVal) => {
    if (newVal.find((d) => d.name === 'd20').quantity == 0) active.value = null;
});
async function validateRoll() {
    const { valid } = await rollForm.value.validate();
    if (valid == true) {
        const objResult = evaluateExpression(diceStore.computedString);
        results.push(objResult);
    }
}
function rollDice(formula) {
    const [rolls, sides] = formula.split('d').map((x) => x.split(/kh|kl/g)[0]);
    let result = [];
    for (let i = 0; i < rolls; i++) {
        result.push(Math.floor(Math.random() * parseInt(sides)) + 1);
    }
    return result.sort((a, b) => {
        switch (active.value) {
            case 1:
                return a - b;
            case 0:
            default:
                return b - a;
        }
    });
}

function evaluateExpression(expression) {
    const terms = expression.match(regex.terms);
    const termsEvaluated = terms.map((x) => {
        if (x.includes('d')) return rollDice(x);
        else if (x === '+' || x === '-') return x;
        else return parseInt(x);
    });
    return {
        id: uuidv4(),
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
                    (terms[index].includes('k')
                        ? val[0]
                        : val.reduce((internalAcc, internalValue) => {
                              return internalAcc + internalValue;
                          }, 0))
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
        max-width="1000px"
    >
        <v-col align="center">
            <v-card
                class="my-4 d-flex flex-column-reverse overflow-y-auto"
                :max-height="mdAndUp ? 270 : 180"
                :height="mdAndUp ? 280 : 200"
            >
                <div
                    class="pa-0 font-weight-bold text-subtitle-1"
                    height="fit-content"
                    v-for="result in resultsComputed"
                    :key="result.id"
                >
                    <div>
                        <code>
                            {{ `Fórmula: ${result.formula}` }}
                        </code>
                    </div>
                    <div>
                        <code>
                            {{ `Rolagem: ${result.rolagem}` }}
                        </code>
                    </div>
                    <div>
                        <code>
                            {{ `Total: ${result.total}` }}
                        </code>
                    </div>
                    <v-divider :thickness="4" />
                </div>
            </v-card>

            <v-row no-gutters class="mb-3" justify="center">
                <v-btn
                    v-for="dice in diceStore.dices"
                    :size="mdAndUp ? 100 : 85"
                    rounded="circle"
                    :ripple="false"
                    variant="outlined"
                    class="d-flex align-center justify-center ma-1"
                    @click="diceStore.clickDice(dice)"
                    @click.right.prevent="diceStore.clickDice(dice, true)"
                    @click.ctrl="diceStore.clickDice(dice, true)"
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
            <v-form ref="rollForm">
                <v-text-field
                    v-model:model-value="diceStore.computedString"
                    variant="outlined"
                    readonly
                    placeholder="Fórmula"
                    class="mb-2"
                    :rules="[
                        rules.required(diceStore.computedString),
                        rules.validate(diceStore.computedString),
                        rules.maxRoll(diceStore.computedString),
                    ]"
                >
                    <template #append-inner>
                        <v-btn-toggle v-model:model-value="active" divided>
                            <v-btn
                                variant="outlined"
                                icon
                                :size="mdAndUp ? 'default' : 'small'"
                                @click="
                                    diceStore.clickKeepModifiers('kh', active)
                                "
                            >
                                KH
                            </v-btn>
                            <v-btn
                                variant="outlined"
                                icon
                                :size="mdAndUp ? 'default' : 'small'"
                                @click="
                                    diceStore.clickKeepModifiers('kl', active)
                                "
                            >
                                KL
                            </v-btn>
                        </v-btn-toggle>
                        <v-btn
                            icon="mdi-reload"
                            variant="text"
                            :size="mdAndUp ? 'default' : 'small'"
                            @click="reset"
                        />
                    </template>
                </v-text-field>

                <v-text-field
                    :value="diceStore.adicionais"
                    @input="
                        (event) =>
                            (diceStore.adicionais =
                                event.target.value.replaceAll(
                                    regex.replace,
                                    ''
                                ))
                    "
                    variant="outlined"
                    label="Adicionais"
                    placeholder="+12..."
                    :rules="[
                        rules.validate(diceStore.adicionais),
                        rules.maxRoll(diceStore.adicionais),
                    ]"
                    clearable
                    @click:clear="diceStore.adicionais = null"
                />
                <v-btn block @click="validateRoll">Rolar</v-btn>
            </v-form>
        </v-col>
    </v-card>
</template>

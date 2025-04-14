<script setup lang="ts">
	import { ref, watch, onMounted } from 'vue'
	import { useCurrencyStore } from '@/stores/currency'
	import { useRatesStore } from '@/stores/rates'
	import { storeToRefs } from 'pinia'
	import CurrencyField from '@/components/fields/CurrencyField.vue'
	import { convertAmount, getRateCode } from '@/utils/currency'
	import { CurrencyCode, CURRENCIES } from '@/constants/currency'
	import { RotateCcw } from 'lucide-vue-next'
	import History from '@/components/History.vue'
	import { useHistoryStore } from '@/stores/history'
	import { useDebounceFn } from '@vueuse/core'
	import AnimatedText from '@/components/AnimatedText.vue'
	import { validateAmount } from '@/utils/currency'

	type FieldCode = 'from' | 'to'

	const { mainCurrency } = storeToRefs(useCurrencyStore())
	const ratesStore = useRatesStore()

	const historyStore = useHistoryStore()

	const currencyFrom = ref<CurrencyCode>(mainCurrency.value || 'RUB')
	const currencyTo = ref('USD')
	const amountFrom = ref('')
	const amountTo = ref('')

	const errorFrom = ref<string | null>(null)
	const errorTo = ref<string | null>(null)

	const rates = ref<Record<string, number>>({})

	const activeInput = ref<FieldCode>('from')

	const isHistoryPending = ref(false)

	const buildDotsFrame = (base: string, step: number) => {
		return base + '.'.repeat((step % 3) + 1)
	}

	function update() {
		if (!validateInputs()) return

		const isFrom = activeInput.value === 'from'
		const rate = rates.value[getRateCode(currencyFrom.value, currencyTo.value)]
		const updateField = isFrom ? amountTo : amountFrom
		const valueField = isFrom ? amountFrom : amountTo

		updateField.value =
			currencyFrom.value === currencyTo.value
				? valueField.value
				: convertAmount(valueField.value, rate, !isFrom)
	}

	const tryAddToHistory = useDebounceFn(() => {
		isHistoryPending.value = false

		if (!validateInputs()) return

		const valueFrom = parseFloat(amountFrom.value)
		const valueTo = parseFloat(amountTo.value)

		const record = {
			currencyFrom: currencyFrom.value,
			currencyTo: currencyTo.value,
			amountFrom: valueFrom,
			amountTo: valueTo,
		}

		historyStore.addHistoryData(record)
	}, 5000)

	function validateInputs() {
		if (activeInput.value === 'from') {
			errorFrom.value = validateAmount(amountFrom.value)
			return !errorFrom.value
		} else {
			errorTo.value = validateAmount(amountTo.value)
			return !errorTo.value
		}
	}

	watch([amountFrom], () => {
		if (activeInput.value === 'from') update()
	})

	watch([amountTo], () => {
		if (activeInput.value === 'to') update()
	})

	watch([currencyFrom, currencyTo], () => {
		update()
	})

	watch([amountFrom, amountTo, currencyFrom, currencyTo], () => {
		if (!validateInputs()) return
		isHistoryPending.value = true
		tryAddToHistory()
	})

	onMounted(async () => {
		rates.value = await ratesStore.getRates()
	})

	function reverseCurrency() {
		const cFrom = currencyFrom.value

		currencyFrom.value = currencyTo.value
		currencyTo.value = cFrom
	}

	function onFocus(fieldCode: FieldCode) {
		activeInput.value = fieldCode
	}
</script>

<template>
	<h2 class="text-2xl font-bold mb-4">Конвертация</h2>
	<div class="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4">
		<CurrencyField
			title="Из"
			v-model:currentCurrency="currencyFrom"
			v-model:currentValue="amountFrom"
			:currencies="CURRENCIES"
			:error-message="errorFrom"
			:on-focus="() => onFocus('from')"
			:is-focused="activeInput === 'from'"
		/>

		<div class="flex justify-center items-center">
			<button
				@click="reverseCurrency"
				class="w-10 h-10 flex items-center justify-center rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
				title="Поменять валюты местами"
			>
				<RotateCcw class="w-5 h-5" />
			</button>
		</div>

		<CurrencyField
			title="В"
			v-model:currentCurrency="currencyTo"
			v-model:currentValue="amountTo"
			:currencies="CURRENCIES"
			:error-message="errorTo"
			:on-focus="() => onFocus('to')"
			:is-focused="activeInput === 'to'"
		/>
	</div>
	<h2 class="text-2xl font-bold mb-4 mt-4">
		<AnimatedText
			:text="'История'"
			:animated="isHistoryPending"
			:step-count="3"
			:frame-builder="buildDotsFrame"
		/>
	</h2>
	<History />
</template>

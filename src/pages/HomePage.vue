<script setup lang="ts">
	import { ref, onMounted, watch } from 'vue'
	import { useCurrencyStore } from '@/stores/currency'
	import { storeToRefs } from 'pinia'
	import { useRatesStore } from '@/stores/rates'
	import { CURRENCIES } from '@/constants/currency'
	import { getRateCode } from '@/utils/currency'

	const currencyStore = useCurrencyStore()
	const { mainCurrency } = storeToRefs(currencyStore)

	const ratesStore = useRatesStore()
	const rates = ref<Record<string, number>>({})

	async function loadRates() {
		const _rates = await ratesStore.getRates()
		rates.value = CURRENCIES.filter((c) => c !== mainCurrency.value).reduce((prev, curr) => {
			return {
				...prev,
				[curr]: _rates[getRateCode(curr, mainCurrency.value)].toFixed(2),
			}
		}, {})
	}

	onMounted(loadRates)
	watch(mainCurrency, loadRates)
</script>

<template>
	<div>
		<h2 class="text-2xl font-bold mb-4">Курсы валют относительно {{ mainCurrency }}</h2>
		<ul class="space-y-3">
			<li
				v-for="(rate, code) in rates"
				:key="code"
				class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm"
			>
				<strong>1 {{ code }}</strong> = {{ rate }} {{ mainCurrency }}
			</li>
		</ul>
	</div>
</template>

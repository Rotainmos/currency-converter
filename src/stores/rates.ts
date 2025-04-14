import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchCurrencyRates, CurrencyRates } from '../api/currencyApi'

export const useRatesStore = defineStore('rates', () => {
	const cache = ref<CurrencyRates>({})
	const lastUpdated = ref<number>()

	async function getRates() {
		if (Object.keys(cache.value)?.length) return cache.value

		const rates = await fetchCurrencyRates()
		cache.value = rates
		lastUpdated.value = Date.now()
		return rates
	}

	return { cache, lastUpdated, getRates }
})

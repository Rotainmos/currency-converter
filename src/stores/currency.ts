import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { CurrencyCode } from '@/constants/currency'

export const useCurrencyStore = defineStore('currency', () => {
	const mainCurrency = useLocalStorage<CurrencyCode>('mainCurrency', 'RUB')

	function setMainCurrency(code: CurrencyCode) {
		mainCurrency.value = code
	}

	return {
		mainCurrency,
		setMainCurrency,
	}
})

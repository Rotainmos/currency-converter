import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { CurrencyCode } from '@/constants/currency'

export interface HistoryRecord {
	currencyFrom: CurrencyCode
	currencyTo: CurrencyCode
	amountFrom: number
	amountTo: number
}

export const useHistoryStore = defineStore('history', () => {
	const history = useLocalStorage<HistoryRecord[]>('history', [])

	function addHistoryData(record: HistoryRecord) {
		const updated = [record, ...history.value]
		history.value = updated.slice(0, 5)
	}

	function clearHistory() {
		history.value = []
	}

	return {
		history,
		addHistoryData,
		clearHistory,
	}
})

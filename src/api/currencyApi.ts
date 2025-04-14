import { CURRENCIES } from '@/constants/currency'
import { checkRateSupport } from '@/utils/currency'

export interface CurrencyRates {
	[key: string]: number
}

export async function fetchCurrencyRates(): Promise<CurrencyRates> {
	const response = await fetch('https://status.neuralgeneration.com/api/currency')
	const data = await response.json()

	const result: CurrencyRates = {}

	const responseRates = Object.keys(data).filter((key) => checkRateSupport(key, CURRENCIES))

	for (const rate of responseRates) {
		result[rate.toUpperCase()] = parseFloat(data[rate])
	}

	return result
}

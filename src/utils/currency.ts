import { CurrencyCode } from '@/constants/currency'

export function validateAmount(value: string): string | null {
	if (!value.trim()) return 'Поле не может быть пустым'

	if (!/^\d*\.?\d*$/.test(value)) return 'Введите только число'

	const n = parseFloat(value)
	if (isNaN(n)) return 'Введите число'
	if (n < 0) return 'Число не может быть отрицательным'

	return null
}

export function convertAmount(amount: string, rate: number, invert?: boolean): string {
	const value = parseFloat(amount)
	if (isNaN(value) || !rate) return ''
	const result = invert ? value / rate : value * rate
	return result.toFixed(2)
}

export function checkRateSupport(rateKey: string, availableCurrencies: CurrencyCode[]) {
	if (!rateKey || !availableCurrencies?.length) return false

	const currenciesString = `(${availableCurrencies.join('|')})`
	const regex = new RegExp(`${currenciesString}-${currenciesString}`, 'i')
	return regex.test(rateKey)
}

export function getRateCode(currencyFrom: CurrencyCode, currencyTo: CurrencyCode) {
	return `${currencyFrom}-${currencyTo}`
}

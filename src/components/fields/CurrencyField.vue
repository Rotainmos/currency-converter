<script setup lang="ts">
	import { computed } from 'vue'
	import DropdownField from '@/components/fields/baseFields/DropdownField.vue'
	import TextInputField from '@/components/fields/baseFields/TextInputField.vue'

	export interface CurrencyFieldProps {
		title: string
		currencies: string[]
		currentCurrency?: string
		currentValue?: string
		errorMessage?: string | null
		isFocused?: boolean
		onFocus?: () => void
	}

	const props = defineProps<CurrencyFieldProps>()

	const emit = defineEmits<{
		(e: 'update:currentCurrency', value: string): void
		(e: 'update:currentValue', value: string): void
	}>()

	const modelCurrency = computed({
		get: () => props.currentCurrency ?? '',
		set: (val) => emit('update:currentCurrency', val),
	})

	const modelValue = computed({
		get: () => props.currentValue ?? '',
		set: (val) => emit('update:currentValue', val),
	})

	function focusHandler() {
		props.onFocus?.()
	}
</script>

<template>
	<div
		class="rounded-2xl p-4 transition-opacity duration-200 flex flex-col gap-2"
		:class="
			props.isFocused
				? 'bg-gray-200 dark:bg-gray-800 opacity-100'
				: 'bg-gray-100 dark:bg-gray-800 opacity-70 dark:opacity-50 '
		"
	>
		<div class="flex items-center gap-2">
			<label class="w-6 text-center font-medium text-sm">
				{{ props.title }}
			</label>

			<TextInputField
				v-model:current-value="modelValue"
				:is-invalid="!!props.errorMessage"
				class="grow"
				:on-focus="focusHandler"
			/>
		</div>

		<p v-if="props.errorMessage" class="text-sm text-red-500 mb-2">
			{{ props.errorMessage }}
		</p>

		<DropdownField v-model:current-value="modelCurrency" :values="props.currencies" />
	</div>
</template>

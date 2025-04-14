<script setup lang="ts">
	import { computed } from 'vue'

	export interface TextInputFieldProps {
		currentValue?: string
		isInvalid?: boolean
		onFocus?: () => void
	}

	const emit = defineEmits<{
		(e: 'update:currentValue', value: string): void
	}>()

	const props = defineProps<TextInputFieldProps>()

	const model = computed({
		get: () => props.currentValue || '',
		set: (value: string) => emit('update:currentValue', value),
	})

	function focusHandler() {
		props.onFocus?.()
	}
</script>

<template>
	<input
		@focus="focusHandler"
		id="from"
		v-model="model"
		type="text"
		class="w-full min-w-0 px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
		:class="{ 'border-red-500': isInvalid }"
	/>
</template>

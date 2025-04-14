<script setup lang="ts">
	import { computed } from 'vue'

	export interface DropdownFieldProps {
		values: string[]
		currentValue?: string
	}

	const emit = defineEmits<{
		(e: 'update:currentValue', value: string): void
	}>()

	const props = defineProps<DropdownFieldProps>()

	const model = computed({
		get: () => props.currentValue ?? '',
		set: (val: string) => emit('update:currentValue', val),
	})
</script>

<template>
	<select v-model="model" class="select">
		<option v-for="v in props.values" :key="v" :value="v">{{ v }}</option>
	</select>
</template>

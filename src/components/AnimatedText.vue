<script setup lang="ts">
	import { ref, watch, onUnmounted } from 'vue'

	const props = defineProps<{
		text: string
		animated: boolean
		stepCount: number
		frameBuilder: (text: string, step: number) => string
	}>()

	const current = ref(props.text)
	let interval: ReturnType<typeof setInterval> | null = null

	watch(
		() => props.animated,
		(active) => {
			if (active) {
				let step = 0
				interval = setInterval(() => {
					current.value = props.frameBuilder(props.text, step)
					step = (step + 1) % props.stepCount
				}, 400)
			} else {
				current.value = props.text
				if (interval) {
					clearInterval(interval)
					interval = null
				}
			}
		},
		{ immediate: true }
	)

	onUnmounted(() => {
		if (interval) clearInterval(interval)
	})
</script>

<template>
	<span>{{ current }}</span>
</template>

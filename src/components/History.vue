<script setup lang="ts">
	import { useHistoryStore } from '@/stores/history'
	import { storeToRefs } from 'pinia'
	import { Trash2 } from 'lucide-vue-next'
	const historyStore = useHistoryStore()
	const { history } = storeToRefs(historyStore)

	function clear() {
		historyStore.clearHistory()
	}
</script>

<template>
	<div class="flex flex-col gap-4">
		<div class="flex items-center justify-between" v-if="history.length">
			<h3 class="font-semibold text-lg">Последние конвертации</h3>

			<div class="flex justify-center items-center">
				<button
					@click="clear"
					class="w-10 h-10 flex items-center justify-center rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
					title="Очистить историю"
				>
					<Trash2 class="w-5 h-5" />
				</button>
			</div>
		</div>

		<ul v-if="history.length" class="space-y-3">
			<li
				v-for="(record, index) in history"
				:key="index"
				class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm"
			>
				<strong>{{ record.amountFrom }}</strong> <strong>{{ record.currencyFrom }}</strong> =
				{{ record.amountTo }} {{ record.currencyTo }}
			</li>
		</ul>

		<p v-else class="text-gray-500 dark:text-gray-400 italic">История пуста…</p>
	</div>
</template>

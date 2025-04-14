<script setup lang="ts">
	import { ref } from 'vue'
	import { useCurrencyStore } from '@/stores/currency'
	import { storeToRefs } from 'pinia'
	import { useDark, useToggle } from '@vueuse/core'
	import { useRoute } from 'vue-router'
	import { CURRENCIES } from '@/constants/currency'
	import { Sun, Moon } from 'lucide-vue-next'
	import { computed } from 'vue'
	import { appRoutes } from '@/router/routes'
	const route = useRoute()
	const menuOpen = ref(false)

	const store = useCurrencyStore()
	const { mainCurrency } = storeToRefs(store)

	const selected = ref(mainCurrency.value)

	function setMainCurrency() {
		store.setMainCurrency(selected.value)
	}

	const isDark = useDark({
		selector: 'html',
		attribute: 'class',
		valueDark: 'dark',
		valueLight: '',
		storageKey: 'vueuse-color-scheme',
	})
	const toggleDark = useToggle(isDark)

	function handleThemeToggle() {
		toggleDark()
	}

	const menuItems = computed(() => appRoutes.filter((r) => r.showInMenu !== false))
</script>

<template>
	<header class="bg-white text-black dark:bg-gray-800 dark:text-white px-6 py-4">
		<div class="flex flex-col md:flex-row md:items-center md:justify-between">
			<div class="flex items-center justify-between gap-4">
				<h1 class="text-xl font-bold">Currency Converter</h1>

				<div class="flex items-center gap-2 md:hidden">
					<button
						@click="handleThemeToggle"
						class="w-9 h-9 flex items-center justify-center rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
						title="Переключить тему"
					>
						<component :is="isDark ? Moon : Sun" class="w-5 h-5" />
					</button>

					<button @click="menuOpen = !menuOpen" aria-label="Toggle Menu">
						<svg
							v-if="!menuOpen"
							class="w-6 h-6"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							viewBox="0 0 24 24"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
						<svg
							v-else
							class="w-6 h-6"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							viewBox="0 0 24 24"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
			</div>

			<nav
				:class="[
					'mt-4 flex-col md:mt-0 md:flex-row md:flex gap-4',
					menuOpen ? 'flex' : 'hidden md:flex',
					menuOpen ? 'items-start' : 'items-center',
				]"
			>
				<RouterLink
					v-for="item in menuItems"
					:key="item.path"
					:to="item.path"
					class="w-full md:w-auto relative pb-1 hover:underline"
					:class="{ 'font-bold border-b-2 border-blue-500': route.path === item.path }"
				>
					{{ item.label }}
				</RouterLink>

				<button
					@click="handleThemeToggle"
					class="hidden md:flex w-10 h-10 items-center justify-center rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
					title="Переключить тему"
				>
					<component :is="isDark ? Moon : Sun" class="w-5 h-5" />
				</button>

				<select
					v-model="selected"
					@change="setMainCurrency"
					class="bg-white text-black dark:bg-gray-700 dark:text-white px-2 py-1 rounded w-full md:w-auto"
				>
					<option v-for="currency in CURRENCIES" :key="currency" :value="currency">
						{{ currency }}
					</option>
				</select>
			</nav>
		</div>
	</header>
</template>

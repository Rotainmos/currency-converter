import HomePage from '@/pages/HomePage.vue'
import ConvertPage from '@/pages/ConvertPage.vue'
import type { RouteRecordRaw } from 'vue-router'

export interface AppRoute {
	path: string
	name: string
	label: string
	component: RouteRecordRaw['component']
	showInMenu?: boolean
}

export const appRoutes: AppRoute[] = [
	{
		path: '/',
		name: 'home',
		label: 'Главная',
		component: HomePage,
		showInMenu: true,
	},
	{
		path: '/convert',
		name: 'convert',
		label: 'Конвертация',
		component: ConvertPage,
		showInMenu: true,
	},
]

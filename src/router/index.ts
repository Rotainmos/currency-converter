import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { appRoutes } from './routes'

const base = import.meta.env.MODE === 'development' ? '/' : '/currency-converter/'

export const router = createRouter({
	history: createWebHistory(base),
	routes: appRoutes.map(({ path, component, name }) => ({
		path,
		component,
		name,
	})) as RouteRecordRaw[],
})

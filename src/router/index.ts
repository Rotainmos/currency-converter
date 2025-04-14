import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { appRoutes } from './routes'

export const router = createRouter({
	history: createWebHistory(),
	routes: appRoutes.map(({ path, component, name }) => ({
		path,
		component,
		name,
	})) as RouteRecordRaw[],
})

import {createRouter, createWebHistory} from 'vue-router'
import routes from './routes'
import {beforeEach} from './guards'

const router = createRouter({
	routes,
	history: createWebHistory(),
	scrollBehavior(to) {
		if (to.hash) {
			return {
				selector: to.hash,
				behavior: 'smooth',
			}
		}
		return {x: 0, y: 0}
	},
})

router.beforeEach(beforeEach)

export default router

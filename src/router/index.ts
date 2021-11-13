import { createRouter, createWebHistory } from 'vue-router';
import { beforeEach, afterEach } from './guards';
import routes from './routes';

const router = createRouter({
	routes,
	history: createWebHistory(),
	scrollBehavior(to) {
		if (to.hash) {
			return {
				selector: to.hash,
				behavior: 'smooth',
			};
		}
		return { x: 0, y: 0 };
	},
});

router.beforeEach(beforeEach);
router.afterEach(afterEach);

export default router;

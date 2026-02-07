import { RouteLocationNormalized } from 'vue-router';
import { changeGuard } from './guards';
import Changes from '../views/Changes.vue';
import Oracle from '../components/Oracle.vue';
import About from '../views/About.vue';
import Config from '../views/Config.vue';
import Journal from '../views/Journal.vue';
import Gratitude from '../views/Gratitude.vue';
import Change from '../views/Change.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
	{
		path: '/',
		redirect: '/journal',
	},
	{
		path: '/oracle',
		name: 'oracle',
		component: Oracle,
		props: (route: RouteLocationNormalized): { fresh: boolean } => ({
			fresh: route.params.reset === 'true',
		}),
	},
	{
		path: '/changes',
		name: 'changes',
		component: Changes,
	},
	{
		path: '/about',
		name: 'about',
		component: About,
	},
	{
		path: '/config',
		name: 'config',
		component: Config,
	},
	{
		path: '/journal',
		name: 'journal',
		component: Journal,
	},
	{
		path: '/gratitude',
		name: 'gratitude',
		component: Gratitude,
	},
	{
		path: '/changes/:id',
		name: 'change',
		component: Change,
		props: true,
		beforeEnter: changeGuard,
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'not-found',
		component: NotFound,
	},
];

export default routes;

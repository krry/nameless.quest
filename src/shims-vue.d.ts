/**
 * Shims .Vue files
 * onto the Typescript plane
 */

declare module '*.vue' {
	import { DefineComponent } from 'vue';
	const component: DefineComponent;
	export default component;
}

// an alternate shim

// declare module "*.vue" {
//   import { defineComponent } from "vue";
//   const Component: ReturnType<typeof defineComponent>;
//   export default Component;
// }

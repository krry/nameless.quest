import sanityClient from '@sanity/client'

const proj =
	typeof import.meta.env.VITE_SANITY_PROJECT_ID === 'string'
		? import.meta.env.VITE_SANITY_PROJECT_ID
		: undefined
export const client = sanityClient({
	projectId: proj,
	dataset: 'production',
	token: import.meta.env.VITE_SANITY_RW_KEY, // or leave blank to be anonymous user
	useCdn: true, // `false` if you want to ensure fresh data
})

export const useSanity = () => {
	function fetch(query, params) {
		client.fetch(query, params).then((nodes) => {
			nodes.forEach((node) => {
				console.log('node fetched', node)
			})
		})
	}

	return {
		fetch,
	}
}

/** FOR App.vue */
// import {useSanityClient} from 'vue-sanity'

// const projectId = import.meta.env.VITE_SANITY_PROJECT_ID

// function stringForSure(str: unknown): string {
//   if (typeof str === 'string') return str
//   else return ''
// }
// setup() {
// useSanityClient({
//   projectId: stringForSure(projectId),
//   dataset: 'production',
//   useCdn: process.env.NODE_ENV === 'production',
// })
// }
/** END App.vue */

/** FOR hexagrams.ts */
// import {useSanityFetcher} from 'vue-sanity'

// const {data: hexagrams} = useSanityFetcher<Hexagram[]>(
//   () => `*[_type=="hexagram"]`, // query
//   [defHex], // initialValue
// )

// console.log('hexagrams fetched', hexagrams)
/** END hexagrams.ts */

// import sanityClient from '@sanity/client'
// import sanityImage from '@sanity/image-url'

// const options = {
// Find your project ID and dataset in `sanity.json` in your studio project
// dataset: 'production',
// projectId: process.env.SANITY_PROJECT_ID,
// useCdn: process.env.NODE_ENV === 'production',
// useCdn == true gives fast, cheap responses using a globally distributed cache.
// Set this to false if your application require the freshest possible
// data always (potentially slightly slower and a bit more expensive).
// }

// const client = sanityClient(options)

// export const imageBuilder = sanityImage(client)

// export const previewClient = sanityClient({
//   ...options,
//   useCdn: false,
//   token: process.env.SANITY_API_TOKEN,
// })

// export default client

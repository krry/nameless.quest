import {App, ref, Ref} from 'vue'

type Storeable = string | number | boolean
type StoreItem = Ref<Storeable> | undefined

const store = new Map()

export default {
  install: (app: App): void => {
    app.config.globalProperties.$set = (nym: string, goo: Storeable): StoreItem => {
      if (typeof nym !== 'string') return
      if (store.has(nym)) console.warn('overwriting old value', store.get(nym))
      store.set(nym, goo)
      return ref(store.get(nym))
    }

    app.config.globalProperties.$get = (nym: string): StoreItem => {
      if (typeof nym !== 'string') return
      if (store.has(nym)) return ref(store.get(nym))
      else console.error('no key matching', nym)
    }

    app.config.globalProperties.$toggle = (nym: string): StoreItem => {
      if (typeof nym !== 'string') return
      const val = store.get(nym)
      if (store.has(nym) && typeof val === 'boolean') {
        store.set(nym, !val)
        return ref(store.get(nym))
      } else {
        console.error(nym, 'not toggleable')
      }
    }
  },
}

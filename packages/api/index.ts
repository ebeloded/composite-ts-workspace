export const api = {
  namespace: {
    fun() {
      return 0
    },
  },
}

// this should produce type error
// window.open('http://google.com')

export type API = typeof api

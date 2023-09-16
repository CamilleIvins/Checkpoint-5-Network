import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  // posts section

  /** @type {Post[]} */
  // /** @type {import('./models/Post.js').Post}*/
  posts: [],

  // page nav section

  /** @type {Number} */
  pageNumber: 1,
  /** @type{Number} */
  totalPages: 13,

})

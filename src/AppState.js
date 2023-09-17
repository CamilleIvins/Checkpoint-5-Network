import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  // posts section

  /** @type {import('./models/Post.js')Post[]} */
  // /** @type {import('./models/Post.js').Post}*/
  posts: [],

  /** @type {import('./models/Post.js')Post[]} */
  activePost: null,
  // page nav section

  // profile section
  // /** @type {import('./models/Profile.js')Profile[]} */
  // /** @type {import('./models/Profile.js').Profile}*/
  profiles: [],

  // /** @type {Profile} */
  // should this be null?
  activeProfile: null,
  // page nav section

  /** @type {Number} */
  pageNumber: 1,
  /** @type{Number} */
  totalPages: 13,

})

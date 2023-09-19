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



  // check that full object is coming back on draw/get function so as to access page numbers, as all of the below should be able to get set to '1' and still work
  /** @type {Number} */
  pageNumber: 1,
  /** @type{Number} */
  totalPages: 1,

  /** @type {Number} */
  pPageNumber: 1,
  /** @type{Number} */
  pTotalPages: 1,

  sellers: [],

  /** @type{String} */
  searchTerm: ""

})

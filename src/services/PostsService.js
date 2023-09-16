import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class PostsService {
    async getPosts() {
        AppState.posts = []

        const res = await api.get('api/posts')
        logger.log('res data return', res.data);

        // No 'map', or 'results'?
        AppState.posts = res.data.posts.map(post => new Post(post))
        // AppState.posts = res.data
    }

    async changePage(url) {
        logger.log("this is the page url", url)
        const res = await api.get(url)
        logger.log("did the url change?", res.data)
        AppState.posts = res.data.posts.map(post => new Post(post))

        AppState.pageNumber = res.data.page
        AppState.totalPages = res.data.totalPages
    }


    async createPost(postData) {
        const res = await api.post('api/posts', postData)
        logger.log(`new post?`, res.data)
        const newPost = new Post(res.data)
        AppState.posts.push(newPost)
        // return newPost
    }
}

export const postsService = new PostsService
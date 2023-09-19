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
        AppState.totalPages = res.data.totalPages
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

    async pChangePage(url) {
        logger.log('url fo pagination on profile page', url)
        const res = await api.get(url)
        logger.log("is URL 1.) valid, and 2.) change?", res.data)
        AppState.posts = res.data.posts.map(post => new Post(post))
        AppState.pPageNumber = res.data.page
        AppState.pTotalPages = res.data.totalPages
    }

    async createPost(postData) {
        const res = await api.post('api/posts', postData)
        logger.log(`new post?`, res.data)
        const newPost = new Post(res.data)
        AppState.posts.unshift(newPost)
        // return newPost
    }
    async editPost(postData) {
        const postId = postData.id
        const res = await api.put(`api/posts/${postId}`, postData)
        logger.log(`editing`, res.data)
        let postIndex = AppState.posts.findIndex(post => post.id == postId)
        if (postIndex >= 0) (
            AppState.posts.splice(postIndex, 1)
        )
        const editedPost = new Post(res.data)
        AppState.posts.push(editedPost)
        // return newPost
    }

    async getPostById(postId) {
        AppState.activePost = null
        const res = await api.get(`api/posts/${postId}`)
        logger.log('active post', res.data)
        AppState.activePost = new Post(res.data)


    }

    async deletePost(post) {
        // await AppState.posts.find(post => post.id == postId)
        let postId = post.id
        const res = await api.delete(`api/posts/${postId}`)
        logger.log("post to remove", res.data)
        let postIndexToRemove = AppState.posts.findIndex(post => post.id == postId)
        if (postIndexToRemove >= 0) (
            AppState.posts.splice(postIndexToRemove, 1)
        )
    }

    async searchPosts(searchTerm) {
        const res = await api.get(`api/posts?query=${searchTerm}`)
        logger.log('posts query res.data', res.data)
        AppState.posts = res.data.posts.map(post => new Post(post))
        AppState.searchTerm = searchTerm
        AppState.totalPages = res.data.totalPages
    }

    async setActivePost(postId) {
        const post = AppState.posts.find(post => post.id == postId)
        AppState.activePost = post
    }

    setActiveProfile(profileId) {
        const profile = AppState.profiles.find(profile => profile.id == profileId)
        AppState.setActiveProfile = profile
        // logger.log('profile id?', profileId) <--✅
    }

    async clearSearch() {
        AppState.searchTerm = ''
        await postsService.getPosts()
    }

    async like(postId) {
        // const post = AppState.posts.find(post => post.id == postId)
        // AppState.activePost = post

        logger.log("correct id to like?", postId)
        // logger.log("correct id to like?", post)
        let liker = AppState.account.id
        const res = await api.post(`api/posts/${postId.id}/like`, liker)
        if (res.likeIds != liker) {
            // maybe I need to be splicing...SINGULAR 'like'
            logger.log("likeable?", res.data.likeIds)
            postId.accountLiked = true
        } else {
            // res.likeIds.splice(postId.likeIds.liker)
            res.likeIds -= liker
            postId.accountLiked = false
        }
        // these two lines do not add anything, but are they necessary to make reactive?
        const likedPost = new Post(postId)
        AppState.posts.push(likedPost)

    }

}

export const postsService = new PostsService
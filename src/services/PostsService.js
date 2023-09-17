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
    async editPost(postData) {
        const postId = postData.id
        const res = await api.put(`api/posts/${postId}`, postData)
        logger.log(`editing`, res.data)
        const editedPost = new Post(res.data)
        let postIndex = AppState.posts.findIndex(post => post.id == postId)
        if (postIndex >= 0) (
            AppState.posts.splice(postIndex, 1)
        )
        // return newPost
    }

    async getPostById(postId) {
        AppState.activePost = null
        const res = await api.get(`api/cars/${postId}`)
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


    setActivePost(postId) {
        const post = AppState.posts.find(post => post.id == postId)
        AppState.activePost = post
    }

    setActiveProfile(profileId) {
        const profile = AppState.profiles.find(profile => profile.id == profileId)
        AppState.setActiveProfile = profile
        logger.log('profile id?', profileId)
    }
    // async is in profile service as well
    async getActiveProfile(profileId) {
        AppState.activeProfile = null
        const profile = AppState.profiles.find(profile => profile.id == profileId)
        logger.log('trying to reach profile', AppState.profiles)
        // const res = await api.get(`api/profiles/${profileId}`)
        const res = await api.get(`api/profiles/` + profileId)
        logger.log('trying to reach profile', res.data)
        // AppState.activeProfile = new Profile(res.data)
        AppState.activeProfile = profile
    }
}

export const postsService = new PostsService
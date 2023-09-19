import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Profile } from "../models/Profile.js"
import { Post } from "../models/Post.js"

class ProfilesService {

    // async is in profile service as well
    // async getActiveProfile(profileId) {
    //     AppState.activeProfile = null
    //     // const profile = AppState.profiles.find(profile => profile.id == profileId)
    //     logger.log('trying to reach null profile', AppState.activeProfile)
    //     // const res = await api.get(`api/profiles/${profileId}`)
    //     const res = await api.get(`api/profiles/${profileId}`)
    //     logger.log('trying to reach profile', res.data)
    //     logger.log('trying to reach active profile', AppState.activeProfile)
    //     // AppState.activeProfile = new Profile(res.data)
    //     AppState.activeProfile = res.data
    // }
    async getActiveProfile(profileId) {
        // const profile = AppState.posts.find(post => post.creator.id == profileId)
        const res = await api.get(`api/profiles/${profileId}`)
        logger.log("profile, c'mere", res.data)
        const profile = new Profile(res.data)
        AppState.activeProfile = profile
        logger.log('profile id return?', profileId)
    }

    async getPostsByProfile(profileId) {
        // dude, remember to watch for the   ⬇️ absent 's
        const res = await api.get(`api/profiles/${profileId}/posts`)
        logger.log('profile posts', res.data)
        const profilePosts = res.data.posts.map(proPosts => new Post(proPosts))
        AppState.posts = profilePosts

        AppState.pTotalPages = res.data.totalPages


    }

    async searchProfiles(searchTerm) {
        const res = await api.get(`api/profiles?query=${searchTerm}`)
        logger.log('profile query res.data', res.data)
        // double-check plurals here
        AppState.profiles = res.data.profiles.map(profile => new Profile(profile))
        AppState.searchTerm = searchTerm
        AppState.totalPages = res.data.totalPages
    }

}

export const profilesService = new ProfilesService
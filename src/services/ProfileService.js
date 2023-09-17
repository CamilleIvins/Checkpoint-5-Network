import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Profile } from "../models/Profile.js"

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
        const profile = AppState.posts.find(post => post.creator.id == profileId)
        AppState.activeProfile = profile
        logger.log('profile id return?', profileId)
    }

}

export const profilesService = new ProfilesService
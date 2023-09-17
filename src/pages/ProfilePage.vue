<template>
    <!-- look at Artsy from Seniors' class -->
    <!-- <div v-if="activeProfile" class="component row justify-content-center"> -->
    <!-- <div v-for="profile in profiles" :key="profile.id" class="col-md-6 col-12 g-1"> -->
    <div v-if="profile">

        get from the profile details page
        <div>
            {{ profile.name }}
        </div>
        <p>
            {{ profile.id }}
        </p>
    </div>
    draw all the posts from this profile below
    <!-- </div> -->
    <!-- </div> -->
    Profile page!!!!

    <!-- {{ AppState.activeProfile }} -->
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
import { profilesService } from '../services/ProfileService.js';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { Profile } from "../models/Profile.js"
import { Post } from '../models/Post.js';

export default {
    setup() {
        const route = useRoute()

        async function getActiveProfile() {
            try {
                //    this returning 'Object Object'⬇️
                const profileId = route.params.profileId
                logger.log('profile route', route.params.profileId)
                await profilesService.getActiveProfile(profileId)
            } catch (error) {
                Pop.error(error.message)
            }
        }
        onMounted(() => {
            getActiveProfile()
        })
        return {
            profile: computed(() => AppState.activeProfile)
        }
    }
}

// export default {
//     props: { post: { type: Post, required: true } },

//     setup(props) {
//         const route = useRoute()
//         onMounted(() => {
//             getActiveProfile()
//         })
//         // async is set up in both services - not working in either- returns url profile/undefined
//         async function getActiveProfile() {
//             try {
//                 // const profileId = route.params.profileId
//                 // logger.log('profileID', profileId)
//                 await profilesService.getActiveProfile(props.post.creator.id)
//             } catch (error) {
//                 Pop.error("returning undefined?", error)
//             }
//         }

//         return {
//             profiles: computed(() => AppState.profiles)
//         }
//     }
// }

// export default {
//   props: { profile: { type: Profile, required: true } },

//     setup() {
//         const route = useRoute()
//         onMounted(() => {
//             getActiveProfile()
//             logger.log("route", route)
//             logger.log("profiles in AppState", AppState.profiles)
//             logger.log("posts in AppState", AppState.posts.body)
//         });
//         async function getActiveProfile() {
//             try {
//                 // const profileId = route.params.profileId
//                 // await profilesService.getActiveProfile(route.params.profileId)
//                 await profilesService.getActiveProfile()
//                 logger.log('appstate activeProfile', AppState.activeProfile)
//             } catch (error) {
//                 Pop.error("another issue", error)
//             }
//         }

//         return {
//             getActiveProfile,
//             activeProfile: computed(() => AppState.activeProfile),
//             account: computed(() => AppState.account),

//         }
//     }
// };
</script>


<style lang="scss" scoped></style>
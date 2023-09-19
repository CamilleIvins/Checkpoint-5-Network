<template>
    <!-- look at Artsy from Seniors' class -->
    <!-- <div v-if="activeProfile" class="component row justify-content-center"> -->
    <!-- <div v-for="profile in profiles" :key="profile.id" class="col-md-6 col-12 g-1"> -->
    <div v-if="profile" class="container-fluid">
        <div class="row justify-content-center">

            <img class="profile-pic px-0" :src="profile.picture" alt="">
        </div>
        <div class="row">
            <div class="col-4 px-0">
                <div class="p-2 elevation-2 profile-card sticky-top">

                    <img src="../assets/img/Network-logo-button.png" id="bioLinks" class="rounded my-2 ">
                    <h1>{{ profile.name }}</h1>

                    <div class="row">
                        <a class="col-md-4 col-12" v-if="profile.linkedin" :href="profile.linkedin"><i
                                class="mdi mdi-linkedin fs-1"></i>
                            <div class="text-black">Let's connect!</div>
                        </a>
                        <a class="col-md-4 col-12" v-if="profile.github" :href="profile.github"><i
                                class="mdi mdi-github fs-1"></i>
                            <div class="text-black">See my projects!</div>
                        </a>
                        <a class="col-md-4 col-12" v-if="profile.email" :href="profile.email"><i
                                class="mdi mdi-email fs-1"></i>
                            <div class="text-black">We should chat!</div>
                        </a>
                        <a class="col-md-4 col-12" v-if="profile.resume" :href="profile.resume"><i
                                class="mdi mdi-file-account fs-1"></i>
                            <div class="text-black">My highlight reel!</div>
                        </a>
                        <a class="col-md-4 col-12" v-if="profile.class" :href="profile.class"><i
                                class="mdi mdi-account-group fs-1"></i>
                            <div class="text-black">{{ profile.class }}</div>
                        </a>
                        <div>
                            <a class="col-md-4 col-12">
                                <i v-if="profile.graduated == true" :href="profile.graduated"
                                    class="mdi mdi-school fs-1"></i>
                                <i v-else :href="profile.graduated" class="mdi mdi-school-outline fs-1"></i>
                            </a>
                            <div v-if="profile.graduated == true" :href="profile.graduated" class="text-black">Graduated
                            </div>
                            <div v-else :href="profile.graduated" class="text-black">Finishing classes</div>
                        </div>


                    </div>
                </div>
            </div>
            <div class="col-8">
                <p>{{ profile.bio }}</p>
                <span v-for="seller in sellers" :key="seller.title">
                    <!-- NO 'S' HERE⬇️ -->
                    <!-- <img :src="seller.tall" alt=""> -->
                    <SellerBanner :seller="seller" />
                </span>

                <section class="row justify-content-between my-2">
                    <button @click="pChangePage(pageNumber - 1)" :disabled="pageNumber <= 1" class="col-3 search">
                        <i class="mdi mdi-arrow-left"></i> Tony
                    </button>
                    <button @click="pChangePage(pageNumber + 1)" :disabled="pageNumber >= totalPages" class="col-3 search">
                        Passé <i class="mdi mdi-arrow-right"></i>
                    </button>
                </section>

                <div v-for="post in posts" :key="post.id" class=" g-1">
                    <PostCard :post="post" />
                </div>

            </div>
        </div>
        <!-- <div class="col-8" v-for="post in posts">

        </div> -->
    </div>

    <!-- draw all the posts from this profile below -->
    <!-- </div> -->
    <!-- </div> -->
    <!-- Profile page!!!! -->

    <!-- {{ AppState.activeProfile }} -->
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { sellersService } from '../services/SellersService.js';
import { logger } from '../utils/Logger.js';
import { postsService } from '../services/PostsService.js';
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
                // logger.log('profile route', route.params.profileId) <--✅
                await profilesService.getActiveProfile(profileId)
            } catch (error) {
                Pop.error(error.message)
            }
        }
        // remember to check for rogue "s"s
        async function getPostsByProfile() {
            try {
                const profileId = route.params.profileId
                await profilesService.getPostsByProfile(profileId)
            } catch (error) {
                Pop.error('Does this person even post?', error)
            }
        }

        onMounted(() => {
            getActiveProfile()
            getPostsByProfile()
            getSellers()

        })
        async function getSellers() {
            try {
                await sellersService.getSellers();
                // logger.log('are sellers coming back?'); <--✅
            }
            catch (error) {
                Pop.error(error);
            }
        }
        return {
            async pChangePage(number) {
                try {
                    const profileId = route.params.profileId
                    await postsService.pChangePage(`api/profiles/${profileId}/posts?page=${number}`)
                } catch (error) {
                    Pop.error('cannto change page, good sir')
                }
            },


            profile: computed(() => AppState.activeProfile),
            posts: computed(() => AppState.posts),
            sellers: computed(() => AppState.sellers),
            pageNumber: computed(() => AppState.pPageNumber),

            totalPages: computed(() => AppState.pTotalPages),



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


<style lang="scss" scoped>
@media (mAX-width: 768px) {

    #bioLinks {
        height: 5vh;

    }
}

button {
    background-color: rgb(136, 185, 228);
    border-radius: 10em;
}

.profile-pic {
    height: 25vh;
    width: 25vh;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
}

.profile-card {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    backdrop-filter: blur(50px) opacity(0.95);
    // border: 5px black;
    // box-shadow: 0 1px 15px whitesmoke;
    // position: sticky
}

#bioLinks {
    // height: 20vh;
    width: 100%;
    border-radius: 50%;
    object-fit: contain;
    object-position: center;
}
</style>
<template>
    <div class="container mx-0 my-2">
        <div class="row">
            <div class="p-2 post-card w-100 rounded elevation-5">

                <div class="d-flex justify-content-between">
                    <router-link :to="{ name: 'Profile', params: { profileId: post.creator.id } }">
                        <!-- , params: { profileName: profile.name }  -->
                        <img class="profile-pic" :src="post.creator.picture" @click="setActiveProfile">
                    </router-link>
                    <!-- TODO make this name and/or the profile pic clickable to bring user to the profile page.✅-->
                    <!-- <p>{{ post.creator.name }} {{ post.creator.class }}</p> -->
                    <div>
                        Created on: <Timeago :refresh="60" :datetime="post.createdAt" locale="en"></Timeago>
                        <p>
                            Updated on: <Timeago :refresh="60" :datetime="post.updatedAt" locale="en"></Timeago>
                        </p>
                        <div class="text-end fs-3 pe-3">
                            <i class="mdi mdi-heart selectable"></i>
                        </div>
                    </div>
                </div>
                <div class="card shadow rounded">
                    <img class="post-image" :src="post.imgUrl" alt="">

                </div>

                <div class="">
                    <div class="p-1">{{ post.body }}</div>
                </div>
                <div v-if="post.creator.id == account.id" class="d-flex justify-content-end">
                    <div @click="setActivePost()">
                        <button class=" mx-3 btn polish" @click="editPost">Polish</button>
                        <span @click="setActivePost()">
                            <button class=" mx-3 btn btn-danger text-light" @click="deletePost()">Delete</button>
                        </span>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Post } from '../models/Post.js';
import { Profile } from '../models/Profile.js';
import { postsService } from '../services/PostsService.js';
import { profilesService } from '../services/ProfileService.js';
import { logger } from '../utils/Logger.js';
import { Timeago } from 'vue2-timeago'
import Pop from '../utils/Pop.js';

export default {
    components: { Timeago },
    props: { post: { type: Post, required: true } },
    setup(props) {

        return {
            coverImg: computed(() => `url(${props.post.imgUrl})`),
            account: computed(() => AppState.account),
            activeProfile: computed(() => AppState.activeProfile),

            async deletePost() {
                if (await Pop.confirm("Are you sure you wish to delete this?")) {
                    try {
                        await postsService.deletePost(props.post)
                    } catch (error) {
                        Pop.error(error)
                    }
                }
            },

            async editPost() {
                if (await Pop.confirm("No shame in improvement")) {
                    try {
                        await postsService.editPost(props.post)
                    } catch (error) {
                        Pop.error(error)
                    }
                }
            },

            setActivePost() {
                postsService.setActivePost(props.post.id)
                logger.log("post ID", props.post.id)
            },
            setActiveProfile() {
                postsService.setActiveProfile(props.post.creator.id)
                logger.log("post.creator (yes ID))", props.post.creator.id)
            },
        }
    }
};
</script>


<style lang="scss" scoped>
.post-card {
    border: 2px;
    border-radius: 5px;
    height: 60vh;
    overflow-y: hidden;
    width: 15vw;
    background-color: seashell;
}

.polish {
    background-color: #cff4fc;
}

.post-image {
    object-fit: cover;
    object-position: center;
    height: 30vh;
    width: 100%;
}

.profile-pic {
    object-fit: contain;
    object-position: center;
    height: 10vh;
    width: 10vw;
    margin-bottom: 1em;
}

.profile-pic:hover {
    transform: scale(1.03);
    transition: 0.25s ease;
}
</style>
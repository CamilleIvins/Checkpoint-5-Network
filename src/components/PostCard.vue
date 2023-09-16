<template>
    <div class="container selectable" @click="setActivePost">
        <div class="row">
            <div class="p-2 col-4 post-card w-100 rounded elevation-5">

                <div class="d-flex justify-content-between">
                    <router-link :to="{ name: 'Profile' }">
                        <img class="profile-pic" :src="post.creator.picture" alt="">
                    </router-link>
                    <!-- TODO make this name and/or the profile pic clickable to bring user to the profile page.  -->
                    <!-- <p>{{ post.creator.name }} {{ post.creator.class }}</p> -->
                    <div>
                        <img class="post-image" :src="post.imgUrl" alt="">
                    </div>
                </div>
                <div class="">
                    <div>{{ post.body }}</div>
                </div>
                <!-- <div class="d-flex justify-content-between">
                    <button v-if="activePost.creator.id == account.id" @click="editPost">Polish</button>
                    <button v-if="activePost.creator.id == account.id" @click="deletePost">Delete</button>
                </div> -->
            </div>
            <!-- <div class="col-6"></div> -->
        </div>
    </div>
    <!-- <div class="component post-card">
        {{ post.imgUrl }} -->
    <!-- <div v-if="account.picture || user.picture">
            <img :src="account.picture || user.picture" alt="account photo" height="40" class="rounded" />
        </div> -->
    <!-- </div> -->
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Post } from '../models/Post.js';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';

export default {
    props: { post: { type: Post, required: true } },
    setup(props) {
        logger.log('appstate activePost', AppState.activePost)
        return {
            coverImg: computed(() => `url(${props.post.imgUrl})`),

            setActivePost() {
                postsService.setActivePost(props.post.id)
            }
        }
    }
};
</script>


<style lang="scss" scoped>
.post-card {
    border: 2px;
    border-radius: 5px;
    height: 20vh;
    width: 15vw;
}

.post-image {
    object-fit: contain;
    object-position: center;
    height: 15vh;
    width: 15vw;
}

.profile-pic {
    object-fit: contain;
    object-position: center;
    height: 15vh;
    width: 15vw;
}
</style>
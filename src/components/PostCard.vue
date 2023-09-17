<template>
    <div class="container col-md-7 col-10  my-2" @click="setActivePost">
        <div class="row">
            <div class="p-2 post-card w-100 rounded elevation-5">

                <div class="d-flex justify-content-between">
                    <router-link :to="{ name: 'Profile' }">
                        <img class="profile-pic" :src="post.creator.picture" alt="">
                    </router-link>
                    <!-- TODO make this name and/or the profile pic clickable to bring user to the profile page.  -->
                    <!-- <p>{{ post.creator.name }} {{ post.creator.class }}</p> -->
                    <div>
                        Created on: {{ post.createdAt }}
                        <p>
                            Updated on: {{ post.updatedAt }}
                        </p>
                        <div class="text-end fs-3 selectable pe-3">
                            <i class="mdi mdi-heart"></i>
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
                    <button class=" mx-3 btn polish" @click="editPost">Polish</button>
                    <button class=" mx-3 btn btn-danger text-light" @click="deletePost">Delete</button>
                </div>
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
            account: computed(() => AppState.account),

            setActivePost() {
                postsService.setActivePost(props.post.id)
                logger.log(props.post.id)
            }
        }
    }
};
</script>


<style lang="scss" scoped>
.post-card {
    border: 2px;
    border-radius: 5px;
    height: 50vh;
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
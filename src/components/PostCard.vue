<template>
    <div class="container">
        <div class="row">
            <div class="p-2 col-4 post-card w-100 rounded elevation-5">

                <div class="d-flex justify-content-between">
                    <img class="profile-pic" :src="post.creator.picture" alt="">
                    <!-- TODO make this name and/or the profile pic clickable to bring user to the profile page.  -->
                    <!-- <p>{{ post.creator.name }} {{ post.creator.class }}</p> -->
                    <div>
                        <img class="post-image" :src="post.imgUrl" alt="">
                    </div>
                </div>
                <div class="">
                    <div>{{ post.body }}</div>
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

export default {
    props: { post: { type: Post, required: true } },
    setup(props) {
        return {
            coverImg: computed(() => `url(${props.post.imgUrl})`)
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
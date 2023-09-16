<template>
    <form @submit.prevent="createPost" class="component row form-card">
        <!-- <div class="col-11">
            <input v-model="postData.body" type="text" class="form-control" placeholder="Title" maxlength="75">
        </div> -->
        <div class="col-11">
            <input v-model="postData.imgUrl" type="text" class="form-control" placeholder="Cover photo" maxlength="200">
        </div>
        <textarea v-model="postData.body" name="newPost" id="newPost" class="form-control" rows="5"
            placeholder="Type away"></textarea>

        <button class="btn col-3 mt-3">Post!</button>
    </form>
</template>

<!-- LOOK AT THE GREGSLIST FOR VUE -->

<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { postsService } from '../services/PostsService.js';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { Post } from '../models/Post.js';


export default {
    setup() {
        const postData = ref({})
        const router = useRouter()
        // const router = useRouter()
        return {
            postData,

            // creat/post
            async createPost() {
                try {
                    logger.log('new post up?', postData.value)
                    const newPost = await postsService.createPost(postData.value)
                    Pop.toast('ready to go viral!')
                    router.push({ name: 'Home' })
                    postData.value = {}
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }
};
</script>


<style lang="scss" scoped>
.form-card {
    border: 1px;
    box-shadow: 0 0 5px 1px,
        // inset 0 0 5px 1px;

}

textarea {
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 3px;
    border-bottom-right-radius: 3px;
}

button {
    background-color: rgb(136, 185, 228);
    border-radius: 10em;
}

button:hover {
    background-color: rgb(61, 147, 221);
    border-radius: 10em;
    cursor: pointer;
    transition: .5s ease;
}
</style>


<!-- https://giphy.com/embed/jTlFgjNiF2oaxoBm92 -->
<!-- https://giphy.com/gifs/MayansFX-arcade-games-skeeball-jTlFgjNiF2oaxoBm92 -->
<!-- https://giphy.com/gifs/MayansFX-arcade-games-skeeball-jTlFgjNiF2oaxoBm92 -->
<!-- not needed in router push? , params: { postId: newPost.id }  -->
<!--                                ⬆️ removing this worked -->
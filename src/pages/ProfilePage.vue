<template>
    <div v-if="activeProfile" class="component row justify-content-center">
        <div class="col-md-6 col-12">
            <!-- get from the profile details page -->
            <!-- <div>
                {{ Post.creator.picture }}
            </div>
            <p>
                {{ post.creator.name }}
            </p> -->
            Profile page!!!!
            <!-- draw all the posts from this profile below -->
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Post } from '../models/Post.js';
export default {
    setup() {
        return {}
    }
};
</script>


<style lang="scss" scoped></style>
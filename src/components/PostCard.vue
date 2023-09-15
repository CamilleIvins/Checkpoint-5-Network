<template>
    <div class="component">
        {{ post }}
        <div v-if="account.picture || user.picture">
            <img :src="account.picture || user.picture" alt="account photo" height="40" class="rounded" />
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Post } from '../models/Post.js';

export default {
    props: { post: { type: Post, required: true } },
    setup() {
        return {}
    }
};
</script>


<style lang="scss" scoped></style>
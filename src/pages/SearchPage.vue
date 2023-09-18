<template>
    <form @submit.prevent="searchPosts" class="component row justify-content-between">
        <div class="mb-1 col-12 input-group">
            <input v-model="searchTerm" type="text" class="form-control" placeholder="search" maxlength="25">
            <button class="btn"><i class="mdi mdi-magnify"></i></button>
        </div>
        <div v-if="activeSearch" class="my-1">
            Searching for: <span @click="clearSearch" class="border border-primary rounded-pill p-2">{{ searchTerm }}
                <i class="mdi mdi-close"></i></span>
        </div>
    </form>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { profilesService } from '../services/ProfileService.js';
import { logger } from '../utils/Logger.js';
import { postsService } from '../services/PostsService.js';
export default {
    setup() {
        const searchTerm = ref('')
        return {
            searchTerm,

            activeSearch: computed(() => AppState.searchTerm),
            async searchProfiles(event) {
                try {
                    await profilesService.searchProfiles(searchTerm.value)
                    logger.log('searching profiles', searchTerm.value)
                    event.target.reset()
                } catch (error) {
                    Pop.error(error)
                }
            },

            async searchPosts(event) {
                try {
                    await postsService.searchPosts(searchTerm.value)
                    logger.log('searching posts', searchTerm.value)
                    event.target.reset()
                } catch (error) {
                    Pop.error(error)
                }
            },

            async clearSearch() {
                try {
                    if (await Pop.confirm('Clear search results?')) {
                        await postsService.clearSearch()
                    }
                } catch (error) {
                    Pop.error(error)
                }

                // getPosts()
            },

        }
    }
};
</script>


<style lang="scss" scoped></style>
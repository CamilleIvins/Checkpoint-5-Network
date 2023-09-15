<template>
  <!-- form to move to a template elsewhere -->
  <form class="component row">
    <div class="col-12">
      <input type="text" class="form-control" placeholder="Title" maxlength="75">
    </div>
    <div class="col-12">
      <input type="text" class="form-control" placeholder="Cover photo" maxlength="200">
    </div>
    <textarea name="postText" id="postText" class="form-control" placeholder="Type away"></textarea>
    <button class="btn col-3 mt-3">Post!</button>
  </form>

  <section class="container">
    <!-- <PostForm/> -->
    <div class="row justify-content-between mt-2">
      <button class="col-3">
        <i class="mdi mdi-arrow-left"></i> older
      </button>
      <button class="col-3">
        newer <i class="mdi mdi-arrow-right"></i>
      </button>

    </div>
    <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
      <!-- <div class="home-card p-5 bg-white rounded elevation-3">
        <img src="https://bcw.blob.core.windows.net/public/img/8600856373152463" alt="CodeWorks Logo"
          class="rounded-circle"> -->
      <h1 class="my-5 bg-dark text-white p-3 rounded text-center">
        Posts really need to start showing up here
        <!--          ⬇️ this is the wrong color, leave uncommented for now -->
        <div v-for="post in posts" :key="post.id" class="col-md-8 col-12">
          <!-- <PostCard :post="post" /> -->
        </div>
      </h1>
      <!-- </div> -->
    </div>

  </section>
</template>

<script>
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js';
import { Post } from '../models/Post.js';
// import PostCard from '../components/PostCard.vue.js';
// import { PostCard } from '../components/PostCard.vue';
// ⬆️ causes errors
export default {
  setup() {
    // onMounted to draw
    onMounted(() => {
      getPosts();
    });
    // 'async function' under setup, 'async' within return block
    async function getPosts() {
      try {
        await postsService.getPosts();
        logger.log('are posts coming back?');
      }
      catch (error) {
        Pop.error(error);
      }
    }
    return {
      getPosts,
      posts: computed(() => AppState.posts)
    };
  },
  // components: { PostCard }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;


  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

button {
  background-color: rgb(136, 185, 228);
  border-radius: 10em;
}
</style>

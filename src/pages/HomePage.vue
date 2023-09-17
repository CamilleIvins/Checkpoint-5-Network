<template>
  <!-- form to move to a template elsewhere -->
  <!-- <form class="component row">
    <div class="col-12">
      <input type="text" class="form-control" placeholder="Title" maxlength="75">
    </div>
    <div class="col-12">
      <input type="text" class="form-control" placeholder="Cover photo" maxlength="200">
    </div>
    <textarea name="postText" id="postText" class="form-control" placeholder="Type away"></textarea>
    <button class="btn col-3 mt-3">Post!</button>
  </form> -->
  <div class="container-fluid ">
    <PostForm class="m-2 rounded" />


    <!-- move to Create Post -->
    <div class="row justify-content-center ">
      <div class="text-center">

        <!-- <router-link :to="{ name: 'Create Post' }">
          <img src="../assets/img/Network-logo-button.png" id="createPost" class="rounded my-2 elevation-4">
        </router-link> -->

      </div>
    </div>

    <section class="row justify-content-between my-2">
      <button @click="changePage(pageNumber - 1)" :disabled="pageNumber <= 1" class="col-3">
        <i class="mdi mdi-arrow-left"></i> Tony
      </button>
      <button @click="changePage(pageNumber + 1)" :disabled="pageNumber >= totalPages" class="col-3">
        Passé <i class="mdi mdi-arrow-right"></i>
      </button>

    </section>


    <section class="row justify-content-around">
      <!-- <div class="home align-items-center justify-content-center"> -->
      <!-- <div class="home-card p-5 bg-white rounded elevation-3">
        <img src="https://bcw.blob.core.windows.net/public/img/8600856373152463" alt="CodeWorks Logo"
          class="rounded-circle"> -->
      <!-- <div class="my-5 text-white p-3 rounded text-center"> -->
      <!-- Posts really need to start showing up here -->
      <!--          ⬇️ this is the wrong color, leave uncommented for now -->
      <div v-for="post in posts" :key="post.id" class=" g-1">
        <PostCard :post="post" />
        <!-- {{ post.creator.class }} -->
      </div>
      <!-- </div> -->
      <!-- </div> -->
      <!-- </div> -->
      <!-- PLACE ADS HERE, NAMED 'SELLERS' -->
    </section>

    <section class="row justify-content-between my-2">
      <button @click="changePage(pageNumber - 1)" :disabled="pageNumber <= 1" class="col-3">
        <i class="mdi mdi-arrow-left"></i> Tony
      </button>
      <button @click="changePage(pageNumber + 1)" :disabled="pageNumber >= totalPages" class="col-3">
        Passé <i class="mdi mdi-arrow-right"></i>
      </button>

    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js';
import { Post } from '../models/Post.js';
import { useRoute, useRouter } from 'vue-router';
// import { profilesService } from '../services/ProfilesService.js';
// ⬆️ causes errors UPDATE: am leaving this in b/c --> ⬆️IT WAS AN 'S'
import { profilesService } from '../services/ProfileService.js';
import { Profile } from '../models/Profile.js';

// import PostCard from '../components/PostCard.vue.js';
// import { PostCard } from '../components/PostCard.vue';
// ⬆️ causes errors
export default {
  // props: { profile: { type: Profile, required: true } },
  // removed "props" from setup argument
  setup() {
    const route = useRoute()
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

      // setActiveProfile() {
      //   profilesService.setActiveProfile(props.profile.name)
      //   logger.log("profile id", props.profile.name)
      // },

      // change pages function,
      async changePage(number) {
        try {
          await postsService.changePage(`api/posts?page=${number}`)
        } catch (error) {
          Pop.error(error)
        }
      },

      // activeProfile: computed(() => AppState.activeProfile),
      posts: computed(() => AppState.posts),
      pageNumber: computed(() => AppState.pageNumber),
      totalPages: computed(() => AppState.totalPages),
      activePost: computed(() => AppState.activePost),
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
  // overflow-y: hidden;


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

// .bg-img {
//   // background-image: url(https://plus.unsplash.com/premium_photo-1661715812379-23d652805042?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80);
//   background-image: url(https://images.unsplash.com/photo-1568646815107-01383e0a8844?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80);
//   object-position: center;
//   object-fit: cover;
//   background-attachment: fixed;
// }

#createPost {
  height: 10vh;
}

#createPost:hover {
  transform: scale(1.1);
  transition: .5s ease;
  box-shadow: 0 0 10px 5px whitesmoke;
}

button {
  background-color: rgb(136, 185, 228);
  border-radius: 10em;
}
</style>

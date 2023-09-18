<template>
  <body class="bg-img">

    <header>
      <Navbar />
    </header>
    <main>
      <router-view />
    </main>
    <!-- <footer class="bg-dark text-light sticky-top">
      Made with 💖 by CodeWorks
    </footer> -->
  </body>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}

.bg-img {
  // background-image: url(https://plus.unsplash.com/premium_photo-1661715812379-23d652805042?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80);
  background-image: url(https://images.unsplash.com/photo-1568646815107-01383e0a8844?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80);
  object-position: center;
  object-fit: cover;
  background-attachment: fixed;
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>

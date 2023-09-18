<template>
  <section class="container-fluid">

    <div class="about text-center">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>
    </div>

    <form @submit.prevent="editProfile()" class="row">

      <div class="form-floating mb-2 col-md-6 col-12">
        <input v-model="editable.name" required type="text" minlength="3" maxlength="50" class="form-control" id="name"
          placeholder="Name">
        <label for="name">Name</label>
      </div>

      <div class="form-floating mb-2 col-md-6 col-12">
        <input v-model="editable.email" required type="text" maxlength="50" class="form-control" id="email"
          placeholder="E-mail">
        <label for="email">E-mail</label>
      </div>

      <div class="form-floating mb-2">
        <input v-model="editable.picture" required type="text" maxlength="250" class="form-control" id="picture"
          placeholder="Picture">
        <label for="picture">Picture URL</label>
      </div>

      <hr>
      <div class="row">

        <i class="mdi mdi-linkedin fs-1 col-1 text-end"></i>
        <span class="col-md-4 col-11">
          <div class="form-floating mb-2 ">
            <input v-model="editable.linkedin" type="text" maxlength="100" class="form-control" id="linkedin"
              placeholder="linkedin">
            <label for="linkedin">Share Profile</label>
          </div>
        </span>
        <i class="mdi mdi-github fs-1 col-1 text-end"></i>
        <span class="col-md-4 col-11">
          <div class="form-floating mb-2 ">
            <input v-model="editable.github" type="text" maxlength="500" class="form-control" id="github"
              placeholder="github">
            <label for="github">Share Profile</label>
          </div>
        </span>
      </div>

      <div class="row">

        <i class="mdi mdi-email fs-1 col-1 text-end"></i>
        <span class="col-md-4 col-11">
          <div class="form-floating mb-2 ">
            <input v-model="editable.email" type="text" maxlength="500" class="form-control" id="email"
              placeholder="email">
            <label for="email">Share Contact Info</label>
          </div>
        </span>
        <i class="mdi mdi-file-account fs-1 col-1 text-end"></i>
        <span class="col-md-4 col-11">
          <div class="form-floating mb-2 ">
            <input v-model="editable.resume" type="text" maxlength="500" class="form-control" id="resume"
              placeholder="resume">
            <label for="resume">Share History</label>
          </div>
        </span>

      </div>

      <div class="row">

        <i class="mdi mdi-account-group fs-1 col-1 text-end"></i>
        <span class="col-md-4 col-11">
          <div class="form-floating mb-2 ">
            <input v-model="editable.class" type="text" maxlength="500" class="form-control" id="class"
              placeholder="class">
            <label for="class">Share Education</label>
          </div>
        </span>

        <span class="form-check ms-md-5 ms-3 my-2 col-4">

          <label class=" form-check-label" for="graduated">Graduated</label>
          <input v-model="editable.graduated" type="checkbox" id="graduated" class="form-check-input">


        </span>

      </div>
      <div class="row justify-content-center mb-2">

        <textarea v-model="editable.bio" name="bio" id="bio" class="col-md-10 ms-md-4 ms-0 col-12" cols="30" rows="10"
          maxlength="1000" placeholder="Bio of champions"></textarea>
      </div>
      <div class="row justify-content-center">
        <button type="submit" class="rounded my-2 col-6 elevation-4" id="update-profile">Share!</button>

      </div>
    </form>
  </section>
</template>

<script>
import { computed, ref, watchEffect } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop.js';
import { accountService } from '../services/AccountService.js';
import { logger } from '../utils/Logger.js';
export default {
  setup() {
    const editable = ref({})
    // But will it work when *I* run it...
    watchEffect(() => {
      logger.log(`let's see the watchEffect magic`)
      editable.value = { ...AppState.account }
    })

    return {
      editable,
      account: computed(() => AppState.account),

      // handleSubmit() {
      //   if (editable.value.id) {
      //     this.account()
      //   } else {
      //     Pop.error("error in editing profile")
      //   }
      // },

      async editProfile() {
        try {
          const formData = editable.value
          await accountService.editProfile(formData)
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}

#update-profile {
  /* width: 100%;
  object-fit: contain;
  object-position: center; */
  margin: 0;
  padding: 0;
}

#update-profile:hover {
  transform: scale(1.1);
  transition: .5s ease;
  box-shadow: 0 0 10px 5px whitesmoke;
}
</style>

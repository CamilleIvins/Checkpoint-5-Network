<template>
    <div class="container mx-0">
        <div class="card my-2 mt-3">
            <img :src="seller.banner" alt="">
        </div>

    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Seller } from '../models/Seller.js';
export default {
    props: { seller: { type: Seller, required: true } },
    setup(props) {
        return { sellers: computed(() => AppState.sellers) }
    }
};
</script>


<style lang="scss" scoped></style>
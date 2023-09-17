<template>
    <div class="component row">
        <div class="col-md-6 col-12">

            <div>
                {{ Post.creator.picture }}
            </div>
            <p>
                {{ post.creator.name }}
            </p>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
    props: { profile: { type: Object, required: true } },
    setup(props) {
        return {}
    }
};
</script>


<style lang="scss" scoped></style>
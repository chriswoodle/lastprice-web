<template>
    <div class="about">
        <img :src="profile.picture" />
        <h1>Reservation booked!</h1>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
    profile = this.$auth.profile;
    mounted() {
        console.log('Hello');
    }
}
</script>
<style lang="scss" scoped>
.about {
    img {
        height: 100px;
        width: 100px;
        border-radius: 50%;
        margin-bottom: 20px;
        &:first-child {
            margin-right: 10px;
        }
    }
}
</style>

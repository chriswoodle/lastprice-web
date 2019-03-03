<template>
    <div class="about">
        <img alt="Vue logo" src="../../assets/logo.png">
        <img :src="profile.picture" />
        <h1>Thank you for your corprate partnership.</h1>
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

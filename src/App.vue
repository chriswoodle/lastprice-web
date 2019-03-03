<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';

// Register the router hooks with their names

@Component
export default class Home extends Vue {
    mounted() {
        console.log('Hello');
    }
    async created() {
        try {
            await this.$auth.renewTokens();
        } catch (e) {
            console.log(e);
        }
    }
}

</script>
<style lang="scss">
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>

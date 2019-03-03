<template>
    <div>
        <div class="login">
            <img alt="last.Price logo" src="../../assets/logo.png">
            <h1>Last.Price</h1>
            <button @click='login()'>Login</button>
        </div>
        <div class='copyright'>
             {{`KnightHacks 2019`}}
        </div>

    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
    login() {
        this.$auth.login();
    }
}
</script>

<style lang="scss" scoped>
$blue: #2d52db;
.login {
    height: 250px;
    width: 250px;
    // border: solid 1px #;
    background-color: white;
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
    padding: 50px;
    img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-bottom: 20px;
    }
    h1 {
        font-size: 30px;
        margin-bottom: 50px;
    }
}
</style>

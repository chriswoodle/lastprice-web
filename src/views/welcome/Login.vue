<template>
    <div class="home">
        <h1>Login</h1>
        <button @click='login()'>Login</button>
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

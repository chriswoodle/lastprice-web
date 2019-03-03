
<template>
    <div>
        <div id="nav">
            <div class='logo'>
                <div class='icon'>
                    <img alt="Vue logo" src="../../assets/logo.png">
                </div>
                <div class='name'>
                    Last.Price
                </div>
            </div>
            <div class='links'>
                <router-link to="/">Home</router-link> |
                <router-link to="/about">About</router-link> |
                <a @click="logout()">Logout</a>
            </div>

            <div class="profile">
                <div class='username'>{{profile.nickname}}</div>
                <div class='image'><img :src="profile.picture" /></div>
                <div class='menu' menu>
                    <router-link to="/customers" v-if='profile["https://woodle.ngrok.io/app_metadata"].company == true'>Company</router-link>
                    <a @click="logout()">
                        Log off
                    </a>
                </div>
            </div>
        </div>
        <div class='body'>
            <router-view />
        </div>
        <div class='copyright'>
            {{`KnightHacks 2019`}}
        </div>

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
    logout() {
        this.$auth.logout();
    }
}
</script>

<style lang="scss">
$blue: #2d52db;
.body {
    height: 100%;
    background: white;
    width: 100%;
    padding-top: 80px;
    padding-bottom: 80px;
}
#nav {
    height: 90px;
    line-height: 90px;
    background: $blue;
    color: white;
    a {
        font-weight: bold;
        color: white;
        text-decoration: none;
        &:hover {
        }
        &.router-link-exact-active {
        }
    }
    .links {
        margin-left: auto;
        margin-right: auto;
        position: absolute;
        width: 100%;
    }
    .logo {
        float: left;
        > div {
            display: inline-block;
            vertical-align: top;
        }
        .icon {
            img {
                height: 90px;
                width: 90px;
            }
        }
        .name {
            font-size: 25px;
        }
    }
    .profile {
        position: absolute;
        right: 0;
        padding: 20px;
        > div {
            display: inline-block;
            vertical-align: top;
        }
        .username {
            padding-right: 10px;
            display: inline;
            line-height: 50px;
        }
        .image {
            img {
                height: 50px;
                width: 50px;
                border-radius: 50%;
            }
        }
        &:hover {
            .menu {
                opacity: 1;
                pointer-events: initial;
            }
        }
        .menu {
            position: fixed;
            opacity: 0;
            pointer-events: none; // Disable hover pointer event when opacity: 0
            right: 0;
            top: 90px;
            background-color: lighten($blue, 5%);
            transition: opacity 0.2s linear;
            min-width: 100px;
            &:hover {
                background-color: lighten($blue, 5%);
            }
            a {
                cursor: pointer;
                display: block;
                padding-right: 15px;
                height: 44px;
                line-height: 44px;
                transition: background-color 0.1s linear;
                font-size: 12px;
                color: white;
                &:hover {
                    text-decoration: none;
                    color: darken(white, 10%);
                }
            }
        }
    }
}
</style>

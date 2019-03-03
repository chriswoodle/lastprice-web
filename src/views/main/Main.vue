
<template>
    <div>
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
            <a @click="logout()">Logout</a>
            <div class="profile">
                <div class='username'>{{profile.nickname}}</div>
                <div class='image'><img :src="profile.picture" /></div>
                <div class='menu' menu>
                    <a @click="logout()">
                        <span>Log off</span>
                    </a>
                </div>
            </div>
        </div>
        <router-view />
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
#nav {
    height: 90px;
    line-height: 50px;
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
    .profile {
        float: right;
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
                &:hover {
                    text-decoration: none;
                    span {
                        color: darken(white, 10%);
                    }
                }
                span {
                    font-size: 12px;
                    color: white;
                }
            }
        }
    }
}
</style>

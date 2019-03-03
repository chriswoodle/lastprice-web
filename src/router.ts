import Vue from 'vue'
import Router from 'vue-router'

import Main from './views/main/Main.vue'
import Home from './views/main/Home.vue'
import About from './views/main/About.vue'


import Welcome from './views/welcome/Welcome.vue'
import Login from './views/welcome/Login.vue'

import Callback from './views/Callback.vue'

import AuthService from './common/authService';
Vue.use(Router)

import { NavigationGuard } from 'vue-router';

const renewGuard: NavigationGuard = (to, from, next) => {
    AuthService.renewTokens().then(() => {
        next();
    }).catch((err: any) => {
        console.warn(err)
        next();
    })
};

const authenticatedGuard: NavigationGuard = (to, from, next) => {
    AuthService.renewTokens().then(() => {
        console.log('authenticatedGuard');
        if (AuthService.isAuthenticated()) {
            console.log('authenticated!');
            next();
        } else {
            console.log('not-authenticated!');
            next({ name: 'login' });
        }
    });
};

const unauthenticatedGuard: NavigationGuard = (to, from, next) => {
    AuthService.renewTokens().then(() => {
        console.log('authenticatedGuard');
        if (!AuthService.isAuthenticated()) {
            console.log('unauthenticated!');
            next();
        } else {
            console.log('not-unauthenticated!');
            next({ name: 'home' });
        }
    });
};

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            beforeEnter: unauthenticatedGuard,
            component: Welcome,
            children: [
                {
                    path: '/',
                    name: 'login',
                    component: Login
                }
            ]
        },
        {
            path: '/',
            beforeEnter: authenticatedGuard,
            component: Main,
            children: [
                {
                    path: '/',
                    name: 'home',
                    beforeEnter: authenticatedGuard,
                    component: Home
                },
                {
                    path: '/about',
                    name: 'about',
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () => import(/* webpackChunkName: "about" */ './views/main/About.vue')
                }
            ]
        },

        {
            path: '/callback',
            name: 'callback',
            component: Callback
        },

    ]
})

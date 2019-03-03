import Vue from 'vue'
import Router from 'vue-router'

import Main from './views/main/Main.vue'
import Home from './views/main/Home.vue'
import Call from './views/main/Call.vue'
import Result from './views/main/Result.vue'
import Company from './views/main/Company.vue'

import Welcome from './views/welcome/Welcome.vue'
import Login from './views/welcome/Login.vue'

import Callback from './views/Callback.vue'

import AuthService from './common/authService';
Vue.use(Router)

import { NavigationGuard } from 'vue-router';

const companyGuard: NavigationGuard = (to, from, next) => {
    if(AuthService.profile && AuthService.profile["https://woodle.ngrok.io/app_metadata"] && AuthService.profile["https://woodle.ngrok.io/app_metadata"].company) {
        next();
    } else {
        next({ name: 'home' });
    }
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
                    path: '/call',
                    name: 'call',
                    beforeEnter: authenticatedGuard,
                    component: Call
                },
                {
                    path: '/company',
                    name: 'company',
                    beforeEnter: companyGuard,
                    component: Company
                },
                {
                    path: '/result',
                    name: 'result',
                    component: Result
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

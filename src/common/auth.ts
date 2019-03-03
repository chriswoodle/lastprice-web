import _Vue from 'vue';
import authService from './authService';

export default function AuthPlugin(Vue: typeof _Vue, options?: any): void {
    Vue.prototype.$auth = authService;
}


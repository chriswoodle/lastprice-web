<template>
    <div class="home">
        <div class='section' v-if='profile && profile["https://woodle.ngrok.io/app_metadata"] && profile["https://woodle.ngrok.io/app_metadata"].company == true'>
            <h1>Corprate Reservation</h1>
            <div class='hotels'>
                <router-link to="/call" class='hotel' v-for='hotel of corprateHotels' :key="hotel.Hotel">
                    <div class='name'>{{hotel.Hotel}}</div>
                    <div class='price'>{{hotel['vendor1-price']}}</div>
                </router-link>
            </div>
        </div>
        <div>
            <h1>Hotels</h1>
            <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
            <div class='hotels'>
                <router-link to="/call" class='hotel' v-for='hotel of hotels' :key="hotel.Hotel">
                    <div class='name'>{{hotel.Hotel}}</div>
                    <div class='price'>{{hotel['vendor1-price']}}</div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

import debug from 'debug';

const log = debug('lastprice:home');

export interface Hotel {
    "vendor3-price": string,
    "vendor2": string,
    "Hotel": string,
    "vendor1": string,
    "vendor3": string,
    "vendor2-price": string,
    "Best-price": string,
    "vendor1-price": string,
    "Bulk-Discount"?: boolean
}

@Component({
    components: {
        HelloWorld,
    },
})
export default class Home extends Vue {
    profile = this.$auth.profile;
    hotels = [];
    get corprateHotels() {
        return this.hotels.filter(hotel => !!(hotel as any)["Bulk-Discount"]);
    }
    mounted() {
        console.log('Hello');
        this.$http.get(`${process.env.VUE_APP_SERVICE_HOST}/hotels`).then(response => {
            // success callback
            log(response.data);
            this.hotels = response.data.comparison
        }, error => {

        });
    }
}
</script>

<style lang="scss" scoped>
$blue: #2d52db;
$green: #42b983;

.home {
    img {
        height: 100px;
        width: 100px;
        border-radius: 50%;
        margin-bottom: 20px;
    }
}
.section {
    margin-bottom: 30px;
}
.hotels {
    width: 400px;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
    .hotel {
        display: block;
        border: 1px solid gray;
        position: relative;
        height: 50px;
        margin-bottom: 5px;
        border-radius: 5px;
        transition: background 0.2s;
        cursor: pointer;
        &:hover {
            background-color: rgba($blue, 0.05);
        }
        .name {
            position: absolute;
            display: inline-block;
            font-size: 12px;
            word-wrap: normal;
            width: 300px;
            padding: 13px;
        }
        .price {
            width: 80px;
            display: inline-block;
            position: absolute;
            right: 0;
            line-height: 50px;
            color: $green;
        }
    }
}
</style>


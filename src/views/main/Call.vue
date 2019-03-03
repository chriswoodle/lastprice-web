<template>
    <div class="call">
        <img alt="Vue logo" src="../../assets/ball-triangle.svg">
        <span>{{message}}</span>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import debug from 'debug';

const log = debug('lastprice:call');


export interface Hotel {
    "vendor3-price": string,
    "vendor2": string,
    "Hotel": string,
    "vendor1": string,
    "vendor3": string,
    "vendor2-price": string,
    "Best-price": string,
    "vendor1-price": string
}

@Component
export default class Call extends Vue {
    message = 'Starting call...';
    profile = this.$auth.profile;
    mounted() {
        log('Mounted');

        console.log(this.$route.params)
        if (this.$route.params.hotel) {
            const hotel: Hotel = this.$route.params.hotel as any;
            const target = this.$route.params.target;
            const body = {
                currprice: hotel['vendor1-price'],
                targetprice: target,
                nextbestprice: '180',
                nextbesthotel: 'roach%20inn',
                customername: this.profile.nickname || 'mr%20cheapskate'
            };
            log(body);
            this.$http.put(`${process.env.VUE_APP_SERVICE_HOST}/call`, body).then(response => {
                // success callback
                log(response.data);
                this.message = 'Calling...';
                this.checkCallStatus();
            }, error => {

            });
        } else {
            this.checkCallStatus();

        }



    }

    checkCallStatus() {
        this.$http.get(`${process.env.VUE_APP_SERVICE_HOST}/callStatus`).then(response => {
            // success callback
            log(response.data.calling);
            if (response.data.calling === true) {
                setTimeout(() => {
                    this.checkCallStatus();
                }, 3000)
            } else {
                this.message = 'Call complete!';
            }
        }, error => {
            log(error);
        });

    }
}
</script>

<style lang="scss" scoped>
$blue: #2d52db;
$green: #42b983;
.call {
    margin-left: auto;
    margin-right: auto;
    height: 100px;
    width: 100px;
    background: $green;
    padding-left: 100px;
    padding-right: 100px;
    padding-top: 80px;
    padding-bottom: 120px;
    border-radius: 50%;
    img {
        height: 100px;
        width: 100px;
        margin-bottom: 20px;
    }
    span {
        font-size: 20px;
        text-align: center;
        color: white;
    }
}
</style>

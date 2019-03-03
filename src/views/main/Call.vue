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

@Component
export default class Call extends Vue {
    message = 'Starting call...';
    mounted() {
        log('Mounted');
        this.$http.put(`${process.env.VUE_APP_SERVICE_HOST}/call`, {}).then(response => {
            // success callback
            log(response.data);
            this.message = 'Calling...';
            this.checkCallStatus();
        }, error => {

        });


    }

    checkCallStatus() {
        this.$http.get(`${process.env.VUE_APP_SERVICE_HOST}/callStatus`).then(response => {
            // success callback
            log(response.data.calling);
            if (response.data.calling === true) {
                setTimeout(() => {
                    this.checkCallStatus();
                }, 2000)
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
    }
    span {
        line-height: 60px;
        font-size: 20px;
        text-align: center;
        color: white;
    }
}
</style>

<template>
    <div>
        <p>Loading...</p>
    </div>
</template>

<script>
export default {
    methods: {
        handleLoginEvent(data) {
            this.$router.push(data.state.target || "/");
        }
    },
    created() {
        console.log("handleAuthentication");
        this.$auth.handleAuthentication().then(() => {
            console.log("complete");
            this.$router.replace({name: 'home'});
        });
    }
};
</script>
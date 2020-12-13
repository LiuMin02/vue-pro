<template>
    <div>
        <Button @click="loginIn">登录</Button>
    </div>
</template>

<script>
    export default {
        methods:{
            loginIn(){
                this.$router.push('/');
            },
        }
    }
</script>

<style lang="less" scoped>

</style>
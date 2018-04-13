<template>
    <div class="page_wrapper bg404">
        <Row class-name="style404_wrapper">
            <Col class-name="style_404">
                <Icon type="leaf" size="150"></Icon>
                <div>哎哟~ 页面不小心飘走了！</div>
            </Col>
        </Row>
        <Row class-name="style404_nav">
            <Col span="10"><div  v-on:click="back">返回</div></Col>
            <router-link to="/"><Col span="10">首页</Col></router-link>
        </Row>
    </div>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    methods: {
        back () {
            console.log("this.$router.history")
            console.log(this.$router)
            this.$router.go(-2);
        }
    }
}
</script>


<style scoped>
    .style404_wrapper {
        text-align: center;
        position: relative;
        top: 20%;
        font-size: 2rem;
        color: #ffffff;
    }
    .bg404 {
        background: cadetblue;
    }
    .style404_nav {
        position: relative;
        top: 25%;
        text-align: center;
        width: 40%;
        margin: 0 auto;
        font-size: 1.6rem;
        color: #ffffff;
    }
    a,a:link,a:active {
        color: #ffffff;
    }
</style>

<template>
    <Row class-name="nav-title">
        <Col :span="options.leftSpan" v-show="options.leftShow"  :style="options.leftStyle">
            <img v-if="options.leftNoDefault" :src="options.leftInfo.src" :width="options.leftInfo.width" :height="options.leftInfo.height">
            <Icon v-else :type="options.leftInfo.iconType" :color="options.leftInfo.iconColor" size="18"></Icon>
        </Col>
        <Col :span="options.centerSpan" v-show="options.centerShow" :style="options.centerStyle">
            <h6>{{options.title}}</h6>
        </Col>
        <Col :span="options.rightSpan" v-show="options.rightShow"  :style="options.rightStyle">
            <a :href="options.href">
               
                    <Row>
                        <Col span="20">{{options.rightText}}</Col>
                        <Col span="4"><Icon type="ios-arrow-forward" size="18"></Icon></col>
                    </Row>
                
            </a>
        </Col>
    </Row>
</template>

<script>
const _object = require('lodash/fp/object');
export default {
    data () {
        return {
            options: {
                leftNoDefault: false,                
                leftSpan: 2,
                centerSpan: 14,
                rightSpan:8,
                leftShow: true,
                rightShow: true,
                centerShow: true,
                title: '',
                rightText: '',
                leftInfo: {
                    iconType:'bonfire',
                    iconColor: '#495060'
                },
                leftStyle: {},
                centerStye: {},
                rightStyle: {
                    'text-align': 'right'
                }
            }
        }
    },
    props: ['navTitleOptions'],
    created () {
        this.options = _object.defaultsDeep(this.options, this.navTitleOptions)
        console.log(this.options)
    }
}
</script>

<style scoped>
    .nav-title{
        background: #ffffff;
        height: 3.5rem;
        padding: 1rem;
        font-size: 1.4rem;
    }
    .nav-title h6 {
        font-size: 1.4rem;
    }
</style>

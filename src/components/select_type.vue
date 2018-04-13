<template>
  <div class="page_wrapper">
        <header-top :isShowHeaderDefaut="isShowHeaderDefaut" :headerOptions="headerOptions">
            
        </header-top>
        <div class="content">
            <Row type="flex" justify="center" class-name="select_wrapper">
                <Col span="20">                    
                    <Row>
                        <router-link to="fill_infomation/company">
                            <Col span="11" class-name="outline">
                                <div class="icon_div"><Icon type="ios-people" size="100" color="#2d8cf0"></Icon></div>
                                <div>我是企业</div>
                            </Col>
                        </router-link>
                        <router-link to="fill_infomation/personal">
                            <Col span="11" class-name="outline mr0">
                                <div class="icon_div pb10"><Icon type="android-person" size="80" color="#2d8cf0"></Icon></div>
                                <div>我是个人</div>
                            </Col>
                        </router-link>
                    </Row>
                    <Row>
                        <Col span="24" class-name="mt10 comment_text">如果您是旅行社或俱乐部，请选择："我是企业"，如果是旅游顾问或者导游等，请选择："我是个人"</Col></Row>
                </Col>
            </Row>
        </div>
  </div>
</template>

<script>
import {headerTop, footerBottom, comButton} from './config/componets'

export default {
    data () {
        return {
            isShowHeaderDefaut: true,
            buttonOptions: {
                value: '下一步'
            },
            headerOptions: {
                title: '选择用户类型'
            }
        }
    },
    methods: {
        nextStep () {
            this.$router.push('register')
        }
    },
    components: {
        headerTop,
        footerBottom,
        comButton
    }
}
</script>

<style scoped>
    .outline {
        border: solid 1px #2d8cf0;
        margin: 0.5rem;
        padding: 0.5rem;
    }
    .mr0 {
        margin-right: 0;
    }
    .icon_div{
        height: 100px;        
    }

</style>

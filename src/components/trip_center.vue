<template>
    <div>
        <transition-group name="movein">
            <header-top  v-if="pageInfo.isShowPage" :headerOptions="headerOptions" class="header-city-right" :key="0"> 
                <Input slot="header_content" icon="ios-search" placeholder="搜索线路/旅行社/俱乐部" style="width: 95%;"></Input>
                <router-link to="" slot="header_right_icon">{{defaultCity}} <Icon type="android-arrow-dropdown"></Icon></router-link>
            </header-top>
            <content-center v-show="pageInfo.isShowPage" @scroll.native="scroll" class="content" :key="1" ref="tabcontent">
                <!-- 跑马灯 -->
                <carousel :per-page="1" :paginationEnabled="carouselOpts.paginationEnabled" :loop="carouselOpts.loop">
                    <slide v-for="(item, index) in imgList" :key="index"  class="demo-carousel">
                        <img :src="item.src">
                    </slide>                   
                </carousel>
                <!-- 九宫格 -->
                <div class="nine-box-wrapper">
                    <Row type="flex" justify="center" class-name="nine-box mt10">
                        <Col span="6" order="4">
                            <div><Icon type="coffee"></Icon></div>
                            <div>国内</div>
                        </Col>
                        <Col span="6" order="4">
                            <div><Icon type="coffee"></Icon></div>
                            <div>国内</div>
                        </Col>
                        <Col span="6" order="4">
                            <div><Icon type="coffee"></Icon></div>
                            <div>国内</div>
                        </Col>                  
                        <Col span="6" order="4">
                            <div><Icon type="coffee"></Icon></div>
                            <div>国内</div>
                        </Col>                  
                    </Row>
                    <Row type="flex" justify="center" class-name="nine-box mt10">
                        <Col span="6" order="4">
                            <div><Icon type="coffee"></Icon></div>
                            <div>国内</div>
                        </Col>
                        <Col span="6" order="4">
                            <div><Icon type="coffee"></Icon></div>
                            <div>国内</div>
                        </Col>
                        <Col span="6" order="4">
                            <div><Icon type="coffee"></Icon></div>
                            <div>国内</div>
                        </Col>                  
                        <Col span="6" order="4">
                            <div><Icon type="coffee"></Icon></div>
                            <div>国内</div>
                        </Col>                  
                    </Row>
                </div>
                <!-- 热门 -->
                <div class="hotlist mt10">
                    <nav-title :navTitleOptions="navTitleOptions"></nav-title>                    
                    <list-layout-line :listLayoutLine="hotList" :imgtextItemOptions="itemOptions"></list-layout-line>
                </div>
                <!-- 列表 -->
               
                <div class="pathlist mt10">
                    <nav-title :navTitleOptions="pathAllOptions"></nav-title>      
                    <list-layout-column :listLayoutColumn="hotList1"></list-layout-column>
                </div>
                <!-- 多标签 -->
               
                <tabs :list="tabList" :menuFixed="menuFixed" :cssTextCopy="cssTextCopy" ref="tab"></tabs>
             
            </content-center>
        
            <footer-bottom  v-if="pageInfo.isShowPage" :key="2">
                <nav-bar-c v-if="pageInfo.isCompany"></nav-bar-c>
                <nav-bar-p v-else></nav-bar-p>
            </footer-bottom>
        </transition-group>
    </div>
</template>

<script>
import {footerBottom, navBarC, navBarP, headerTop, navTitle, contentCenter,
imgtextItema, listLayoutLine, listLayoutColumn, tabs} from './config/componets'
import { Carousel, Slide } from 'vue-carousel';
import {personNav, companyNav} from './config/index'
import vueTouch from './child_component/touch'

let tabBarInfo = {
    currentBar: 0,
    barNum: 0,
    currentBarP: 0,
    currentTarget: null,
    isGetParent: false
};

export default {
    data () {
        return {
            pageInfo: {
                isShowPage: false,
                isCompany: false
            },
            headerOptions: {
                noShowDefaultCenter: true,
                noShowDefaultRight: true
            },
            itemOptions: {
                marketPrice: false,
                source: false,
                titleLine: 1                
            },
            defaultCity: '成都',            
            carouselOpts: {
                paginationEnabled: true,
                loop: true
            },
            tabList: [
                {
                    label:'自驾游', 
                    list: [
                        {
                            src: require('@/assets/images/demo1.jpg'),
                            agencyPrice: '100',
                            marketPrice: '200',
                            title: '周未2天峨眉山自驾游，无隐含消费全程高速，越野商务车，4人起发',
                            source: '成都中旅游公司旅行社'
                        },
                        {
                            src: require('@/assets/images/demo2.jpg'),
                            agencyPrice: '100',
                            marketPrice: '200',
                            title: '周未2天峨眉山自驾游，无隐含消费全程高速，越野商务车，4人起发',
                            source: '成都中旅游公司旅行社'
                        },
                        {
                            src: require('@/assets/images/demo2.jpg'),
                            agencyPrice: '100',
                            marketPrice: '200',
                            title: '周未2天峨眉山自驾游，无隐含消费全程高速，越野商务车，4人起发',
                            source: '成都中旅游公司旅行社'
                        },
                        {
                            src: require('@/assets/images/demo2.jpg'),
                            agencyPrice: '100',
                            marketPrice: '200',
                            title: '周未2天峨眉山自驾游，无隐含消费全程高速，越野商务车，4人起发',
                            source: '成都中旅游公司旅行社'
                        },
                        {
                            src: require('@/assets/images/demo2.jpg'),
                            agencyPrice: '100',
                            marketPrice: '200',
                            title: '周未2天峨眉山自驾游，无隐含消费全程高速，越野商务车，4人起发',
                            source: '成都中旅游公司旅行社'
                        },
                        {
                            src: require('@/assets/images/demo2.jpg'),
                            agencyPrice: '100',
                            marketPrice: '200',
                            title: '周未2天峨眉山自驾游，无隐含消费全程高速，越野商务车，4人起发',
                            source: '成都中旅游公司旅行社'
                        },
                    ]
                },
                {
                    label:'跟团游', 
                    list: [
                        {
                            src: require('@/assets/images/demo2.jpg'),
                            agencyPrice: '100',
                            marketPrice: '200',
                            title: '周未2天峨眉山自驾游，无隐含消费全程高速，越野商务车，4人起发',
                            source: '成都中旅游公司旅行社'
                        },
                        
                    ]
                },
                {
                    label:'户外', 
                    list: [
                        {
                            src: require('@/assets/images/demo1.jpg'),
                            agencyPrice: '100',
                            marketPrice: '200',
                            title: '周未2天峨眉山自驾游，无隐含消费全程高速，越野商务车，4人起发',
                            source: '成都中旅游公司旅行社'
                        },
                        {
                            src: require('@/assets/images/demo1.jpg'),
                            agencyPrice: '100',
                            marketPrice: '200',
                            title: '周未2天峨眉山自驾游，无隐含消费全程高速，越野商务车，4人起发',
                            source: '成都中旅游公司旅行社'
                        },
                        {
                            src: require('@/assets/images/demo1.jpg'),
                            agencyPrice: '100',
                            marketPrice: '200',
                            title: '周未2天峨眉山自驾游，无隐含消费全程高速，越野商务车，4人起发',
                            source: '成都中旅游公司旅行社'
                        },
                        {
                            src: require('@/assets/images/demo1.jpg'),
                            agencyPrice: '100',
                            marketPrice: '200',
                            title: '周未2天峨眉山自驾游，无隐含消费全程高速，越野商务车，4人起发',
                            source: '成都中旅游公司旅行社'
                        },
                        {
                            src: require('@/assets/images/demo1.jpg'),
                            agencyPrice: '100',
                            marketPrice: '200',
                            title: '周未2天峨眉山自驾游，无隐含消费全程高速，越野商务车，4人起发',
                            source: '成都中旅游公司旅行社'
                        },
                        
                    ]
                },
            ],
            imgList: [
                {
                    src: require('../assets/images/1-fb535ec.jpg')
                },
                {
                    src: require('../assets/images/2-34e6936.jpg')
                }
            ],
            hotList: [
                {
                    src: require('@/assets/images/demo1.jpg'),
                    agencyPrice: '100',
                    marketPrice: '200',
                    title: '周未2天峨眉山自驾游，无隐含消费全程高速，越野商务车，4人起发',
                    source: '成都中旅游公司旅行社'
                },
                {
                    src: require('@/assets/images/demo1.jpg'),
                    agencyPrice: '100',
                    marketPrice: '200',
                    title: '周未2天峨眉山自驾游，无隐含消费全程高速，越野商务车，4人起发',
                    source: '成都中旅游公司旅行社'
                },
                {
                    src: require('@/assets/images/demo1.jpg'),
                    agencyPrice: '100',
                    marketPrice: '200',
                    title: '周未2天峨眉山自驾游，无隐含消费全程高速，越野商务车，4人起发',
                    source: '成都中旅游公司旅行社'
                },
                {
                    src: require('@/assets/images/demo1.jpg'),
                    agencyPrice: '100',
                    marketPrice: '200',
                    title: '周未2天峨眉山自驾游，无隐含消费全程高速，越野商务车，4人起发',
                    source: '成都中旅游公司旅行社'
                },
                {
                    src: require('@/assets/images/demo1.jpg'),
                    agencyPrice: '100',
                    marketPrice: '200',
                    title: '周未2天峨眉山自驾游，无隐含消费全程高速，越野商务车，4人起发',
                    source: '成都中旅游公司旅行社'
                }
            ],
            hotList1: [
                {
                    src: require('@/assets/images/demo1.jpg'),
                    agencyPrice: '100',
                    marketPrice: '200',
                    title: '周未2天峨眉山自驾游，无隐含消费全程高速，越野商务车，4人起发',
                    source: '成都中旅游公司旅行社'
                },
                {
                    src: require('@/assets/images/demo2.jpg'),
                    agencyPrice: '100',
                    marketPrice: '200',
                    title: '周未2天峨眉山自驾游，无隐含消费全程高速，越野商务车，4人起发',
                    source: '成都中旅游公司旅行社'
                },
                {
                    src: require('@/assets/images/demo3.jpg'),
                    agencyPrice: '100',
                    marketPrice: '200',
                    title: '周未2天峨眉山自驾游，无隐含消费全程高速，越野商务车，4人起发',
                    source: '成都中旅游公司旅行社'
                },
                {
                    src: require('@/assets/images/demo3.jpg'),
                    agencyPrice: '100',
                    marketPrice: '200',
                    title: '周未2天峨眉山自驾游，无隐含消费全程高速，越野商务车，4人起发',
                    source: '成都中旅游公司旅行社'
                },
                {
                    src: require('@/assets/images/demo2.jpg'),
                    agencyPrice: '100',
                    marketPrice: '200',
                    title: '周未2天峨眉山自驾游，无隐含消费全程高速，越野商务车，4人起发',
                    source: '成都中旅游公司旅行社'
                }
            ],
            navTitleOptions: {
                rightText:'全部榜单',
                title: '热门榜单',
                leftInfo: {
                    // iconType:'bonfire',
                    iconColor: '#ff0000'
                },
                href: '#/index'
            },
            pathAllOptions: {
                rightShow: false,
                leftInfo: {
                    iconType: 'earth',
                    iconColor: '#00ff00'
                },
                title: '所有线路',
                leftInfo: {
                    // iconType:'bonfire',
                    iconColor: '#ff0000'
                },
                
            },
            cssTextCopy: [],
            menuFixed: false
        }
    },
    created () {
        let url = '';
        if ( this.$route.params.type == 'person') {
            url = 'getPersonTrip.php';
        } else if ( this.$route.params.type == 'company') {
            url = 'getCompanyTrip.php';
        } else {
            this.$router.replace({name: '404'})
            return;
        }
        this.$http({
            url: url
        })
        .then( res => {
            const data = res.data;  
            this.pageInfo.isShowPage = true;
            
            if ( data.code === 0 ) {
                this.pageInfo.isCompany = data.data.info === 'company' ? true : false;
            } else {
                throw data.msg
            }
        })
        .catch( err => {
            console.log(err)
        });
    },
    methods: {
        scroll (el) {
            let self = this.$refs.tabcontent;
            let target = self.$el.children[4];
            let offsetTop = target.offsetTop;
            let scrollTop = self.$el.scrollTop;  
            
            if (offsetTop - scrollTop <= 0) {
                
                this.menuFixed = true;
               
            } else {
                this.menuFixed = false;
               
            }
        },
        
    },
    
    components: {
        footerBottom,
        navBarC,
        navBarP,
        headerTop,
        Carousel,
        Slide,
        navTitle,
        imgtextItema,
        listLayoutLine,
        listLayoutColumn,
        tabs,
        // tabItem,
        contentCenter
    },
}
</script>
<style>
.header-city-right a{
    color: #ffffff;
}
.demo-carousel img {
    width: 100%;
}
.VueCarousel > div:last-child{
    position: absolute;
    top: 75px;
}
.nine-box-wrapper {
    background: #ffffff;
    padding: 1rem 0; 
}
.nine-box {
    text-align: center;
}
/* .bounce-enter {
    position: absolute;
    left: -1000;
} */

    /* .fade1-enter-active {
        position: absolute;        
        animation: trans 0.5s;
    }
    .fade1-leave-active {
        position: absolute;        
        animation: trans 0.5s reverse;
    }
    @keyframes trans {
        0% {
            transform: translateX(-1000)
        }
        100% {
            transform: translateX(0)
        }
    } */
    /* .fade-enter, .fade-leave-to  {
        position: absolute;
        left: -1000;
    } */
</style>



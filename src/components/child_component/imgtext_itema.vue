<template>
    <div class="imgtext-itema-wrapper" >
        <a :href="info.href">
            <Row>
                <Col><img :src="info.src"></Col>
            </Row>
            <Row>
                <Col :class="getTitleLine" class="bold" :style="options.style.title">{{info.title}}</Col>
            </Row>
            <Row>
                <Col v-show="options.agencyPrice">行内价：<span  class="price" :style="options.style.price">{{info.agencyPrice}}</span></Col>
                <Col v-show="options.marketPrice">零售价：<span  class="price" :style="options.style.price">{{info.marketPrice}}</span></Col>
            </Row>
            <Row  v-show="options.source">
                <Col :style="options.style.source">提供商：{{info.source}}</Col>
            </Row>
        </a>
    </div>
    
</template>

<script>
const _object = require('lodash/fp/object');
export default {
    data () {
        return {
            info: {
                src: require('@/assets/images/demo1.jpg'),
                agencyPrice: '100',
                marketPrice: '200',
                title: '周未2天峨眉山自驾游，无隐含消费全程高速，越野商务车，4人起发',
                source: '成都中旅游公司旅行社'
            },
            options: {
                agencyPrice: true,
                marketPrice: true,
                source: true,
                titleLine: 2,
                style: {}
            }
        }
    },
    props: ['imgtextItema','imgtextOptions'],
    created () {
        this.info = this.imgtextItema;
        this.options = Object.assign(this.options, this.imgtextOptions);
    },
    computed: {
        getTitleLine () {
            return this.options.titleLine == 2 ? 'ellipsis-ftwo' : 'ellipsis-f';
        }
    }
}
</script>

<style scoped>
    /* .imgtext-itema-wrapper {

    } */
    .imgtext-itema-wrapper img {
        width: 100%;
    }
    .price{
        color: #ff8300;
    }

</style>

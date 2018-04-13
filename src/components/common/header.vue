<template>
    <header class="header">
        <Row>
            <Col span="4" v-show="options.isShowLeft">
                <slot v-if="options.noShowDefaultLeft" name="header_left_icon"></slot>
                <a href="javascript:void(0)" v-else @click="historyBack"><Icon type="chevron-left" color="#ffffff" size="20"></Icon></a>
            </Col>
            <Col span="16">
                <slot v-if="options.noShowDefaultCenter" name="header_content"></slot>
                <h1 v-else>{{options.title}}</h1>
            </Col>
            <Col span="4" v-show="options.isShowRight">
                <slot v-if="options.noShowDefaultRight" name="header_right_icon"></slot>
                <Icon v-else type="android-more-vertical" color="#ffffff"  size="20"></Icon>
            </Col>
        </Row>
        <slot name="header_menu"></slot>
    </header>
</template>

<script>
export default {
    data () {
        return {
            options: {
                noShowDefault: false,
                isShowRight: true,
                isShowLeft: true,
                title: '首页'
            }
        }
    },
    props: ['headerOptions'],
    methods: {
        historyBack () {
            this.$router.back()
        }
    },
    created () {
        this.options = Object.assign(this.options, this.headerOptions);
    }
}
</script>





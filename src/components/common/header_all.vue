<template>
    <header class="header">
        <Row>           
            <Col span="20" >
                <Input v-model="formInfo.searchVal" icon="ios-search" placeholder="Enter something..." style="width: 95%;"></Input>
            </Col>
            <Col span="4" class-name="header-city-right">
                <router-link to="">{{defaultCity}} <Icon type="android-arrow-dropdown"></Icon></router-link>
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
                title: '首页'
            },
            formInfo: {
                searchVal: '',
                cityVal: ''
            },
            defaultCity: '成都'
            
        }
    },
    props: ['headerOptions'],
    methods: {
        historyBack () {
            this.$router.back()
        }
    },
    created () {
        this.options = this.headerOptions || this.options;
    }
}
</script>

<style>

.header-city-right a{
    color: #ffffff;
}
</style>




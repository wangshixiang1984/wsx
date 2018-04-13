<template>
    <nav class="navbar">
            <router-link v-for="(item, index) in navConfig" :to="item.url" :key="index" tag="div" active-class="active">                
                <div><Icon :type="item.iconType" size="24"></Icon></div>
                <div>{{item.name}}</div>
            </router-link>
    </nav>
</template>

<script>
export default {
    data () {
        return {
            isNavBarActive: true
        }
    },
    props: ['navConfig']


}
</script>

<style scoped> 
    .navbar {
        display: flex;
        width: 100%;
        justify-content:flex-start;
        align-items: center;    
        background: #fafafa;   
        color: #495060; 
        height: 4.9rem; 
        box-sizing:border-box;   
    }
    .navbar > div {
        width: 100%;
        text-align: center;
        font-size: 1.2rem;
        height: 5rem;
    }
    .active{
        background: #495060;
        color: #ffffff;
       
    }
    /* .navbar a {
        color: #495060; 
        display: block;
        width: 100%;
    }
    .navbar .active a{
        background: #495060;                       
        color: #ffffff;   
    }  */
    .navbar i{
        margin-top: 0.5rem;
    }
</style>

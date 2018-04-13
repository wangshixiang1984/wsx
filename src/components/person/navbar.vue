<template>
    <nav class="navbar">
            <router-link to="/ptrip_center" tag="div" active-class="active">
                <div><Icon type="ios-home" size="24"></Icon></div>
                <div>所有线路</div>
            </router-link>
            <router-link to="/peditpath" tag="div" active-class="active">
                <div><Icon type="ios-settings" size="24"></Icon></div>
                <div>代客报团</div>
            </router-link>
            <router-link to="/fill_infomation/company" tag="div" active-class="active">
                <div><Icon type="ios-settings" size="24"></Icon></div>
                <div>个人中心</div>
            </router-link>
            <router-link to="/fill_infomation/company" tag="div" active-class="active">
                <div><Icon type="ios-person" size="24"></Icon></div>
                <div>个人中心</div>
            </router-link>        
    </nav>
</template>

<script>
export default {
    data () {
        return {
            isNavBarActive: true
        }
    }
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
        height: 5rem; 
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

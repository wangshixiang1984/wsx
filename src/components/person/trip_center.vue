<template>
    <div>
        <transition name="movein">
            <div v-if="isShowPage" class="content no-header">
                <dl>
                    <dt>公司</dt>
                    <dd>旅游线线/所有线路</dd>
                    <dd>发布线路/发布活动</dd>
                    <dd>个人中心</dd>
                    <dd title="邀请加入的个人或者机构进行收人">邀请代理收人</dd>
                    <dd></dd>
                    <dd></dd>
                </dl>
                <dl>
                    <dt>个人</dt>
                    <dd>旅游线路/所有线路</dd>
                    <dd>代理收客/我要甩客/代发游客</dd>
                    <dd>个人中心</dd>
                    <dd></dd>
                    <dd></dd>
                    <dd></dd>
                </dl>
            </div>
        </transition>
        <footer-bottom>
            <nav-bar></nav-bar>
        </footer-bottom>
    </div>
</template>

<script>
import {footerBottom} from './config/componets'
import navBar from './navbar'
export default {
    data () {
        return {
            isShowPage: false
        }
    },
    components: {
        footerBottom,
        navBar
    },

    beforeRouteEnter (to, from, next) {
        next(vm => {               
            vm.$http({
                url: "getCompanyTrip.php"
            })
            .then( res => {
                const data = res.data.data;  
                vm.isShowPage = true;
                if ( data.code === 0 ) {
                    console.log(res)
                } else {
                    throw data.msg
                }
            })
            .catch( err => {
                console.log(err)
            });
            
        });
    }
}
</script>
<style>
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



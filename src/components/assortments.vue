<template>
    <div>
        <transition name="movein">
            <div v-if="isShowPage" class="content no-header">
                这个是主要内容
            </div>
        </transition>
        <footer-bottom>
                <nav-bar></nav-bar>
        </footer-bottom>
    </div>
</template>

<script>
import {footerBottom, navBar} from './config/componets'
export default {
    data () {
        return {
            isShowPage: false
        }
    },

    beforeRouteEnter (to, from, next) {        
        next(vm => {
            vm.$http({
                url: 'getAssortments.php'
            })
            .then( res => {
                const data = res.data.data;
                if ( data.code === 0 ) {
                    console.log(res)
                } else {
                    throw data.msg
                }
            })
            .catch( err => {
                console.log(err)
            });
            vm.isShowPage = true
            
        })
    },
    components: {
        footerBottom,
        navBar
    },
}
</script>


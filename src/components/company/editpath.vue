<template>
<div>
   <transition name="movein"> 
       <div v-if="isShowPage" class="content no-header">
                sdfsdfsf
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
  mounted () {
      this.isShowPage = true
  },
//    beforeRouteEnter (to, from, next) {
//         next(vm => {               
//             vm.$http({
//                 url: "getCompanyTrip.php"
//             })
//             .then( res => {
//                 const data = res.data;  
//                 vm.isShowPage = true;
               
//                 if ( data.code === 0 ) {
//                     console.log(res)
//                 } else {
//                     throw data.msg
//                 }
//             })
//             .catch( err => {
//                 console.log(err)
//             });
            
//         });
//     },
    components: {
        footerBottom,
        navBar
    }
}
</script>


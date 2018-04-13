<template>
<transition name="fade">
  <div class="toast-success" v-if="isShow">
        <div class="toast-panel">
            <Icon type="ios-close-outline" :size="iconSize" :color="iconColor"></Icon>
            <div :style="{ fontSize: textSize+'px', color: iconColor, marginTop: '10px'}">
                {{iconMsg}}
            </div>
        </div>
  </div>
</transition>
</template>
<script>
import comMinx from './share'
export default {
    data () {
        return {
            iconMsg: '错误',
            iconSize: 60, 
            iconColor: '#f00',
            textSize: 16,
            isShow: false
        }
    },
    mixins: [comMinx],
    // props: ["toastConfig"],
    // beforeMount() {
    //         this.setMsg(); 
    // },
    computed: { 
        
    },
    methods: {
        setMsg (toastConfig) {                       
            if (this.isObject(toastConfig) === true)
            {
                this.iconMsg = toastConfig.msg || this.iconMsg;
                this.iconSize = toastConfig.size || this.iconSize;
                this.iconColor = toastConfig.color || this.iconColor;
                this.textSize = toastConfig.textSize || this.textSize;
            }
        },
        show (config) {
            this.setMsg(config)
            this.isShow = true
        },
        hide () {
            this.isShow = false
        },
        toggle (config) {
            const _vue = this
            this.setMsg(config)
            _vue.isShow = true

            setTimeout( () => {
                _vue.isShow = false
            }, config.time || 2000)
        }

    }
}
</script>

<style>

.toast-success{
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    z-index: 9000;  
}
.toast-panel{
    position: relative;
    width: 120px;    
    top: 50%;  
    margin: auto;
    transform: translateY(-50%);
    margin: 0 auto;
    padding: 10px;
    border-radius: 8px;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.8);
    color: #ffffff;
    text-align: center;
}

</style>



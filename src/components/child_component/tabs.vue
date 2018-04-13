<template>
    <div class="tab-menu" >
        <div :class="{'fixed':menuFixed}" class="tab-menu-wrapper">
            <ul class="tab-menu-list"  ref="tabmenu">
                <li v-for="(item,key) in list" :key="key">{{item.label}}</li>           
            </ul>
            <div class="tab-bar" ref="tabbar"></div>
        </div>
        <div class="tab-content-wrapper" ref="tabcontent">
            <div class="tab-content" v-for="(item, key) in lis" :key="key" :class="currentTabIndex == key ? 'tab-active' : 'tab-none'" v-swipeleft="swipeLeft" v-swiperight="swipeRight" v-move="move">
                <list-layout-column :listLayoutColumn="item.list"></list-layout-column>
            </div>
        </div>
    </div>

</template>

<script>
import listLayoutColumn from './list_layout_column'
import vueTouch from './touch'
export default {
    data () {
        return {
            lis: this.list,
            style: '',
            currentTabIndex: 0
        }
    },
    props: ['list', 'tabhight', 'menuFixed', 'cssTextCopy'],
    methods: {
        move (t, e, startTouches) { 
            const startX = startTouches.x;
            const startY = startTouches.y;
			const x = e.changedTouches[0].pageX;
            const y = e.changedTouches[0].pageY;
            //当前tab对象,相邻tab对象
            const currentTabPanel = this.$refs.tabcontent.children[this.currentTabIndex];
            const previosTabPanel = this.$refs.tabcontent.children[this.currentTabIndex - 1];
            const nextTabPanel = this.$refs.tabcontent.children[this.currentTabIndex + 1];
            let isRight = false;
            this.movePositionX = x - startX;
            this.movePositionY = y - startY;
            if ( this.movePositionX > 0) {
                isRight = true;
            }
            if (Math.abs(this.movePositionX) > 10 && Math.abs(this.movePositionX) > Math.abs(this.movePositionY)) {
                if (isRight && this.currentTabIndex > 0) {
                    //右滑
                    // if (this.currentTabIndex - 1 < 0 ) return;
                    previosTabPanel && (previosTabPanel.style.cssText = `
                        display:block;left:-${this.screenWidth}px;
                        transform:translateX(${this.movePositionX}px)`);
                } else if(!isRight && this.currentTabIndex <= this.tabNum -1) {
                    //左滑
                    // console.log(this.tabNum)
                    // console.log(this.currentTabIndex)
                    // if (this.currentTabIndex + 1 >= this.tabNum ) return;
                    nextTabPanel && (nextTabPanel.style.cssText = `                        
                        display:block;left:${this.screenWidth}px;
                        transform:translateX(${this.movePositionX}px)`);
                }
                currentTabPanel.style.cssText = `transform:translateX(${this.movePositionX}px);`;
            }
        },
        swipeLeft (t, e, startTouches) {
            const el = this.$refs.tabcontent;
            // let left = -this.currentTabIndex * this.screenWidth;
            if (Math.abs(this.movePositionX) > 50) {
                if (this.currentTabIndex + 1 >= this.tabNum) {
                    el.children[this.currentTabIndex].style.cssText = `left:0px;`;
                    return;
                } else {
                    // let i = this.currentTabIndex;
                    // console.log(el.children[i])
                    
                    this.currentTabIndex++;                     
                    this.animatePanel('left'); 
                    this.animate();
                }          
                
            } else {
                el.children[this.currentTabIndex+1] && (el.children[this.currentTabIndex+1].style.cssText = `left:0;`);   
                el.children[this.currentTabIndex].style.cssText = `left:0;`; 
            }
        },
        swipeRight (t, e, startTouches) {
            const el = this.$refs.tabcontent;
            let left = -this.currentTabIndex * this.screenWidth; 
            if (Math.abs(this.movePositionX) > 50) {                         
               if (this.currentTabIndex - 1 < 0) {
                    el.children[this.currentTabIndex].style.cssText = `left:0px;`;
                    return;
                } else {
                    this.currentTabIndex--;
                    // left = -this.currentTabIndex * this.screenWidth;
                    // el.children[this.currentTabIndex].style.cssText = `left:${left}px;`;
                    // el.children[this.currentTabIndex + 1].style.cssText = `left:${left}px;`;  
                    this.animatePanel('right'); 
                    this.animate('right');                           
                }         
                
            } else {
                el.children[this.currentTabIndex-1] && (el.children[this.currentTabIndex-1].style.cssText = `left:0px;`);   
                el.children[this.currentTabIndex].style.cssText = `left:0px;`;           
            }
            
        },
        animate (direction = 'left', time = 300) {
            const e = this;
            let step = this.currentTabPos;
            let timer = setInterval(() => {
                if( direction == 'left' && step < this.currentTabPos + e.elWidth ) {
                    e.$refs.tabbar.style.cssText = `width:${e.elWidth}px;left:${step}px;`;    
                    step += Math.floor(e.elWidth / 30);
                } else if (direction == 'right' && step >= this.currentTabPos - e.elWidth) {
                    e.$refs.tabbar.style.cssText = `width:${e.elWidth}px;left:${step}px;`;
                     step -= Math.floor(e.elWidth / 30);
                } else {
                    direction == 'left' ?  e.currentTabPos += e.elWidth : e.currentTabPos -= e.elWidth;
                    clearInterval(timer);
                }
            }, 5)
        },
        animatePanel (direction = 'left') {
            let step = 0;
            let start = 0;
            const e = this;
            start = step = direction == 'left' ?  this.screenWidth + this.movePositionX : this.movePositionX;
            let timer = setInterval( () => {
                const currentPanel = e.$refs.tabcontent.children[this.currentTabIndex]
                const prevPanel = e.$refs.tabcontent.children[this.currentTabIndex - 1];
                const nextPanel = e.$refs.tabcontent.children[this.currentTabIndex + 1];
                if(direction == 'left' && step < 0 || direction == 'right' && step > e.screenWidth) {  
                    direction == 'left' && (prevPanel.style.cssText = '' );
                    direction == 'right' && (nextPanel.style.cssText = '' );
                    clearInterval(timer);
                }   
                if(direction == 'left') {
                    step -= 10 ;
                    prevPanel && (prevPanel.style.cssText = `display:block;left:${step-start}px`);
                    currentPanel.style.left = step + 'px';
                } else {
                    step += 10;
                    nextPanel && (nextPanel.style.cssText = `display:block;left:${step}px`);
                    currentPanel.style.left = (step - this.screenWidth ) + 'px';
                }
                
                                              
            }, 10)
        }
    },
    mounted () {        
        const tabmenu = this.$refs.tabmenu; 
        const tabContent = this.$refs.tabcontent;       
        const screenWidth = window.screen.width;
        //初始化当前tab索引及tab数量
        this.tabbar = this.$refs.tabbar;
        // const tabbar = this.$refs.tabbar;
        // this.currentTabIndex = 0;
        this.tabNum = this.list.length;
        this.screenWidth = screenWidth;
        this.currentTabPos = 0;
        this.elWidth = Math.floor(screenWidth / this.list.length);
        this.tabbar.style.width = this.elWidth +'px';        
        // tabContent.children[0].style.zIndex = 2;
        for(let i=0; i < tabmenu.childElementCount; i++) {
             tabmenu.children[i].style.width = this.elWidth + 'px';
        }
    },
    beforeUpdate () {
        // console.log('before')
    },
    updated () {

        // this.cssTextCopy.forEach( (val, i) => {
        //     obj[i].style.cssText = val;
        // })
        // this.currentTabIndex
        // console.log(this.currentTabIndex)
    },
    directives: {
        "swipeleft": {
            bind:function(el,binding,vnode){
            	new vueTouch(el,binding,"swipeleft",vnode);
            }
        },
        "swiperight": {
            bind:function(el,binding,vnode){
                new vueTouch(el,binding,"swiperight",vnode);
            }
        },
		"move": {
			bind: function(el,binding,vnode) {
				new vueTouch(el,binding,"move",vnode);
			}
        }
       

    },
    components: {
        listLayoutColumn
    }
}
</script>

<style scoped>
    .tab-menu{
        position: relative;
        /* background: #cccccc; */
        /* top: 0;         */
    }
    .tab-menu-list {
        position: relative;
        font-size: 0;
        width: 100%;
        overflow: hidden;
        background: #efefef;
    }
    .tab-menu-wrapper{
        position: fixed;
        width: 100%;
        z-index: 5;
        /* background: #ccc; */
    }
    .tab-menu-list li{
        display: inline-block;
        font-size: 1.4rem;
        text-align: center;
        line-height: 4rem;
    }
    .tab-menu-wrapper{
        position: relative;
    }
    .tab-content-wrapper{
        position: absolute;
        width: 100%;
    }

    .tab-content {
        position: absolute;
        width: 100%;    
        top: 0;
        left: 0;
    }
    .tab-active {
        display: block;
    }
    .tab-none {
        display: none;
    }
    .tab-bar {
        height: 4px;
        background: tomato;
        position: relative;
        margin-top: -4px;
    }
    .fixed{
        position: fixed;
        z-index: 5;
        top: 4.9rem;
    }

</style>


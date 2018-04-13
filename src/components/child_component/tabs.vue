<template>
    <div class="tab-menu">
        <div :class="{'fixed':menuFixed}">
            <ul class="tab-menu-list"  ref="tabmenu">
                <li v-for="(item,key) in list" :key="key">{{item.label}}</li>           
            </ul>
            <div class="tab-bar" ref="tabbar"></div>
        </div>
        <div class="tab-content-wrapper" ref="tabcontent">
            <div class="tab-content" v-for="(item, key) in lis" :key="key" v-swipeleft="swipeLeft" v-swiperight="swipeRight" v-move="move">
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
            const previosTabPanel = this.currentTabIndex - 1 < 0 ? null : this.$refs.tabcontent.children[this.currentTabIndex - 1];
            const nextTabPanel = this.currentTabIndex + 1 > this.tabNum ? null : this.$refs.tabcontent.children[this.currentTabIndex + 1];
            let isRight = false;
            this.movePositionX = x - startX;
            this.movePositionY = y - startY;
            if ( this.movePositionX > 0) {
                isRight = true;                
            }
            if (Math.abs(this.movePositionX) > 10 && Math.abs(this.movePositionX) > Math.abs(this.movePositionY)) {
                if (isRight) {
                    //右滑
                    previosTabPanel && (previosTabPanel.style.cssText = `transform:translateX(${this.movePositionX}px);`);
                } else {
                    //左滑
                    nextTabPanel && (nextTabPanel.style.cssText = `left: ${this.movePositionX}px;`);
                }
                 currentTabPanel.style.cssText = `transform:translateX(${-this.screenWidth*this.currentTabIndex + this.movePositionX}px);`;
            }
        },
        swipeLeft (t, e, startTouches) {
            const el = this.$refs.tabcontent;
            let left = -this.currentTabIndex * this.screenWidth;
            if (Math.abs(this.movePositionX) > 50) {
                if (this.currentTabIndex + 1 >= this.tabNum) {
                    el.children[this.currentTabIndex].style.cssText = `left:${left}px;`;
                    return;
                } else {   
                    this.currentTabIndex++; 
                    left = -this.currentTabIndex * this.screenWidth;
                    el.children[this.currentTabIndex].style.cssText = `left:${left}px;`;           
                    el.children[this.currentTabIndex - 1].style.cssText = `left:${left}px;`;                    
                    this.animate();
                }          
                
            } else {
                el.children[this.currentTabIndex+1].style.cssText = `left:0;`;   
                el.children[this.currentTabIndex].style.cssText = `left:0;`; 
            }
        },
        swipeRight (t, e, startTouches) {
            const el = this.$refs.tabcontent;
            let left = -this.currentTabIndex * this.screenWidth; 
            if (Math.abs(this.movePositionX) > 50) {                         
               if (this.currentTabIndex - 1 < 0) {
                    el.children[this.currentTabIndex].style.cssText = `left:${left}px;`;
                    return;
                } else {
                    this.currentTabIndex--;
                    left = -this.currentTabIndex * this.screenWidth;
                    el.children[this.currentTabIndex].style.cssText = `left:${left}px;`;
                    el.children[this.currentTabIndex + 1].style.cssText = `left:${left}px;`;  
                    this.animate('right');                           
                }         
                
            } else {
                el.children[this.currentTabIndex-1].style.cssText = `left:0px;`;   
                el.children[this.currentTabIndex].style.cssText = `left:0px;`;           
            }
            
        },
        animate (direction = 'left', time = 300) {
            const startPos = this.currentTabPos;
            const endPos = direction == 'left' ? startPos + this.elWidth : startPos - this.elWidth;
            this.currentTabPos = endPos;
            const e = this;
            let step = direction == "left" ? this.currentTabPos - this.elWidth  : this.currentTabPos + this.elWidth;
            let timer = setInterval(() => {
                if (direction == 'left'){                        
                    step += Math.floor(e.elWidth / 30);
                } else {
                    step -= Math.floor(e.elWidth / 30);
                }
                if( direction == 'left' && step <= this.currentTabPos ) {
                    e.$refs.tabbar.style.cssText = `width:${e.elWidth}px;left:${step}px;`;
                } else if (direction == 'right' && step >= this.currentTabPos) {
                    e.$refs.tabbar.style.cssText = `width:${e.elWidth}px;left:${step}px;`;
                } else {
                    clearInterval(timer);
                }
                
            }, 5)
        }
    },
    mounted () {        
        const tabmenu = this.$refs.tabmenu; 
        const tabContent = this.$refs.tabcontent;       
        const screenWidth = window.screen.width;
        //初始化当前tab索引及tab数量
        this.tabbar = this.$refs.tabbar;
        // const tabbar = this.$refs.tabbar;
        this.currentTabIndex = 0;
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
        console.log('before')
    },
    updated () {

        this.cssTextCopy.forEach( (val, i) => {
            obj[i].style.cssText = val;
        })
        console.log(this.cssTextCopy)
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
    .tab-menu-list {
        position: relative;
        font-size: 0;
        width: 100%;
        overflow: hidden;
        background: #fefefe;
    }
    .tab-menu-wrapper{
        position: fixed;
        top: 5rem;
        width: 100%;
        z-index: 5;
    }
    .tab-menu-list li{
        display: inline-block;
        /* position: relative; */
        /* width: 33.33%; */
        /* border: 1px solid #f00; */
        font-size: 1.4rem;
        text-align: center;
        /* height: 3rem; */
        line-height: 3rem;
    }
    .tab-content-wrapper{
        position: absolute;
        overflow-y: auto;
        overflow-x: hidden;
        width: 100%;
        /* height: auto; */
        white-space: nowrap;
    }
    /* .tab-content-wrapper::after{
        content: 'after';
        display:block;
        clear: both;        
    } */
    .tab-content {
        position: relative;
        width: 100%;    
        /* top: 50px; */
		display: inline-block;
        /* border:  1px solid; */
        /* height: 300px; */
    }
    /* .tab-content-wrapper div{
        display: none;
    } */

    .tab-bar {
        height: 4px;
        background: tomato;
        position: relative;

    }
    .fixed{
        position: fixed;
        top: 5rem;
        z-index: 5;
    }
</style>


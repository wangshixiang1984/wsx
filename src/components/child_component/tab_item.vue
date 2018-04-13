<template>
<div>
 	<!-- <ul class="tab-menu-list"> -->
	<!-- <menu> -->
		<li slot="tab_menu" >
			<div class="title"><h1>{{label}}</h1></div>
			<!-- <div v-swipeleft="swipeLeft" v-swiperight="swipeRight" v-move="move" class="tab-content">
				<slot></slot>
			</div> -->
		</li>
	<!-- </menu> -->
 	<!-- </ul> -->
	<!-- <div class="tab-container"> -->
	<!-- <content> -->
		<div class="tab-content" slot="tab_content" :label="label">
			<slot>sdfsdf</slot>
		</div>
	<!-- </content> -->
		<!-- <div class="tab-content"><slot>aaaaa</slot></div>
		<div class="tab-content"><slot>bbbbb</slot></div> -->
	<!-- </div> -->
</div>
</template>

<script>
// import tabs from './tabs'

export default {
    data () {
        return {
			labels: []
        }
    },
	props: ['label'],
    methods: {

	},
	components: {
		// tabs
	}  
}
</script>

<style>
    .tab-content {
        position: absolute;
        width: 100%;
        height: 400px;
        top: 10;
        border: 1px solid;
		
    }
</style>

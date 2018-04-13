function vueTouch(el,binding,type,vnode){
	var _this=this;
	this.obj=el;
	this.binding=binding;
	this.touchType=type;
	this.vueTouches={x:0,y:0};
	this.vueMoves=true;
	this.vueLeave=true;
	this.longTouch=true;
	this.vueCallBack=typeof(binding.value)=="object"?binding.value.fn:binding.value;
	this.obj.addEventListener("touchstart",function(e){    
		_this.start(e);
	},false);
	this.obj.addEventListener("touchend",function(e){
		_this.end(e);
	},false);
	this.obj.addEventListener("touchmove",function(e){
		_this.move(e);
	},false);
    vnode.key = this.randomString()
};
vueTouch.prototype={
	start:function(e){
		let time = new Date().getTime();
		this.vueMoves=true;
		this.vueLeave=true;
		this.longTouch=true;		
		this.vueTouches={x:e.changedTouches[0].pageX,y:e.changedTouches[0].pageY, className: e.target.className};
		// this.touchType=="start"&&this.vueCallBack(this.binding.value, e, this.vueTouches);
	},
	end:function(e){
		var disX=e.changedTouches[0].pageX-this.vueTouches.x;
		var disY=e.changedTouches[0].pageY-this.vueTouches.y;
		if(Math.abs(disX) != 0){
			// this.touchType=="swipe"&&this.vueCallBack(this.binding.value,e);			
			if(disX > 10 && Math.abs(disY) < Math.abs(disX)){
				this.touchType=="swiperight"&&this.vueCallBack(this.binding.value,e, this.vueTouches);
			};
			if(disX < -10 && Math.abs(disY) < Math.abs(disX) ){
				this.touchType=="swipeleft"&&this.vueCallBack(this.binding.value,e, this.vueTouches);
			};			
		}
	},
	move:function(e){
		if( this.touchType == 'move') {
			let x = e.changedTouches[0].pageX;
            let y = e.changedTouches[0].pageY;
			this.vueCallBack(this.binding.value,e, this.vueTouches)
		}
		this.vueMoves=false;
	},
	randomString:function(){
		var len = 10;
	　　 var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
	　　 var maxPos = $chars.length;
	　　 var pwd = '';
	　　 for (var i = 0; i < len; i++) {
			pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
	　　 }
	　　 return pwd;
	}
};

// export {vueTouch};
export default vueTouch
/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-09-10 01:29:33
 * @version $Id$
 */
//图片处理
//图片中间位置
/*
layer.photos({
    photos: '#content_area',
    anim: 5,
    success: function(){
    	var photos_wrapper = $('.layui-layer-photos')[0];
		addScroll(photos_wrapper,imgController);
		//图片原来的大小
		photos_wrapper.initInfo = {
			preWidth: photos_wrapper.clientWidth,
			preHeight: photos_wrapper.clientHeight
		}
    }
})
layer.photos({
	photos: '.content.reply',
	anim: 5,
	success: function(){
		var photos_wrapper = $('.layui-layer-photos')[0];
		addScroll(photos_wrapper,imgController);
		//图片原来的大小
		photos_wrapper.initInfo = {
			preWidth: photos_wrapper.clientWidth,
			preHeight: photos_wrapper.clientHeight
		}
	}
})*/



/*	//dom是一个图片容器
	function imgZoom(dom){
		$(dom).find('img').click(function(){
			var backShadow = document.createElement('div');
			var img_wrapper = document.createElement('div');
			var img = document.createElement('img');
			$(img).attr('class','layer-img-f');
			$(img).attr('src',$(this).attr('src'));
			$(img_wrapper).attr('style','top:50%;left:50%;transform:translate(-50%,-50%)');
			$(img_wrapper).attr('class','layer-wrapper-f').append(img);
			$(backShadow).attr('class','layer-shadow-f').append(img_wrapper);
			addScroll(img_wrapper,imgController);
			$(document.body).append(backShadow);
		})
	}


   	 function imgController(e){
		e = e || window.event;
		var userAgent = navigator.userAgent; 
		var isOpera = userAgent.indexOf("Opera") > -1;

		var addWidth = getAddWidth(e);; //图片缩放正负数
		var direction = 1;//滚动方向 正1为向上
		var width = this.clientWidth+addWidth;
		var incre_width = width - this.initInfo.preWidth;
		console.dir(this.initInfo)
        if(width <= this.initInfo.preWidth || ((incre_width > 0) &&  incre_width > 1000)){
        	return
		}
		var img = $(this).find('img')[0];
		var rate =  img.height/img.width;//图片高和宽比例

		$(this).css('width',width+'px');
		$(this).css('height',(width*rate)+'px');
		
		//如果是360浏览器
		if((window.navigator.mimeTypes[40] || !window.navigator.mimeTypes.length)){
			$(this).style.height = (width*rate)+'px';
		}
		//如果是ie
		else if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
		    $(this).style.height = (width*rate)+'px';
		}else{
			$(this).style = 'height:'+(width*rate)+'px';
		}

		this.fire('center',{
			rate:rate,
			offset: addWidth,
			dom:this
		});
		//this.remove(imgCss.set_center,'center');
 }

	 function getAddWidth(e){
	 	var addWidth;
	 	const STEP = 100; // 图片缩放的增量
		if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件               
            if (e.wheelDelta > 0) { //当滑轮向上滚动时  
                 addWidth = STEP;
            }  
            if (e.wheelDelta < 0) { //当滑轮向下滚动时  
                addWidth = -STEP;
                direction = -1;
            }  
        } else if (e.detail) {  //Firefox滑轮事件  
            if (e.detail> 0) { //当滑轮向下滚动时  
                addWidth = -STEP;
                direction = -1;
            }  
            if (e.detail< 0) { //当滑轮向上滚动时   
                addWidth = STEP;
            }  
        } 
        return addWidth;
	 }


	 //dom: 要放大的dom元素
	function addScroll(dom,fn,fn2){
		dom.style.display = 'none';
		makePublisher(dom)
		dom.on('center',imgCss.set_center)

		//图片原来的大小
		dom.initInfo = {
			preWidth: dom.clientWidth,
			preHeight: dom.clientHeight
		}
		console.dir(dom.clientWidth)
		var isFirefox = navigator.userAgent.indexOf("Firefox") > -1 ;
		var MOUSEWHEEL_EVENT = isFirefox ? "DOMMouseScroll" : "mousewheel";
		if(document.attachEvent){
			dom.onmousewheel = fn
			//dom.attachEvent("on"+MOUSEWHEEL_EVENT,imgController);
		} else if(document.addEventListener){
			dom.addEventListener(MOUSEWHEEL_EVENT,fn,false);
		}	
		//dom.on(imgCss.unset_center,'drawer')//拖动图片时候，取消设置图片水平垂直居中
		//
		$(dom).css('visibility','hidden');
		dom.style.display = 'block';
		$(dom).css('visibility','visible');
	}
	var imgCss = {
		set_center:function (o){
			var domPosition,
			rate = o.rate,
			dom = o.dom,
			offset = o.offset;
			domPosition = dom.getBoundingClientRect();
			dom.style.left = domPosition.left + offset*(-1)/2+'px';
			dom.style.top = domPosition.top + offset*rate*(-1)/2+'px';
		}
	}


	var publisher = {
             subscribers: {
                 any: []         //event type: subscribers
             },
             on: function(type,fn){
                 type = type || 'any';
                 if(typeof this.subscribers[type] === "undefined"){
                     this.subscribers[type] = [];
                 }
                 this.subscribers[type].push(fn);
             },
             remove: function(type,fn){
                 this.visitSubscribers('remove', fn, type);
             },
             fire: function(type,args){
                 this.visitSubscribers('fire',args,type);
             },
             visitSubscribers:function(action,arg,type){
                 var pubtype = type ||'any',
                     subscribers = this.subscribers[pubtype],
                     i,
                     max = subscribers.length;
                 for(i=0;i<max;i++){
                     if(action == "fire"){
                         subscribers[i](arg);
                     } else {
                         if(subscribers[i] === arg){
                             subscribers.splice(i,1);
                         }
                     }
                 }
             }
         };
         //定义一个函数makePublisher()，它接受一个对象作为对象，通过把上述通用发布者的方法复制到该对象中，从而将其转换为一个发布者
         function makePublisher(o){
             var i;
             for(i in publisher) {
                 if(publisher.hasOwnProperty(i) && typeof publisher[i] === "function"){
                     o[i] = publisher[i];
                 }
             }
             o.subscribers = {any: []};
         }



*/



//图片缩放的多种不同实现方式
var ImgZoomStrage = {
	mediator:null
	,
	zoomA: function(){

	},
	zoomB: function(){
		console.log('zoomB')
	}
}



//中心对象   browserType表示浏览器类型
var ImgMediator = {
	strategy: 'zoomA',
	obj:{
		img: ImgObject,
		strategy: ImgZoomStrage
	},
	init: function(options){
		this.setup(options.obj);
		this.setImgCfg(options.dom);
		this.setStrategy(options.strategy)
	},
	setup:function(obj){
		var i;
		// use jquery
		this.obj = $.extend(this.obj,obj);
		this.obj.img.mediator = this;
		this.obj.strategy.mediator = this;
	},
	setImgCfg: function(dom){
		var target = this.obj.img;
		var bounding =  this.getBoundingRect(dom);
		target.dom = dom;
		target.preWidth = bounding.width;
		target.preHeight = bounding.height;
	},
	setStrategy: function(strategy){
		strategy  = strategy || this.strategy;
		this.strategy = strategy ;
	}
	,
	getBoundingRect: function(dom){
		return {
			width: dom.clientWidth,
			height: dom.clientHeight
		}
	},
	registerEvent: function(eventName){
		var target = this.obj.img;
		eventName = GlobalState.browserType == 'firebox' ? eventName : 'on'+eventName;
		target.registerEvent(eventName);
	},
	unRegisterEvent: function(eventName){
		var target = this.obj.img;
		eventName = GlobalState.browserType == 'firebox' ? eventName : 'on'+eventName;
		target.unRegisterEvent(eventName);
	},
	onmousewheel: function(){
		var strategy = this.obj.strategy;
		strategy[this.strategy]();
	},
	mounting: function(dom,options){
		$(dom).find('img').click(function(){
			var backShadow = document.createElement('div');
			var img_wrapper = document.createElement('div');
			var img = document.createElement('img');
			$(img).attr('class','layer-img-f');
			$(img).attr('src',$(this).attr('src'));
			$(img_wrapper).attr('style','top:50%;left:50%;transform:translate(-50%,-50%)');
			$(img_wrapper).attr('class','layer-wrapper-f').append(img);
			$(backShadow).attr('class','layer-shadow-f').append(img_wrapper);
			$(document.body).append(backShadow);

			var options = {
				dom: img_wrapper,
				obj:{
					img: ImgObject,
					strategy: ImgZoomStrage
				},
				strategy:'zoomA'
			}
			this.init(options);
		})
	}

}
//全局状态
var GlobalState = {
	browserType: (function(){
		var userAgent = navigator.userAgent; 
		var isOpera = userAgent.indexOf("Opera") > -1;
		
		if(navigator.userAgent.indexOf("Firefox") > -1){
			return 'firebox';
		}		//如果是ie
		if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
		   	return 'ie';
		}//如果是360浏览器
		if((window.navigator.mimeTypes[40] || !window.navigator.mimeTypes.length)){
			return '360';
		}
			return 'chrome';
	})()
}

//图片对象
var ImgObject = {
	dom:'',
	currentWidth: -1,
	currentHeight: -1,
	preWidth: -1,
	preHeight: -1,
	mediator:null,	
	registerEvent: function(eventName){
		var temp = eventName.split('on');
		console.log(temp)
		this.dom[eventName] = this['on'+temp[temp.length-1]].bind(this);
	},
	unRegisterEvent: function(eventName){
		this.dom[eventName] = null
	},
	zoom:function(eventType){
		this.mediator.event[eventType](this);
	},
	onmousewheel: function(){
		this.mediator.onmousewheel();
	},
}


function imgZoom(dom){
		$(dom).find('img').click(function(){
			var backShadow = document.createElement('div');
			var img_wrapper = document.createElement('div');
			var img = document.createElement('img');
			$(img).attr('class','layer-img-f');
			$(img).attr('src',$(this).attr('src'));
			$(img_wrapper).attr('style','top:50%;left:50%;transform:translate(-50%,-50%)');
			$(img_wrapper).attr('class','layer-wrapper-f').append(img);
			$(backShadow).attr('class','layer-shadow-f').append(img_wrapper);
			addScroll(img_wrapper,imgController);
			$(document.body).append(backShadow);
		})
	}







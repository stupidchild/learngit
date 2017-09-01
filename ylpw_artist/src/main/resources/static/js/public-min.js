/*
 * jQuery public-min v0.3
 * Copyright (c) 2012-07-25 19:17 lijin & Jensen
 * 说明：全站通用JS
 */

	var ie  = $.browser.msie;
	var ie6 = $.browser.msie && $.browser.version < 7;
	var ie7 = $.browser.msie && $.browser.version == 7;
	var ie8 = $.browser.msie && $.browser.version == 8;
    
	
	/* 'Hello, {0} ! '.format('world');  */
	String.prototype.format = function(){ 
	   var s = this, length = arguments.length; 
	   while (--length >= 0)  s = s.replace(new RegExp('\\{' + length + '\\}', 'g'), arguments[length]);
	   return s; 
	};
	
	//去除左右边空格
	function Trim(s){   
		return s.replace(/(^\s*)|(\s*$)/g,"");
	}
	
	//数组是否包含某个字符串
	var contains = function(a,b){
		if(a.length != undefined){
			for(var i = 0,k = a.length; i < k; i++){	//k放前面计算长度，js效率
				if(a[i] == b) return true;
			}
		}
		return false;
	};
	
	//通用tab选项卡
	var tabChanges = function(params){
		var opts = $.extend({
			parentId: params.parentId,                     //选项卡parent id或class
			childId: params.childId,                       //内容展示child id或class
			chooseClass: params.chooseClass || 'select'    // 选中的CLASS  	child class
		},params);
		$(opts.parentId).children().siblings().click(function(){
			var num = $(this).index();   //取得点击节点的下标数
			$(opts.parentId).children().siblings().removeClass().eq(num).addClass(opts.chooseClass);
			$(opts.childId).hide().eq(num).show();
		});
	};
	
	//通用tab选项卡1    选项卡li里面包含a里面选中样式的时候
	var tabChanges1 = function(params){
		var opts = $.extend({
			parentId: params.parentId,                     //选项卡parent id或class
			childId: params.childId,                       //内容展示child id或class
			chooseClass: params.chooseClass || 'select'    // 选中的CLASS  	child class
		},params);
		$(opts.parentId).children().siblings().click(function(){
			var num = $(this).index();   //取得点击节点的下标数
			$(opts.parentId).children().siblings().find('a').removeClass().eq(num).addClass(opts.chooseClass);
			$(opts.childId).hide().eq(num).show();
		});
	};
	
	/** 时间计时通用函数 */
	function timeRun(func,delay){
	    var timeId = window.setInterval(function(){
			if(!func()){
				window.clearInterval(timeId);
			};
		},delay);
	}
	
	/*Number.prototype.toFixed = function(pos){
	   var p = pos || 2; //必须是数字或浮点数，默认精确2位  
	   return Math.round(Number(this)*Math.pow(10,p))/Math.pow(10,p);  
	}*/   
	
	/*
	 * 节点滑过下拉显示效果  
	 * @param 滑动的class节点
	 * @param 显示的节点
	 * 调用方法： slideShow({
					   hoveNode: '.tpbx',
					   showNode: '#htbxBox1'
				  });
	 */ 
	var slideShow = function(params){
		opts = $.extend({
			hoveNode: params.hoveNode,
			showNode: params.showNode
		},params);
		var sd = opts.showNode;
		$(sd).css({position:'absolute'});
		$(opts.hoveNode).hover(function(){
			var fonsSizes = parseInt($(this).css('fontSize').replace('px','')),
			    offsets = $(this).offset(),     
			    lookOffsetLeft = offsets.left + parseInt($(this).css('padding-left').replace('px','')),
			    lookOffsetTop = offsets.top + fonsSizes + 8;    //加上字的行高
			$(sd).css({left:lookOffsetLeft,top:lookOffsetTop});
			$(sd).show();
		},function(){
			$(sd).hide();
		});
		$(opts.showNode).mouseleave(function(){
			$(sd).hide();
		});
	};
	
	var clickShow = function(params){
		opts = $.extend({
			hoveNode: params.hoveNode,
			showNode: params.showNode
		},params);
		var sd = opts.showNode;
		$(sd).css({position:'absolute'});
		$(opts.hoveNode).click(function(){
			var fonsSizes = parseInt($(this).css('fontSize').replace('px','')),
			    offsets = $(this).offset(),     
			    lookOffsetLeft = offsets.left + parseInt($(this).css('padding-left').replace('px','')),
			    lookOffsetTop = offsets.top + fonsSizes + 8;    //加上字的行高
			$(sd).css({left:lookOffsetLeft,top:lookOffsetTop});
			$(sd).show();
		});
		//$(opts.showNode).mouseleave(function(){
			//$(sd).hide();
		//});
	};

	var setShow = function(params){
		opts = $.extend({
			hoveNode: params.hoveNode,
			showNode: params.showNode
		},params);
		var sd = opts.showNode;
		$(sd).css({position:'absolute'});
		var fonsSizes = parseInt($(opts.hoveNode).css('fontSize').replace('px','')),
		    offsets = $(opts.hoveNode).offset(),     
		    lookOffsetLeft = offsets.left,
		    lookOffsetTop = offsets.top + fonsSizes + 10;    //加上字的行高
		$(sd).css({left:lookOffsetLeft,top:lookOffsetTop});
		$(sd).show();
	};
    
	//下面显示的父节点的有paddding属性时候去掉
	var setShowNew = function(params){
		opts = $.extend({
			hoveNode: params.hoveNode,
			showNode: params.showNode,
			topHeight: params.topHeight,
			leftWidht: params.leftWidht
		},params);
		var sd = opts.showNode;
		$(sd).css({position:'absolute'});
		var fonsSizes = parseInt($(opts.hoveNode).css('fontSize').replace('px','')),
		    offsets = $(opts.hoveNode).offset(),     
		    lookOffsetTop = opts.topHeight + fonsSizes + 5;    //加上字的行高
		if(opts.leftWidht){
			var lookOffsetLeft = opts.leftWidht + parseInt($(opts.hoveNode).css('padding-left').replace('px',''));
		}else{
			var lookOffsetLeft = offsets.left + parseInt($(opts.hoveNode).css('padding-left').replace('px',''));
		}
		$(sd).css({left:lookOffsetLeft,top:lookOffsetTop});
		$(sd).show();
	};

$(function() {
    
	//原理是判断鼠标的坐标，超出下拉的区域的高度的时候，点击了隐藏
	var listDownX = 0;    //登陆注册下拉的高度+ 顶部导航条的高度
	listDownY = $('#panel').height() + 37;
	$('body').click(function(e){
		var pointY = e.pageY;
		if(pointY > listDownY){
			$("#panel").slideUp(200);
		}
	});
	
    $('#sort .list').hover(function(){
    	$(".list .item").removeClass().addClass('item');
    },function(){
    	if(ie6){$('#sort .outbox').hide();};
        $('.list').hide();
    })
    
    $(".list .item").live({
	   mouseenter:
	   function(){
		   $(".list .item").removeClass("menu-item-onhover");
		   if(ie6) $('#sort .outbox').hide();
		   $(this).addClass("menu-item-onhover");
		   if(ie6) $(this).find('.outbox').show();
	   },
	   mouseleave:
	   function(){
		   $(this).removeClass("menu-item-onhover");
		   if(ie6) $('#sort .outbox').hide();
	   }
	});
    
    //导航弹出
    $("#sort .sort-title").hover(function() {
        $(".list").fadeIn("fast");
        $(".list .item").removeClass().addClass('item');
        if(ie6){$('#sort .outbox').hide();} 
    });   
    
	//切换城市
	$(".index_city").hover(function() {
		$(this).children("ul").show();
		$(".change-city").addClass("change-city-hover");
		},
	function() {
		$(this).children("ul").hide();
		$(".change-city").removeClass("change-city-hover");

	});
	
	//ie6下的input文本框的样式统一修复
	if(ie6){
		$('input[type=text]').css({'border':'1px solid #dfdfdf'});
		$('input[type=password]').css({'border':'1px solid #dfdfdf'});
		$('input[type=text]').each(function(){
			if($(this).hasClass('noborder')){
				$(this).css('border','0 none');
			}
		});
	};
	
	//锚点滑动
    $.fn.mailTo = function(){
		return this.each(function(){
			$(this).click(function(){
				$("html,body").animate({
					scrollTop: 0
				},{
					duration: 100,    //动画时长
					easing: "swing"    //擦除效果
				});
				return false;
			});
		});
	};
	
	//通用ajax列表选项卡
    AjaxtabChanges = function(params,fun){
		var opts = $.extend({
			parentId: params.parentId,                     //选项卡parent id或class
			childId: params.childId,                       //内容展示child id或class
			chooseClass: params.chooseClass || 'select',   //选中的CLASS  	child class
			event  : params.event || 'click',			   //绑定的事件
			url    : params.url,		   				   //请求地址
			//请求参数
			param  : $.trim(params.param)!=''?$.param(params.param): "d="+$.now
		},params);
		$(opts.parentId).children().siblings().bind(opts.event,function(){
			var num = $(this).index();   //取得点击节点的下标数
			var $refresh = $(this).attr("refresh"); //用来判断是否已经刷新过（防止每次点击刷新列表）
			$.ajax({
	            type: "GET",
	            url: opts.url,
	            data: {
	                url: "?" + $.param(opts.param)
	            },
	            success: function(obj) {
	            	fun(obj);
	            },
	            dataType: "json",
	            statusCode: {
	                404 : function() {
	                    alert("没有找到该页面.");
	                },
	                500 : function() {
	                    alert("服务器错误.");
	                }
	            }
	        });
			$(opts.parentId).children().siblings().removeClass().eq(num).addClass(opts.chooseClass);
			$(opts.childId).hide().eq(num).show();
		});
	};
    
});
	
	//去除IE6滑动时候闪动的BUG
	if(ie6)  document.execCommand("BackgroundImageCache", false, true);

	/* 字符串模板处理 */
	var result;
	function $template(html, start, end){
		try{
			if (typeof start != "string") start = "<#";
		    if (typeof end != "string") end = "#>";
		    var jsStart = String.fromCharCode(12);
		    var jsOut = jsStart + "=";
		    var startRegExp = new RegExp(start, "g");
		    var splitRegExp = new RegExp(start+"|"+end, "g");
			var template = html.replace(startRegExp, start + jsStart);
			var lines = template.split(splitRegExp);
		    var js = "var out = new Array();";
		    for (var lineNumber = 0; lineNumber < lines.length; lineNumber++) {
		      var line = lines[lineNumber];
		      if (line.indexOf(jsOut) == 0) {
		        line = line.substr(2);
		        js += " out.push(" + line + " ); \n";
		      } else if (line.indexOf(jsStart) == 0) {
		        line = line.substr(1);
		        js += "\n" + line + "\n";
		      } else {
		        line = line.replace(/'/g, "\\'").replace(/\r|\n/g, " ");
		        js += " out.push('" + line + "'); \n";
		      }
		    }
		    js += " out.join(''); ";
		    return eval(js);
		}catch(e){}
	}
	
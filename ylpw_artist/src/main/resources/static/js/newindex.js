/*
 * jQuery newindex v0.1
 * Copyright (c) 2012-04-17 17:02 Jensen
 * 说明：城市首页效果
 */

var ie  = $.browser.msie;
var ie6 = $.browser.msie && $.browser.version < 7;

(function($){
	
	/* tab切换，自动播放*/
	 tabChanges = function(params){
	 	var opts = $.extend({
	 		scrollId: params.scrollId,   //滑动字体父节点
	 		scrollPageId: params.scrollPageId || false,    //分页的父节点
	 		autoPlay: params.autoPlay || true,    //是否自动播放
	 		speed: params.speed || 5   //播放速度/秒
	 	},params)
	 	var len = $(opts.scrollId + ' li').length;
	 	var s = -1;
	 	var _scrollObj;
	 	$(opts.scrollId + ' li').hide().eq(0).show();
	 	$(opts.scrollPageId + ' li').click(function(){
	 		var nub = $(this).index();
	 		if(!$(this).hasClass('selected')){
	 			$(opts.scrollPageId + ' li').removeClass('selected');
	 			$(this).addClass('selected');
	 		}
	 		$(opts.scrollId + ' li').hide().eq(nub).show();
	 		s = 0;
	 		if(opts.autoPlay){slide(nub)};
	 	})
	 	if(opts.autoPlay){     //判断是否自动播放
	 		var slide = function(j){
		 		s += j;
		 		if(s >= len){
		 			s = 0;
		 		}
		 		$(opts.scrollId + ' li').hide().eq(s).show();
		 		$(opts.scrollPageId + ' li').removeClass().eq(s).addClass('selected');
		 	}
		 	var play = function(){
		 		_scrollObj = setInterval(function(){
		 			slide(1);
		 		},opts.speed*1000)
		 	}
		 	var stop = function(){
		 		clearInterval(_scrollObj);
		 	}
		 	$(opts.scrollId+' li').bind('mouseover',function(){stop()});
		 	$(opts.scrollId+' li').bind('mouseout',function(){play()});
		 	$(opts.scrollPageId+' li').bind('mouseover',function(){stop()});
		 	$(opts.scrollPageId+' li').bind('mouseout',function(){play()});
		 	
		 	play();
	 	}
	 }
	 
	 /*tab切换，菜单选择position定位,自动播放*/
	 tabSortChanges = function(params){ 
	 	var opts = $.extend({
	 		scrollId: params.scrollId,   //滑动模块父节点
	 		scrollPageId: params.scrollPageId || false,    //分页的父节点
	 		backId: params.backId || false,    //定位的背景块节点
	 		autoPlay: params.autoPlay || true,    //是否自动播放
	 		speed: params.speed || 5   //播放速度/秒
	 	},params)
	 	var len = $(opts.scrollId).length;
	 	var s = -1;
	 	var _scrollObj;
	 	var rvClassName = opts.backId.replace('.','');
	 	$(opts.scrollId).hide().eq(0).show();
	 	$(opts.scrollPageId + ' li').click(function(){
	 		var nub = $(this).index();
	 		if(!$(this).hasClass('select')){
	 			$(opts.scrollPageId + ' li').removeClass('select');
	 			$(this).addClass('select');
	 		}
	 		for(var i = 1, j = len; i <= j; i++){
	 			$(opts.backId).removeClass(rvClassName + '-pos' + i);
	 		}
	 		$(opts.scrollPageId + ' li').removeClass('select').eq(nub).addClass('select');
	 		$(opts.backId).addClass(rvClassName + '-pos' + (nub+1));
	 		$(opts.scrollId).hide().eq(nub).show();
	 		s = 0;
	 		if(opts.autoPlay){slide(nub)};
	 	})
	 	var slide = function(j){
	 		s += j;
	 		if(s >= len){
	 			s = 0;
	 		}
	 		$(opts.scrollId).hide().eq(s).show();
	 		for(var i = 1, j = len; i <= j; i++){
	 			$(opts.backId).removeClass(rvClassName + '-pos' + i);
	 		}
	 		$(opts.scrollPageId + ' li').removeClass('select').eq(s).addClass('select');
	 		$(opts.backId).addClass(rvClassName + '-pos' + (s+1));
	 	}
	 	if(opts.autoPlay){     //判断是否自动播放
		 	var play = function(){
		 		_scrollObj = setInterval(function(){
		 			slide(1);
		 		},opts.speed*1000)
		 	}
		 	var stop = function(){
		 		clearInterval(_scrollObj);
		 	}
		 	$(opts.scrollId).bind('mouseover',function(){stop()});
		 	$(opts.scrollId).bind('mouseout',function(){play()});
		 	$(opts.scrollPageId+' li').bind('mouseover',function(){stop()});
		 	$(opts.scrollPageId+' li').bind('mouseout',function(){play()});
		 	
		 	play();
	 	}
	 }
	 
	 /* 图片轮换效果一无限左右移动切换(无线循环) ,无分页显示*/
	 picsScrolling = function(params){ 
	 	var opts = $.extend({
	 		scrollId: params.scrollId,   //滑动字体父节点
	 		childeId: params.childeId,   //滑动字体父节点
	 		showNumberId: params.childeId,   //滑动字体父节点
	 		lMoveId: params.lMoveId,    //左边切换按钮
	 		rMoveId: params.rMoveId,    //右边切换按钮
	 		autoPlay: params.autoPlay || true,    //是否自动播放
	 		speed: params.speed || 300   //播放速度/秒
	 	},params)
	 	var len = $(opts.scrollId + ' '+ opts.childeId).length;
	 	var wid = $(opts.scrollId + ' '+ opts.childeId).width();
	 	var _scrollTimeObj;
		var s = 0;     //记录自动播放时的页数
		$(opts.scrollId + ' '+ opts.childeId).each(function(i){
			$(this).attr('rel',i);
		})
	 	$(opts.lMoveId).click(function(){    //左边按钮效果
	 		pageTo(-1);
	 	});
	 	$(opts.rMoveId).click(function(){    //右边按钮效果
	 		pageTo(1);
	 	});
	 	var pageTo = function(n){    //分页自动切换样式显示
			if($(opts.scrollId).is(":animated")==false){
				s += n;
				if(s != -1 && s != len){    //向右滑动
					$(opts.scrollId).animate({'marginLeft':-wid*s+'px'},opts.speed*100);
					var rel = $(opts.scrollId + ' '+ opts.childeId).eq(s).attr('rel');
					showNum(rel);
				}else if(s == -1){   //向左滑动
					s = len-1;
					for(var i=len-1;i>0;i--){
						$(opts.scrollId + ' '+ opts.childeId).eq(len-1).prependTo($(opts.scrollId));
					}
					$(opts.scrollId).css({'marginLeft':-wid*s+'px'});
					$(opts.scrollId).animate({'marginLeft':-wid*(s-1)+'px'},opts.speed*100);
					s = len-1-1; 
					var rel = $(opts.scrollId + ' '+ opts.childeId).eq(s).attr('rel');
					showNum(rel);
				}else if(s == len){    //向左滑动到最大值时转变
					s = 1;    //修复s的值
					$(opts.scrollId).css({'marginLeft':0+'px'});    //将列表图片滑动到初始位置
					for(var i=len-1;i>0;i--){    //将列表图片位置按图片rel切换0 1 2 3 （3为当前显示的图片） ==>3 0 1 2 （3为当前显示的图片）
						$(opts.scrollId).append($(opts.scrollId + ' '+ opts.childeId).eq(0));
					}
					$(opts.scrollId).animate({'marginLeft':-wid+'px'},opts.speed*100);
					var rel = $(opts.scrollId + ' '+ opts.childeId).eq(s).attr('rel');
					showNum(rel);
			    }
			}
		}
		var showNum = function(j){
			var showNub = parseInt(j) + 1 + '/' + len + '';
			$(opts.showNumberId).html(showNub);
		}
 		var play = function(){    //播放
			_scrollTimeObj = setInterval(function(){
				pageTo(1)
			},opts.speed*1000)
		};
		var stop = function(){    //停止
			clearInterval(_scrollTimeObj)
		}
		if(opts.autoPlay){play()};  //是否自动播放
	 	$(opts.lMoveId).bind('mouseover',function(){stop()});
	 	$(opts.lMoveId).bind('mouseout',function(){play()});
	 	$(opts.rMoveId).bind('mouseover',function(){stop()});
	 	$(opts.rMoveId).bind('mouseout',function(){play()});
	 	$(opts.scrollId + ' '+ opts.childeId).bind('mouseover',function(){stop()});
	 	$(opts.scrollId + ' '+ opts.childeId).bind('mouseout',function(){play()});
	 }
	 
	 /* 图片轮换效果一无限左右移动切换(无线循环) ,右下角同步数字显示张数并左右翻页*/
	 picsPageScrolling = function(params){ 
	 	var opts = $.extend({
	 		scrollId: params.scrollId,   //滑动字体父节点
	 		lMoveId: params.lMoveId,    //左边切换按钮
	 		rMoveId: params.rMoveId,    //右边切换按钮
	 		autoPlay: params.autoPlay || true,    //是否自动播放
	 		speed: params.speed || 3,   //播放速度/秒
	 		contBomLeft: params.contBomLeft,      //右下角向左节点
	 		contBomRight: params.contBomRight,      //右下角向右节点
	 		showNumberId: params.showNumberId      //分页的数字显示
	 	},params)
	 	var len = $(opts.scrollId+' li').length;
	 	var wid = $(opts.scrollId+' li').width();
	 	var _scrollTimeObj;
		var s = 0;     //记录自动播放时的页数
		$('#newx-pics').hover(function() {
			$(opts.lMoveId).show();
			$(opts.rMoveId).show();
		}, function() {
			$(opts.lMoveId).hide();
			$(opts.rMoveId).hide();
		});
		$(opts.scrollId+' li').each(function(i){
			$(this).attr('rel',i);
		})
	 	$(opts.lMoveId).click(function(){    //左边按钮效果
	 		pageTo(-1);
	 	});
	 	$(opts.contBomLeft).click(function(){    //右下角左边按钮效果
	 		pageTo(-1);
	 	});
	 	$(opts.rMoveId).click(function(){    //右边按钮效果
	 		pageTo(1);
	 	});
	 	$(opts.contBomRight).click(function(){    //右下角右边按钮效果
	 		pageTo(1);
	 	});
	 	var pageTo = function(n){    //分页自动切换样式显示
			if($(opts.scrollId).is(":animated")==false){
				s += n;
				if(s != -1 && s != len){    //向右滑动
					$(opts.scrollId).animate({'marginLeft':-wid*s+'px'},opts.speed*100);
					var rel = $(opts.scrollId+' li').eq(s).attr('rel');
					showNum(rel);
				}else if(s == -1){   //向左滑动
					s = len-1;
					for(var i=len-1;i>0;i--){
						$(opts.scrollId+' li:last').prependTo($(opts.scrollId));
					}
					$(opts.scrollId).css({'marginLeft':-wid*s+'px'});
					$(opts.scrollId).animate({'marginLeft':-wid*(s-1)+'px'},opts.speed*100);
					s = len-1-1; 
					var rel = $(opts.scrollId+' li').eq(s).attr('rel');
					showNum(rel);
				}else if(s == len){    //向左滑动到最大值时转变
					s = 1;    //修复s的值
					$(opts.scrollId).css({'marginLeft':0+'px'});    //将列表图片滑动到初始位置
					for(var i=len-1;i>0;i--){    //将列表图片位置按图片rel切换0 1 2 3 （3为当前显示的图片） ==>3 0 1 2 （3为当前显示的图片）
						$(opts.scrollId).append($(opts.scrollId+' li:first'));
					}
					$(opts.scrollId).animate({'marginLeft':-wid+'px'},opts.speed*100);
					var rel = $(opts.scrollId+' li').eq(s).attr('rel');
					showNum(rel);
			    }
			}
		}
		var showNum = function(j){
			var showNub = parseInt(j) + 1 + '/' + len + '';
			$(opts.showNumberId).html(showNub);
		}
 		var play = function(){    //播放
			_scrollTimeObj = setInterval(function(){
				pageTo(1)
			},opts.speed*1000)
		};
		var stop = function(){    //停止
			clearInterval(_scrollTimeObj)
		}
		if(opts.autoPlay){play()};  //是否自动播放
	 	$(opts.lMoveId).bind('mouseover',function(){stop()});
	 	$(opts.lMoveId).bind('mouseout',function(){play()});
	 	$(opts.rMoveId).bind('mouseover',function(){stop()});
	 	$(opts.rMoveId).bind('mouseout',function(){play()});
	 	$(opts.scrollId+' li').bind('mouseover',function(){stop()});
	 	$(opts.scrollId+' li').bind('mouseout',function(){play()});
	 	$(opts.contBomLeft).bind('mouseover',function(){stop()});
	 	$(opts.contBomLeft).bind('mouseout',function(){play()});
	 	$(opts.contBomRight).bind('mouseover',function(){stop()});
	 	$(opts.contBomRight).bind('mouseout',function(){play()});
	 }
	 
	 
})(jQuery)

    //初始化日期
	var timer = new Date().toLocaleString(),
		time = new Date(),
		ty = time.getFullYear(),
		tm = time.getMonth()+1,
		td = time.getDate(),
		th = time.getHours(),
		tmis = time.getMilliseconds(),
	    tmi,ts,tw,ws,weekday,mtt,wseng,todayNub,tmnub;
	
	if(th < 10) th = ''+'0'+ th;
	tmnub = tm;
	if(tm < 10) tm = '' + '0' + tm;
    tmi = time.getMinutes();
	if(tmi < 10) tmi = '' + '0' + tmi;
    ts = time.getSeconds();
	if(ts < 10) ts = ''+'0'+ ts;
	tw = time.getDay();
	ws = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
	weekday = ws[tw];  //获取当日星期几
	wseng = ['SUN 日','MON 一','TUE 二','WED 三','THU 四','FRI 五','SAT 六'];
	mtt = ['Jan.','Feb.','Mar.','Apr.','May.','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.'];
	monthEng = mtt[time.getMonth()];
	
	var getTimer = {
		localeTime: timer,      //获取中国标准时间
		time:         time,     //获取时间
		year:         ty,       //获取年
		month:        tm,       //获取月01
		monthnub:     tmnub,     //获取月1
		monthEng:     monthEng, //获取月
		date:         td,       //获取日
		hour:         th,       //获取小时
		minute:       tmi,      //获取分
		second:       ts,       //获取秒
		millisecond:  tmis,     //获取毫秒
		week:         weekday,  //获取周
		
		isLeapYear: function(t){    //判断是否闰年
			var s = t % 4&&t % 100 || t%400;
			if(s){
				return "非闰年";
			}else{
				return "闰年";
			}  
		}
	}
	
	/*
	 * 	获得指定日期的星期数
	 *	@j 日
	 */
	var oneweekNub = getWeek(getTimer.year,getTimer.monthnub,1);
	var weekdayEng = function(j){
		var tw = time.getDay();
		var td = time.getDate();
		var tt = Math.abs(j - 1);
		var nub = tt + oneweekNub;
        if(nub == 7){
        	nub = 0;
        }else if(nub > 7){
        	nub = nub % 7;
        }		
		return wseng[nub];
	}


	 /*
	 * 	获得指定日期的星期数，1-6为星期一到星期六，0为星期天
	 *	@y 年份
	 *	@m 月份
	 *	@d 日
	 */
	function getWeek(y, m, d) {
		var _int = parseInt,
			c = _int(y/100);
		y = y.toString().substring(2, 4);
		y = _int(y, 10);
		if(m === 1) {
			m = 13;
			y--;
		} else if(m === 2) {
			m = 14;
			y--;
		};
	 
		var w = y + _int(y/4) + _int(c/4) - 2*c + _int(26*(m+1)/10) + d - 1;
		w = w%7;
	 
		return w >= 0 ? w : w+7;
	}
 

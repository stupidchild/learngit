/*
 * jQuery product v0.1
 * Copyright (c) 2014-05-26 09:00 Jensen
 * 说明：商品页效果集合
 */

var ie  = $.browser.msie;
var ie6 = $.browser.msie && $.browser.version < 7;

if(ie6) document.execCommand("BackgroundImageCache",false,true);

//阻止冒泡事件
stopEvent = function(e){    
	e = e || window.event;
	if(e.stopPropagation){
		e.stopPropagation(); 
	}else{
		e.cancelBubble = true;  
	}
	if(e.preventDefault){
		e.preventDefault();
	}else{
		e.returnValue = false;  //阻止Event返回值
	}
};

//闪购滑动
$('.selt-tit').hover(function(){
	var _rel = $(this).attr('rel');
	$('.selt-tit').each(function() {
	    $('.selt-tit').css({'width':'206px','background-position':'-120px 0'});
	});
	$(this).css({'width':'223px','background-position':'-120px -30px'});
	$('.city').hide().eq(_rel).show();
	$('.newx-pics-rightbom').hide();    //兼容IE7，6下右下角切换隐藏
});

//划过后隐藏
$('.city').mouseleave(function(){
	$(this).hide();
	$('.selt-tit').css({'width':'206px','background-position':'-120px 0'});
	$('.newx-pics-rightbom').show();
});

$('.fsale-bd').mouseleave(function(){
	$('.city').hide();
	$('.selt-tit').css({'width':'206px','background-position':'-120px 0'});
	$('.newx-pics-rightbom').show();
});

//城市标签点击切换
$('#JcityNav li a').click(function(){
	$('#JcityNav li a').removeClass();
	$(this).addClass('on');
});

//城市区域点击切换
$('#JareaNav li a').click(function(){
	$('#JareaNav li a').removeClass();
	$(this).addClass('on');
	//点击区域加载影院
	var url = $("#findMVenByAreaAndFilmAjax").val();
	var filmno = $("#runId").val();
	var areano = $(this).attr("value");
	var filmVens = "";
	$.ajax({
		type:"get",
		url:url,
		data:{filmno:filmno,areano:areano},
		dataType:"json",
		jsonp: "callback",
		success:function(data){
			filmVens += "<ul>"
			$(data).each(function(i,item){
				filmVens += '<li><a href="javascript:void(0);" onclick="changeVen('+item["CINEMANOSEQ"]+',\''+item["VNAME"]+'\');" title='+item["VNAME"]+' venue='+item["CINEMANOSEQ"]+'>'+item["VNAME"]+'</a></li>'
			});
			filmVens += "</ul>"
			$("#Jvenue").html(filmVens);
			$("#Jvenue").show();
		},
		error:function(){
			alert("连接超时！");
		}
		});
});
//城市标签点击切换
function changeVen(mvenid,vname){
	if(mvenid&&vname){
		//点击之后，将影院名称放到已选择影院并关闭选择浮层
		$("#JfilmBoxb").html(vname);
		$("#Jcityb").hide();
		var url = $("#findDateByFilmAndMVenAjax").val();
		var filmno = $("#runId").val();
		var filmDates = "";
		$.ajax({
			type:"get",
			url:url,
			data:{filmno:filmno,mVenId:mvenid},
			dataType:"json",
			jsonp: "callback",
			success:function(data){
				$(data).each(function(i,item){
					if(i == 0){
						
						filmDates += '<li onclick="javascript:changePlay('+mvenid+',\''+item["SHOWDATE"]+'\');" play='+item["SHOWDATE"]+' class="on"> <a href="javascript:void(0);">'+item["SHOWDATE"]+'</a> </li>'
					}else{
						filmDates += '<li onclick="javascript:changePlay('+mvenid+',\''+item["SHOWDATE"]+'\');" play='+item["SHOWDATE"]+' > <a href="javascript:void(0);">'+item["SHOWDATE"]+'</a> </li>'
					}
				});
				$("#JfilmbDate").html(filmDates);
				$("#JfilmbDate").find('li:first').click();
			},
			error:function(){
				alert("连接超时！");
			}
		});	
	}
}
//场次日期点击切换
function changePlay(mvenid,showdate){
	if(mvenid&&showdate){
		//点亮被选中的日期
		$('#JfilmbDate li').removeClass();
		$('*[play='+showdate+']').addClass('on');
		var url = $("#findPlayByFilmDateAndMVenAjax").val();
		var filmno = $("#runId").val();
		var contextPath = $("#contextPath").val();
		var filmPlays = "";
		$.ajax({
			type:"get",
			url:url,
			data:{filmno:filmno,mVenId:mvenid,showDate:showdate},
			dataType:"json",
			jsonp: "callback",
			success:function(data){
				filmPlays +='<table><tbody><tr><th width="120">放映时间</th><th width="90">语言</th><th width="100">放映类型</th><th width="180">放映厅</th><th width="80">票价</th><th width="">购票</th></tr>';
				$(data).each(function(i,item){
					filmPlays += '<tr>';
					filmPlays += '<td><strong>'+item["SHOWTIME"]+'</strong></td><td>'+item["LANGUAGE"]+'</td>';
					filmPlays += '<td>'+item["SHOWTYPE"]+'</td><td>'+item["HALLNAME"]+'</td>';
					filmPlays += '<td class="red">￥'+item["SALEPRICE"]+'</td>';
					filmPlays += '<td><a href='+contextPath+'/filmSeat?seqno='+item["SEQNO"]+'  target="_blank" class="btn-filmb-seat"></a></td>';
					filmPlays += '</tr>';
				});
				filmPlays +='</tbody></table>';
				$("#filmPlay").html(filmPlays);
				$("#filmPlay").show();
			},
			error:function(){
				alert("连接超时！");
			}
		});	
	}
}


//区域标签左右移动
var navNum = 0;
var seeNum = 7;
var scrollNum = $('#JareaNav li').length;
var overNum = parseInt(scrollNum - seeNum);
$('#JcityAbc .next').click(function(){
	if($('#JareaNav').is(":animated")==false){
		navNum += 1;
		if(navNum >= overNum){
			navNum =overNum;
			$('#JcityAbc .next').css('background-position','-40px -85px');    //右侧的按钮变灰不可点
		};
		$('#JareaNav').animate({'marginLeft':-70*navNum+'px'},200);
		$('#JcityAbc .prev').css('background-position','-80px -85px');    //左侧的按钮变蓝可点
	};
});

$('#JcityAbc .prev').click(function(){
	if($('#JareaNav').is(":animated")==false){
		navNum -= 1;
	    if(navNum <= 0){
	    	navNum =0;
	    	$('#JcityAbc .prev').css('background-position','-40px -60px');    //左侧的按钮变灰不可点
	    };
	    $('#JareaNav').animate({'marginLeft':-70*navNum+'px'},200);
	    $('#JcityAbc .next').css('background-position','-80px -60px');    //右侧的按钮变蓝可点
	};
});

//电影点击切换
$('#JfilmName li').click(function(){
	$('#JfilmName li').removeClass();
	$(this).addClass('on');
});

//电影场次日期切换
$('#JcqNav li').click(function(){
	$('#JcqNav li').removeClass();
	$(this).addClass('on');
});

//正在上映切换
var nowNum = 3;
var _waitHtml = '<div class=\"iwait\"><img src="../../static/css/loading.gif" /></div>';
$('#JnowPlay .next').click(function(){
	var _n = $('#JnowPlay').find('.red').html();
	_n = parseInt(_n) + 1;
	if(_n >= laterNum){
		_n =laterNum;
		$(this).css('background-position','-40px -20px');
	};
	$('#JnowPlay .prev').css('background-position','0 -20px');
	$('#JnowPlay').find('.red').html(_n);
	$('#JhotAll').html(_waitHtml);
});

$('#JnowPlay .prev').click(function(){
	var _n = $('#JnowPlay').find('.red').html();
	_n = parseInt(_n) - 1;
	if(_n <= 1){
		_n =1;
		$(this).css('background-position','0 0');
	};
	$('#JnowPlay .next').css('background-position','-40px 0');
	$('#JnowPlay').find('.red').html(_n);
});

//即将上映切换
var laterNum = 3;
var _waitHtml2 = '<div class=\"iwait2\"><img src="../../static/css/loading.gif" /></div>';
$('#JlaterShow .next').click(function(){
	var maxNum = $("#maxNum").text()*1;
	var currentNo = $("#pageNum").text()*1;

	
	//当前页是最后一页，不进行任何操作
	if(currentNo>=maxNum){
		return false;
	}
	currentNo = currentNo+1;
	$("#pageNum").text(currentNo);
	
	if(currentNo>1){
		$("#JlaterShow .prev").css("background-position","0 -20px");
	}
	if(currentNo>=maxNum){
		$("#JlaterShow .next").css("background-position","-40px -20px");
	}
	var pageSize = 4;
	var comingHtml ="";
	var cityId = $('#cityId').val();
	var contextPath = $("#contextPath").val();
	var url =  contextPath+"/getComingFilms";
	var imgPath = $("#imgPath").val();
	$.ajax({
		data:{page:currentNo-1},
//		data:{page:currentNo-1,size:pageSize,sort:['firstshowdate','runid']},
		type:"get",
		traditional :true,
		url:url,
		dataType:"json",
		jsonp: "callback",
		success:function(data){
			$(data.content).each(function(i,item){
				console.log(item);
				comingHtml+= '<dl class="hot-dl">';
				comingHtml+= '<dt><a href="'+contextPath+'/ylfilm-'+item["runid"]+'.html?city='+cityId+'"><img src='+imgPath+item["frontImgLocal"]+' alt="" width="150" height="200"/></a></dt>';
				comingHtml+= '<dd><a href="javascript:void(0);" class="blue" title="" >'+item["filmname"]+'</a></dd>';
				comingHtml+= '<dd>'+getMyDate(item["firstshowdate"])+'上映</dd>';
				comingHtml+= '</dl>';	
			});
			
			$("#JlaterAll").html(comingHtml);
		},
		error:function(e){
			console.log(e);
			alert("查询异常");
		}
		});
});

$('#JlaterShow .prev').click(function(){
	var maxNum = $("#maxNum").text()*1;
	var currentNo = $("#pageNum").text()*1;
	//当前页是第一页，不进行任何操作
	if(currentNo==1){
		return false;
	}
	currentNo = currentNo-1;
	$("#pageNum").text(currentNo);
	
	if(currentNo<=1){
		$("#JlaterShow .prev").css("background-position","0 0");
	}
	if(currentNo<=maxNum){
		$("#JlaterShow .next").css("background-position","-40px 0");
	}
	
	var pageSize = 4;
	var comingHtml ="";
	var cityId = $('#cityId').val();
	var contextPath = $("#contextPath").val();
	var url =  contextPath+"/getComingFilms";
	var imgPath = $("#imgPath").val();
//	var url = "/movieAjax/findComingFilmList";
	$.ajax({
		data:{page:currentNo-1},
//		data:{page:currentNo-1,size:pageSize,sort:['firstshowdate','runid']},
		type:"get",
		traditional :true,
		url:url,
		dataType:"json",
		jsonp: "callback",
		success:function(data){
			$(data.content).each(function(i,item){
				comingHtml+= '<dl class="hot-dl">';
				comingHtml+= '<dt><a href="'+contextPath+'/ylfilm-'+item["runid"]+'.html?city='+cityId+'"><img src='+imgPath+item["frontImgLocal"]+' alt="" width="150" height="200"/></a></dt>';
				comingHtml+= '<dd><a href="javascript:void(0);" class="blue" title="" >'+item["filmname"]+'</a></dd>';
				comingHtml+= '<dd>'+getMyDate(item["firstshowdate"])+'上映</dd>';
				comingHtml+= '</dl>';	
			});
			
			$("#JlaterAll").html(comingHtml);
		},
		error:function(){

		}
		});
});
//毫秒数转日期
function getMyDate(str){  
    var oDate = new Date(str);   
    oYear = oDate.getFullYear();   
    oMonth = oDate.getMonth()+1;   
    oDay = oDate.getDate();
    oTime = oYear +'-'+ oMonth +'-'+ oDay;
    return oTime;  
};


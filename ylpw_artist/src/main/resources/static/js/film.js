
var ie  = $.browser.msie;
var ie6 = $.browser.msie && $.browser.version < 7;

if(ie6) document.execCommand("BackgroundImageCache",false,true);

//选择城市滑动
$('#JfilmBoxa').hover(function(){
	if($('#Jcitya').css('display') == 'block') return false;
	$('.city').hide();
	$('#Jcitya').show(300);
	$(this).css('background-color','#fff').addClass('filmb-up');
},function(){
	$(this).css('background-color','#ebf5f6');
});

//点击城市选择
$('#Jcitya .city-u a,#Jcitya .city-mr a').click(function(){
	var _html = $(this).html();
	$('#JfilmBoxa').html(_html);
});

//选择影院滑动
$('#JfilmBoxb').hover(function(){
	if($('#Jcityb').css('display') == 'block') return false;
	$('.city').hide();
	$('#Jcityb').show(300);
	$(this).css('background-color','#fff').addClass('filmb-up');
},function(){
	$(this).css('background-color','#ebf5f6');
});

//点击影片选择
$('#Jcityb .city-u a,#Jcityb .city-mr a').click(function(){
	var _html = $(this).html();
	$('#JfilmBoxb').html(_html);
});


$('.city').click(function() {
    stopEvent();
});

$('.city').mouseleave(function() {
    $('#JfilmBoxa,#JfilmBoxb').removeClass('filmb-up');
});

//点击空白区域关闭下拉框
$(document).click(function(){
	$('.city').hide('fast');
	$('#JfilmBoxa,#JfilmBoxb').removeClass('filmb-up');
});

//排期购票等滑动后下面的下拉框隐藏
$('#JfilmbNavs li').hover(function(){
	$('.city').hide('fast');
	$('#JfilmBoxa,#JfilmBoxb').removeClass('filmb-up');
});


//排期购票选项卡
tabChanges1({
	parentId: '#JfilmbNavs',
	childId: '.filmb-cont',
	chooseClass: 'on'
});
//影院区域选项卡
tabChanges1({
	parentId: '#JareaNav',
	childId: '.city-mr',
	chooseClass: 'on'
});

//固定导航菜单到最顶部
var scrollFixed = function(params){ 
 	var opts = $.extend({
 		scrollParent: params.scrollParent,     //滑动节点最外层的父节点
 		scrollChild: params.scrollChild        //滑动节点
 	},params)
 	
 	$(opts.scrollParent).css({'position':'relative','z-index':'4800'});    
 	var bomHeight = $(opts.scrollChild).offset().top;
 	var winHeight = $(window).height();
 	//滚动超出范围后浮动
    $(window).scroll(function(){
    	var leftWid = $(opts.scrollParent).offset().left;
    	var scrollHeight = $(document).scrollTop();
	    if(scrollHeight > bomHeight){
	    	if(!ie6){
	    		$(opts.scrollChild).css({'position':'fixed','top':'0','z-index':'4600','left':leftWid+1});
	    	}else{
	    		$(opts.scrollChild).css({'position':'absolute','top':scrollHeight-bomHeight,'z-index':'4600','left':'1px'});
	    	}
	    	$(opts.scrollParent).css('padding-top','50px');
	    }else{
	    	if(ie6 )$(opts.scrollChild).hide();
	    	$(opts.scrollChild).css('position','static');
	    	$(opts.scrollParent).css('padding-top','0');
	    	if(ie6 )$(opts.scrollChild).show();
	    }
    });
    //点击菜单定位显示下面对应的显示项
    $(opts.scrollChild+' li').click(function(){
		var scrollHeight = $(document).scrollTop();
		if(scrollHeight > bomHeight){	   //滚动条移动到切换标签的时候
			if(ie6) $(opts.scrollChild).hide();    //ie6下BUG清除,先隐藏后显示,点击标签选中的色块会偏移
			$(document).scrollTop(bomHeight-1);
			if(ie6) $(opts.scrollChild).show();
		}
	});
};

$(function(){
   //排期购票等标签固定到头部
   scrollFixed({
       scrollParent: '#JfilmbBody',
       scrollChild: '#JfilmbNavAll'
   });

});


//在线问答选择
$('#replyBody').click(function(){
	 getComment(1,"all"); //初始加载第一页数据
});

//全部问答
$('#allReply').click(function(){
	$("#allReply").attr("class","blue");
	$("#myReply").attr("class","");
	getComment(1,"all"); //初始加载第一页数据
});
//我的问答
$('#myReply').click(function(){
	//获取问答用户信息
	var url ="http://www.228.com.cn/ajax/getUserInfoFact";
	$.post(url,function(data){
		if(data && data.status && data != ''){
			$("#myReply").attr("class","blue");
			$("#allReply").attr("class","");
			getComment(1,"my"); //初始加载第一页数据			
		}else{
			location.href = "http://www.228.com.cn/auth/login?redirectUrl="+location.href;
		}
	});		
	
});


//提交问答
$('#filmReplyBtn').click(function(){
	var name = $("#replyName").text();
	var info = $("#askInfo").val();
	var filmNo = $("#runId").val();
	if(info == "" || info == null || info == undefined){
		$("#filmReplyMsg").html("请输入您的问题！")
		$("#filmReplyMsg").show();
		return;
	}else{
		$("#filmReplyMsg").hide();
		var url = $("#addFilmReply").val()+"?info="+info+"&filmNo="+filmNo+"&name="+name;
		$.ajax({
			type:"post",
			url:url,
			dataType:"json",
			jsonp: "callback",
			success:function(data){
				if(data.flag == 0){
					window.location.reload();
				}else{
					$("#filmReplyMsg").html(data.msg)
					$("#filmReplyMsg").show();
					return;
				}
			},
			error:function(){
				alert("提交失败！请稍后重试！");
			}
		});
	}
});










	
	

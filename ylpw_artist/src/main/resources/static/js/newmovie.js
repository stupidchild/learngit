    
    $(function(){
		$(".conter-con").width(($(".conter-con li").width()+36)*$(".conter-con li").length);
		$(".forthcoming ul").width(($(".forthcoming ul li").width()+24)*$(".forthcoming ul li").length);
		$(".cinema-l dl dd").eq(0).css("border-top","1px solid #ebebeb");
		
		/*城市选择*/
		for(var i=0;i<$(".city-set dl dd").length;i++){
			$(".city-set dl dd").eq(i*4-1).css("margin-right","0");
		}
		
		$(".movie-city").hover(function(){
			$(this).find(".switch").toggleClass("active");
			$(this).find(".city-set").toggle();
		})
		/*城市选择*/
		/*首页滚动*/
		var  Lilen=$(".conter-con li").length;
		for(var i=0;i< Math.ceil(Lilen/6);i++){
			$(".control").append("<b></b>");
		}
		
		$(".control b").eq(0).addClass("active");
		var LiWh=($(".conter-con li").width()+28)*6;


		var n=0;
		$(".control b").click(function(){
			var index=$(this).index();
			$(this).addClass("active").siblings().removeClass("active");
			$(".conter-con").animate({"margin-left":-LiWh*index+"px"},1000);
			n=index;
		});
		$(".conter-ban").on("click",".clickleft",function(){
			n-=1;
			if(n<=0){
				n=0;
			}
			
			$(".control b").eq(n).addClass("active").siblings().removeClass("active")
			$(".conter-con").animate({"margin-left":-LiWh*n+"px"},1000)
		})	
		$(".conter-ban").on("click",".clickright",function(){
			n+=1;
			
			if(n>=(Math.ceil(Lilen/6)-1)){
				n=(Math.ceil(Lilen/6)-1);
			}
			$(".control b").eq(n).addClass("active").siblings().removeClass("active")
			$(".conter-con").animate({"margin-left":-LiWh*n+"px"},1000)
		})
		
		
		
		$(".cinema-lbtn,#filmVenList li a").click(function(){
			$(".cinema").hide()
			$(".film-cocntent").show();
		});
		$(".selection-mode ol li").eq(0).click(function(){
			 $(".film-cocntent").eq(0).show().siblings(".film-cocntent").hide();
		})
		
		
		
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
		var cityId = $("#cityId").val();
		findAreaByCity(cityId);
		
	})


//影院选择页面点击购买
function toMovieByVenue(cinemanoseq,cityId,areaId,vname){
	findmoviebyvenues(cinemanoseq,cityId,areaId,vname);
	findAreaByCity(cityId,areaId);
}
//根据影院获取影片信息
function findmoviebyvenues(cinemanoseq,cityId,areaId,vname){
	$("#JfilmBoxb").html(vname);
	$("#Jcityb").hide();
	if(cinemanoseq){
		var contextPath = $("#contextPath").val();
		var imgPath = $("#imgPath").val();
		var url = contextPath+"/getMProductplayByCinemano";
		$.ajax({
			type:"get",
			url:url,
			data:{cinemanoseq:cinemanoseq},
			dataType:"json",
			jsonp: "callback",
			success:function(data){
				var filmDates = "";
				$(data).each(function(i,item){
					filmDates += "<li>";
					filmDates += "<a class='details' href='"+contextPath+"/ylfilm-"+item.RUNID+".html?city="+cityId+"&cinema="+cinemanoseq+"' >";
					//filmDates +="<img src='"+item.FRONTIMGLOCAL+"' alt=''/></a>";
					filmDates +="<img src='"+imgPath+item.FRONTIMGLOCAL+"' alt=''/></a>";
					filmDates += "<p>"+item.FILMNAME+" </p>";
					filmDates += "<p>";
					filmDates += "<i class='myxin'><i class='myxinn2' style='width:"+(item.AVERAGEDEGREE*10+3)+"%'></i></i>";
					filmDates += "<i>"+item.AVERAGEDEGREE+"</i>";		
					filmDates += "</p>";
					filmDates += "<p><a href='"+contextPath+"/ylfilm-"+item.RUNID+".html?city="+cityId+"&cinema="+cinemanoseq+"' >购买</a></p>";
					filmDates += "</li>";
				});
				$(".conter-cons").html("");
				$(".conter-cons").html(filmDates);
				
				$(".conter-cons").width(($(".conter-cons li").width()+36)*data.length);
				var LiWhs=($(".conter-cons li").width()+28)*6;
				var s=0;
				$(".conter-ban").on("click",".clickrights",function(){
					s++;
					if(s>=(Math.ceil(data.length/6)-1)){
						s=(Math.ceil(data.length/6)-1);
					}
					$(".conter-cons").animate({"margin-left":-LiWhs*s+"px"},1000)
				})
				$(".conter-ban").on("click",".clicklefts",function(){
					s-=1;
					if(s<=0){
						s=0;
					}
					$(".conter-cons").animate({"margin-left":-LiWhs*s+"px"},1000)
				})	
				
			},
			error:function(){
				console.log("获取影片信息失败！");
			}
		});	
	}
}

function findAreaByCity(cityId,areaId){
	$.ajax({
		type:"get",
		url:$("#contextPath").val()+"/findAreaByCity",
		data:{cityId:cityId},
		dataType:"json",
		jsonp: "callback",
		success:function(data){
			var filmDates = "";
			var navNum = 0;
			var area = areaId;
			$(data).each(function(i,item){
				filmDates += "<li>";
				filmDates += "<a href='javascript:void(0);' onclick='findVenueByArea("+item.AREAID+","+cityId+");' class='areaId_"+item.AREAID;
				if(i==0){
					area=item.AREAID;
				}else if(areaId==item.AREAID){
					navNum=i;
					area=item.AREAID;
				}
				filmDates += "' >"+item.NAME+"</a>";
				filmDates += "</li>";
			});
			$("#JareaNavs").html("");
			$("#JareaNavs").html(filmDates);
			//区域标签左右移动
			findVenueByArea(area,cityId);
			var seeNum = 7;
			var scrollNum = data.length;
			var overNum =parseInt(scrollNum - seeNum);
			$('#JcityAbcs .next').click(function(){
				if($('#JareaNavs').is(":animated")==false){
					navNum += 1;
					if(navNum >= overNum){
						navNum =overNum;
						$('#JcityAbcs .next').css('background-position','-40px -85px');    //右侧的按钮变灰不可点
					};
					$('#JareaNavs').animate({'marginLeft':-70*navNum+'px'},200);
					$('#JcityAbcs .prev').css('background-position','-80px -85px');    //左侧的按钮变蓝可点
				};
			});
			
			$('#JcityAbcs .prev').click(function(){
				if($('#JareaNavs').is(":animated")==false){
					navNum -= 1;
				    if(navNum <= 0){
				    	navNum =0;
				    	$('#JcityAbcs .prev').css('background-position','-40px -60px');    //左侧的按钮变灰不可点
				    };
				    $('#JareaNavs').animate({'marginLeft':-70*navNum+'px'},200);
				    $('#JcityAbcs .next').css('background-position','-80px -60px');    //右侧的按钮变蓝可点
				};
			});
			$('#JcityAbcs .prev').click();

			
		},
		error:function(){
			console.log("查询区域失败！");
		}
	});	
}
function findVenueByArea(areaId,cityId){
	$("#JareaNavs").find('.on').removeClass('on');
	$("#JareaNavs").find('.areaId_'+areaId).addClass('on');
	$.ajax({
		type:"get",
		url:$("#contextPath").val()+"/findVenueByArea",
		data:{areaId:areaId},
		dataType:"json",
		jsonp: "callback",
		success:function(data){
			var filmDates = "";
			$(data).each(function(i,item){
				filmDates += "<li>";
				filmDates += "<a href='javascript:void(0);' onclick='findmoviebyvenues("+item.CINEMANOSEQ+","+cityId+","+item.areaId+",\""+item.VNAME+"\");' title='' venue='"+item.CINEMANOSEQ+"'>"+item.VNAME+"</a>";
				filmDates += "</li>";
			});
			$("#filmVenList").html("");
			$("#filmVenList").html(filmDates);

			$(".cinema-lbtn,#filmVenList li a").click(function(){
				$(".cinema").hide()
				$(".film-cocntent").show();
			});
		},
		error:function(){
			console.log("根据区域查询影院失败！");
		}
	});	
}
function findVenueByCinemanoseq(cinemanoseq,cityId){
	$.ajax({
		type:"get",
		url:$("#contextPath").val()+"/findVenueByCinemanoseq",
		data:{cinemanoseq:cinemanoseq},
		dataType:"json",
		jsonp: "callback",
		success:function(data){
			var filmDates = "";
			$(data).each(function(i,item){
				filmDates += "<li>";
				filmDates += "<a href='javascript:void(0);' onclick='findmoviebyvenues("+item.CINEMANOSEQ+","+cityId+","+item.areaId+",\""+item.VNAME+"\");' title='' venue='"+item.CINEMANOSEQ+"'>"+item.VNAME+"</a>";
				filmDates += "</li>";
			});
			$("#filmVenList").html("");
			$("#filmVenList").html(filmDates);
		},
		error:function(){
			console.log("根据区域查询影院连接失败！");
		}
	});	
}

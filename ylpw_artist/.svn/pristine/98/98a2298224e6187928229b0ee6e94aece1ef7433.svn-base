//----------------------------选择银行-------------------------------------------//
$("input[name='bank']").click(function(){
	$(".payNew-btn-gopay-no").hide();
	$(".payNew-btn").show();
})
//提交支付
$(".payNew-btn").click(function(){
	$("#quickPayForm").submit();
})	
function unClick(){
	$('.payNew-btn').unbind("click");
}
/** 时间计时通用函数 */
function timeRun(func,delay){
    var timeId = window.setInterval(function(){
		if(!func()){
			window.clearInterval(timeId);
		};
	},delay);
}
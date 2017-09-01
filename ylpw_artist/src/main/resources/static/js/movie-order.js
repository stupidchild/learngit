	//-----------------------------------验证手机方法------------//
	function validatePhone(phone){
		var phoneFlag = 0;//设置手机验证标识
		var phoneVal = phone;
		var ph_re = /^[1][3-8]\d{9}$|^([5|6|9])\d{7}$|^[0][9]\d{8}$|^[6]([8|6])\d{5}$/;//验证手机正则表达式
		if($.trim(phoneVal)==""){//非空
			phoneFlag = 1;
    	}
		else if(!ph_re.test(phone)){
			phoneFlag = 2;
		}
		return phoneFlag;
	}	
$(function(){
	//验证是否勾选服务条款
	$("#iAgreeClause").click(function(){
		if($(this).attr("checked") == undefined){
			$("#orderSureError").show();
			$("#errorMsg").html("暂不能提交订单！请同意服务条款。")
		}else if($(this).attr("checked") == "checked"){
			$("#orderSureError").hide();
			$("#errorMsg").html("")
		}
	});
	//---------------电影票验证凭证手机（失去焦点）---------------//
    $("#movieMobile").blur(function(){
    	var movieMobileFlag = validatePhone(this.value);
    	if(movieMobileFlag == 1){
    		$('#mobileTip').html("<span id='mobileTip' class='red'>手机号码不能为空!</span>");
    		return false;
    	}else if(movieMobileFlag == 2){
    		$('#mobileTip').html("<span id='mobileTip' class='red'>手机号码不正确!</span>");
    		return false;
    	}else{
    		$('#mobileTip').html('');
    	}   	
    	
    })	
    //---------------电影票提交订单---------------//
	$("#MovieOrdereSubmit").click(function(){
		//验证是否勾选服务条款
		if($("#iAgreeClause").attr("checked") == undefined){
			$("#orderSureError").show();
			$("#errorMsg").html("暂不能提交订单！请同意服务条款。")
			return false;
		}
		//判断接受凭证的手机号格式
		var movieMobile = $("#movieMobile").val();
		var movieMobileFlag = validatePhone(movieMobile);
		//手机号非空验证
		if(movieMobileFlag == 1){
			$('#mobileTip').html("<span id='mobileTip' class='red'>手机号码不能为空!</span>");
			//$("#orderSureError").show();
			return false;
		//手机号格式验证
		}else if(movieMobileFlag == 2){
			//$("#orderSureError").show();
			$('#mobileTip').html("<span id='mobileTip' class='red'>手机号码不正确!</span>");
			return false;
		}else{
			//格式无误，提交表单，生成订单
			$("#quickBuyForm").submit();
		} 
		});	
});


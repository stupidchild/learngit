// avalon2是一款基于虚拟DOM与属性劫持的 迷你、 易用、 高性能的前端MVVM框架，拥有超优秀的兼容性, 支持移动开发, 后端渲染, WEB Component式组件开发, 无需编译, 开箱即用。
// 地址：http://avalonjs.coding.me/home.html
var vm = avalon.define({
    $id: "app",
    max_select_num:{},
    seat_data:[],
    selectedSeats: [],
    max_col: 0,
    dragging: false,
    draggable: false,
    clickSeat: function(seat) {
        vm.dragging = false;
        if( seat.st === '1' &&((vm.selectedSeats.length + 1) > vm.max_select_num) && !seat.selected) {
            alert('最多可以选' + vm.max_select_num + '个座位！');
            return false;
        }
        if (seat.st === '1') {
            seat.selected = !seat.selected;
        }
        if ( seat.selected ) {
            vm.selectedSeats.push(seat);
        } else {
            for (var i = (vm.selectedSeats.length - 1); i >= 0 ; i--) {
                if ( seat.name === vm.selectedSeats[i].name ) {
                    vm.selectedSeats.splice(i,1);
                    break;
                }
            }
        }
    },
    mousedown: function(e) {
        e && e.preventDefault();
        if(vm.draggable) {
            vm.dragging = true;
        }
    },
    click: function(e) {
        vm.dragging = false;
    },
    mouseup: function(e) {
        vm.dragging = false;
    },
    mousemove: function(e) {
        if( vm.dragging && vm.draggable) {
            vm.drag(e);
        }
    },
    mouseleave: function(e) {
        vm.dragging = false;
    },
    drag: function(e) {
        var scrollLeft = $('.scroll-area').scrollLeft();
        if(scrollLeft >  0 || scrollLeft < (vm.max_col * 30 - 600)){
            $('.scroll-area').scrollLeft( scrollLeft - e.movementX * 1.6);
        }else{
            vm.dragging = false;
        }
    },
    submit: function() {
    	if(vm.selectedSeats.length == 0){
    		alert("请选择座位!");
    		return false;
    	}
    	var seatinfo = "";
    	var seatinfocn = "";
    	for (var int = 0; int < vm.selectedSeats.length; int++) {
    		if(int == 0){
    			seatinfo+=vm.selectedSeats[int].sno;
        		seatinfocn+=vm.selectedSeats[int].name;
    		}else{
    			seatinfo+= "|"+vm.selectedSeats[int].sno;
        		seatinfocn+="|"+vm.selectedSeats[int].name;    			
    		}
    		
		}
    	$("#seatinfo").val(seatinfo);
    	$("#seatinfocn").val(seatinfocn);
    	$("#filmToBuyForm").submit();
    }
});
$(function() {
    jQuery.extend( jQuery.easing,
    {
        easeInOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        }
    });
    var seqid = $("#seqno").val();
    if(seqid){
        $.ajax({
            url: $("#getSeat").val()+'?seqid='+seqid,
            dataType: "json",
            async: false,
            cache: true,
            success: function(data) {
            	if(data.data){
                    vm.max_select_num = data.max_select_num;
                    vm.seat_data = processSeatData(data.data);
                    if( vm.max_col*30 > 640 ) {
                        setTimeout(function() {
                            $('.scroll-area').animate({scrollLeft: ( vm.max_col * 30 - 640)/2  +'px'}, 2000, 'easeInOutBack', function() {
                                vm.draggable = true;
                            });
                        },1000);
                    }            		
            	}else{
            		//错误提示
            		alert(data.errorMsg);
            	}

            }
        });   	
    }

});
var processSeatData = function(data) {
    var seats = data;
    for (var i = 0; i < seats.length; i++) {
        var row = seats[i].col;
        for (var j = 0; j < row.length; j++) {
            var seat = row[j];
            seat.name = seats[i].row + '排' + (parseInt(seat.cid) >= 10? parseInt(seat.cid):'0' + parseInt(seat.cid))+ '座';
            if (parseInt(seat.cid) > vm.max_col) {
                vm.max_col= parseInt(seat.cid)
            }
            if (seat.st === 1) {
                seat.selected = false;
            }
        }
    }
    return seats;
}


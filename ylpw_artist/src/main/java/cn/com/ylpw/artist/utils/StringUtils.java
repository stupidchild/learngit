package cn.com.ylpw.artist.utils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.UUID;


public class StringUtils {
    public static boolean isNullString(String s) {
        return s == null || "".equals(s.trim());
    }


    /**
     * 身份证号码转换，15位转18位，18位转15位
     * @param id        身份证号码
     * @return String   转换后的号码
     */
    public static String convertSfzmhm(String id){
        if(StringUtils.isNullString(id)){
            return "";
        }
        if(id.length() == 18){
            return eighteenToFifteen(id);
        }else if(id.length() == 15){
            return fifteenToEighteen(id);
        }else{
            return "";
        }
    }
    /**
     * 15位身份证转为18位身份证
     *
     * @param id 15位身份证
     * @return 18位身份证
     */
    public static String fifteenToEighteen(String id) {

        if (id == null || id.length() != 15) {
            return "";
        }
        String strResult = "";
        int w[] = new int[18];
        int ll_sum = 0;
        int ll_i;
        String ls_check = "";
        StringBuffer SBIDCARD = new StringBuffer(id.substring(0, 6));
        SBIDCARD.append("19");
        SBIDCARD.append(id.substring(6, 15));
        String strIDCARD = new String(SBIDCARD);
        //========================================================//
        w[1] = 7;
        w[2] = 9;
        w[3] = 10;
        w[4] = 5;
        w[5] = 8;
        w[6] = 4;
        w[7] = 2;
        w[8] = 1;
        w[9] = 6;
        w[10] = 3;
        w[11] = 7;
        w[12] = 9;
        w[13] = 10;
        w[14] = 5;
        w[15] = 8;
        w[16] = 4;
        w[17] = 2;
        //=========================================================//
        for (ll_i = 1; ll_i < 18; ll_i++) {
            Integer IntegerID = new Integer(strIDCARD.substring((ll_i - 1), ll_i));
//            int intid = IntegerID;
            ll_sum = ll_sum + IntegerID * w[ll_i];
        }
        ll_sum = ll_sum % 11;
//        Long Longll_sum = new Long(ll_sum);
//        int intll_sum = ll_sum.intValue();
        switch (ll_sum) {
            case 0:
                ls_check = "1";
                break;
            case 1:
                ls_check = "0";
                break;
            case 2:
                ls_check = "X";
                break;
            case 3:
                ls_check = "9";
                break;
            case 4:
                ls_check = "8";
                break;
            case 5:
                ls_check = "7";
                break;
            case 6:
                ls_check = "6";
                break;
            case 7:
                ls_check = "5";
                break;
            case 8:
                ls_check = "4";
                break;
            case 9:
                ls_check = "3";
                break;
            case 10:
                ls_check = "2";
                break;
        }
        SBIDCARD.append(ls_check);
        strResult = new String(SBIDCARD);
        return strResult;
    }

    /**
     * 18位身份证转为15位身份证
     * @param id        18位身份证号
     * @return String   15位身份证号码
     */
    public static String eighteenToFifteen(String id) {

        if (id == null || id.length() != 18) {
            return "";
        }
        String strResult = "";
        StringBuffer SBIDCARD = new StringBuffer(id.substring(0, 6));
        SBIDCARD.append(id.substring(8, 17));
        strResult = new String(SBIDCARD);
        return strResult;
	}
    
    /**
     * 得到UUID
     * @return
     */
    public static String getUUID(){
    	return UUID.randomUUID().toString().replaceAll("-", "");
    }

     /**
     * 检查是否为手机号码
     *
     * @param sth       手机号码
     * @return boolean  成功失败
     */
    public static boolean isMobileNumble(String sth) {
        if(isNullString(sth)){
            return false;
        }
        String regex = "^1[3578]\\d{9}$";
        return sth.matches(regex);
    }

    public static boolean isNumber(String str){
        return !isNullString(str) && str.matches("[0-9]+");
    }
    public static boolean isNumberOrLetter(String str){
    	return !isNullString(str) && str.matches("[0-9a-zA-Z]+");
    }

    /**
     * 检查是否为固话
     * @param str   电话号码
     * @return boolean
     */
    public static boolean isTelNumber(String str){
        if(isNullString(str)){
            return false;
        }
        String regex = "^((0\\d{2,3})-)(\\d{7,8})(-(\\d{3,4}))?$";
        return str.matches(regex);
    }

    public static boolean isEmail(String str){
        if(isNullString(str)){
            return false;
        }
        String regex = "^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$";
        return str.matches(regex);
    }
    /**
     * 功能描述：将字符串转化为数组类型。
     */
	public static Object[] parseArray(final String in_value, final Object... param) {
        String value = (in_value == null) ? "" : in_value;
        // -------------------
        List array = parseList(value, param);
        return array.toArray();
    }
    /**
     * 功能描述：将字符串转化为集合类型。在转化过程中可以指定分割符转换类型以及相应类型的默认转换值。
     * 类型的默认转换值是指当原数据在像目标转换时发生异常而采用的默认值取代。
     */
    @SuppressWarnings("unchecked")
	public static List parseList(final String in_value, final Object... param) {
        String value = (in_value == null) ? "" : in_value;
        // -------------------
        String split = ",";// 默认分割符。
        Class<?> toType = String.class;// 默认String类型
        Object defaultValue = null;// 默认值是null。
        List array = null;
        boolean replay = true;// 默认值是true 替换。
        // -------------------
        if (param.length == 0) {
            // 没有参数
            array = new ArrayList<Object>(0);
        } else if (param.length == 1) {
            // 一个参数
            split = (String) param[0];
            array = new ArrayList<Object>(0);
        } else if (param.length == 2) {
            // 两个参数
            split = (String) param[0];
            toType = (Class<?>) param[1];
            array = new ArrayList<Object>(0);
        } else if (param.length == 3) {
            // 三个参数
            split = (String) param[0];
            toType = (Class<?>) param[1];
            defaultValue = param[2];
            array = new ArrayList<Object>(0);
        } else if (param.length == 4) {
            // 四个参数
            split = (String) param[0];
            toType = (Class<?>) param[1];
            defaultValue = param[2];
            array = (List<?>) param[3];
        } else {
            // 五个参数
            split = (String) param[0];
            toType = (Class<?>) param[1];
            defaultValue = param[2];
            array = (List<?>) param[3];
            replay = StringUtil.parseBoolean(param[4].toString(), true);
        }
        // -------------------
        String[] temp_split = value.split(split);
        for (String var : temp_split){
        	if (array.contains(var) == true){
        		if (replay == true) {
                    array.remove(var);
                    array.add(StringUtil.changeType(var, toType, defaultValue));
                } else {}
        	}else{
                array.add(StringUtil.changeType(var, toType, defaultValue));
        	}
        }  
        return array;
    }

	public static boolean isEmpty(Object obj) {
		if (obj == null) {
			return true;
		} else if (obj instanceof String && String.valueOf(obj).trim().equals("")) {
			return true;
		} else if (obj instanceof Number && ((Number) obj).doubleValue() == 0) {
			return true;
		} else if (obj instanceof Boolean && !((Boolean) obj)) {
			return true;
		} else if (obj instanceof Collection && ((Collection) obj).isEmpty()) {
			return true;
		} else if (obj instanceof Map && ((Map) obj).isEmpty()) {
			return true;
		} else if (obj instanceof Object[] && ((Object[]) obj).length == 0) {
			return true;
		}
		return false;
	}
	/**
	 * 判断字符串是否只包含数字或英文字母
	 * @param s
	 * @return
	 */
	 public static boolean isLetterOrInt(String s){
		 return s.matches("^[\\da-zA-Z]*$"); 
	 }
	
	 

		/**
		 * 验证Collection是否为空
		 * 
		 * @author July july_sky@foxmail.com
		 * @date 2015年4月3日下午1:26:17
		 * @param coll
		 * @return
		 */
		public static boolean isEmpty(Collection<?> coll){
			return coll == null || coll.size() <= 0;
		}
		
		/**
		 * 验证Collection是否不为空
		 * 
		 * @author July july_sky@foxmail.com
		 * @date 2015年4月3日下午1:26:17
		 * @param coll
		 * @return
		 */
		public static boolean isNotEmpty(Collection<?> coll) {
			return !isEmpty(coll);
		}
		
		/**
		 * 验证Map是否为空
		 * 
		 * @author July july_sky@foxmail.com
		 * @date 2015年4月3日下午1:26:17
		 * @param coll
		 * @return
		 */
		public static boolean isEmpty(Map<?,?> map){
			return map == null || map.size() <= 0;
		}
		
		/**
		 * 验证Map是否不为空
		 * 
		 * @author July july_sky@foxmail.com
		 * @date 2015年4月3日下午1:26:17
		 * @param coll
		 * @return
		 */
		public static boolean isNotEmpty(Map<?,?> map) {
			return !isEmpty(map);
		}
		
		/**
		 * 验证Object是否为空
		 * 
		 * @author July july_sky@foxmail.com
		 * @date 2015年4月3日下午1:31:37
		 * @param obj
		 * @return
		 */
		public static boolean isBlank(Object obj) {
			return obj == null || isBlank(obj.toString());
		}
		
		/**
		 * 验证String是否为空
		 * 
		 * @author July july_sky@foxmail.com
		 * @date 2015年4月3日下午1:31:37
		 * @param obj
		 * @return
		 */
		public static boolean isBlank(String str) {
			return str == null || org.apache.commons.lang3.StringUtils.isBlank(str);
		}
		
//		private static final String COUNT_SQL_REG = "select\\s+.*\\s+from\\s"; 
		private static final String COUNT_SQL_REG = "^\\s*?(select\\s+([\\s\\S]*?)\\s+)?from\\s+[\\s\\S]*?(\\sorder\\s[\\s\\S]*)?";
		private static final String COUNT_REPLACE = "select count(1) from ";
		/**
		 * 根据原始SQL获取countSQl
		 * 
		 * @author July july_sky@foxmail.com
		 * @date 2015年4月17日上午8:59:07
		 * @param querySql
		 * @return
		 */
		public static String getCountSql(String querySql) {
			return querySql.toLowerCase().replaceAll(COUNT_SQL_REG, COUNT_REPLACE).replace("\t\n", " ");
		}

		/**
		 * 根据原始SQL获取countSQL，不截取
		 * 
		 * @author July july_sky@foxmail.com
		 * @date 2015年5月4日上午9:01:37
		 * @param querySql
		 * @return
		 */
		public static String getCountSqlChild(String querySql) {
			return COUNT_REPLACE.concat("(").concat(querySql).concat(") t");
		}
		
		
		/**
		 * 用指定表达式格式化字符串
		 * 
		 * @param str 要格式化的字符串
		 * @param rgx 替换表达式
		 * @param args 要填充的参数
		 * @return
		 */
		/*public static String format(String str,String rgx,String ...args) {
			if(isBlank(args) || isBlank(str) || args.length <= 0) {return str;}
			for(String s : args) {
				str = str.replaceFirst(rgx, s);
			}
			return str;
		}*/
		
		/**
		 * 用指定表达式格式化字符串
		 * 
		 * @param str 要格式化的字符串
		 * @param rgx 替换表达式
		 * @param args 要填充的参数
		 * @return
		 */
		public static String format(String str,String rgx,Object ...args) {
			if(isBlank(args) || isBlank(str) || args.length <= 0) {return str;}
			for(Object s : args) {
				if(s != null){
					str = str.replaceFirst(rgx, s.toString());
				}
			}
			return str;
		}
			
		/**
		 * 根据全路径获取文件名称
		 * 
		 * @author July july_sky@foxmail.com
		 * @date 2015年9月21日下午10:04:22
		 * @param allPath
		 * @return
		 */
		public static String getFileName(Object allPath){
			String _path = StringUtils.isBlank(allPath)?"":allPath.toString();
			return _path.lastIndexOf("/")==-1?_path:_path.substring(_path.lastIndexOf("/")+1,_path.length());
		}
		
	/**
	* 将城市名转换为分站名(津市市->津市站)
	* 
	* @author Tu
	* @date 2016年4月6日
	* @param cityName
	* @return
	*/
	public static String cityToFconfig(String cityName){
		if(null == cityName || "".equals(cityName)){return cityName;}
		
		if(cityName.indexOf("市") < 0){
			return cityName + "站";
		}
		
		if(cityName.lastIndexOf("市") == cityName.indexOf("市")){
			return cityName.replace("市", "站");
		}else{
			return cityName.substring(0, cityName.length()-1) + "站";
		}
	}
	
	/**
	 * 格式化运单号.每3个字符加入空格.
	 * @author Tu
	 * @date 2016年5月17日
	 * @param str 123456789
	 * @return str 123 456 789
	 */
	public static String formatThree(String str){
		if(str == null || str.equals("")){
			return str;
		}
		
		String rStr;
		StringBuffer newStr = new StringBuffer();
		int l = str.length();
		
		for(int i = 1;i<= l/3; i++){
			newStr.append(str.substring((i-1)*3, (i-1)*3+3)).append(" ");
		}
		
		if(l%3 != 0){
			newStr.append(str.substring(l/3 *3));
			
			rStr = newStr.toString();
		}else{
			//去除尾部空格
			rStr = newStr.toString().trim();
		}
		
		return rStr;
	}
	/**
	 * 根据传入数量返回对应数量的占位符（sql语句中使用,如 ?,?,?,?）
	 * @param num
	 * @return
	 */
	public static String placeholder(int num){
		if(num > 0){
			StringBuffer sb = new StringBuffer();
			for(int i=0;i<num;i++){
				sb.append("?").append(",");
			}
			String strsb = sb.toString();
			return strsb.substring(0,strsb.length()-1);
		}else{
			return null;
		}
	}
}

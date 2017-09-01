package cn.com.ylpw.artist.utils;

import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.common.collect.Lists;

@SuppressWarnings("rawtypes")
public class StringUtil {
	/**
	 * Logger for this class
	 */
	// private static final Logger logger = Logger.getLogger(StringUtil.class);
	private static final Logger log = LoggerFactory.getLogger(StringUtil.class);

	private static final Byte DefaultValue_Byte = 0;
	private static final Short DefaultValue_Short = 0;
	private static final Integer DefaultValue_Integer = 0;
	private static final Long DefaultValue_Long = 0l;
	private static final Float DefaultValue_Float = 0f;
	private static final Double DefaultValue_Double = 0d;
	private static final Boolean DefaultValue_Boolean = false;

	private static final String[] urlReplacements = new String[] { "%", "%25", "$", "%24", "&", "%26", "+", "%2B", ",",
			"%2C", "/", "%2F", ":", "%3A", ";", "%3B", "=", "%3D", "?", "%3F", "@", "%40", " ", "%20", "\"", "%22", "<",
			"%3C", ">", "%3E", "#", "%23", "{", "%7B", "}", "%7D", "|", "%7C", "\\", "%5C", "^", "%5E", "~", "%7E", "[",
			"%5B", "]", "%5D", "`", "%60" };

	/**
	 * 判断对象是否为空 User:T.L Description:
	 * 
	 * @param obj
	 * @return
	 *
	 */
	public static boolean isEmpty(Object obj) {
		if (obj == null) {
			return true;
		} else if (obj instanceof String && String.valueOf(obj).trim().equals("")) {
			return true;
		} else if (obj instanceof String && String.valueOf(obj).trim().equals("null")) {
			return true;
		}
		// else if (obj instanceof Number && ((Number) obj).doubleValue() == 0)
		// {
		// return true;
		// }
		else if (obj instanceof Boolean && !((Boolean) obj)) {
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
	 * 功能描述：解析字符串为最小长度的数字类型。如果value保存的是0~255之间的数则该方法回返回byte类型，如果是256则返回short类型。
	 */
	public static Number parseNumber(final String value, final Number... defaultValue) {
		try {
			if (value.indexOf(".") != -1)
				try {
					return Float.parseFloat(value);
				} catch (Exception e) {
					log.warn("解析字符串异常", e);
					return Double.parseDouble(value);
				}
			else
				try {
					return Byte.parseByte(value);
				} catch (Exception e) {
					log.warn("解析字符串异常", e);
					try {
						return Short.parseShort(value);
					} catch (Exception e1) {
						log.warn("解析字符串异常", e1);
						try {
							return Integer.parseInt(value);
						} catch (Exception e2) {
							log.warn("解析字符串异常", e2);
							return Long.parseLong(value);
						}
					}
				}
		} catch (Exception e) {
			log.warn("解析字符串异常", e);
			return (defaultValue.length >= 1) ? defaultValue[0] : 0;
		}
	}

	/**
	 * 功能描述：数据类型转换，只支持如下数据类型：String，Integer，Byte，Character，Short，Long，Float，Double，Boolean，Date。
	 */
	public static Object changeType(final String value, final Object... param) {
		if (value == null)
			return null;
		Class<?> type = String.class;
		Object defaultValue = null;
		// -----------
		if (param.length == 1) {
			type = (Class<?>) param[0];
		} else if (param.length == 2) {
			type = (Class<?>) param[0];
			defaultValue = param[1];
		}
		defaultValue = (defaultValue == null) ? "0" : defaultValue;
		// -----------
		if (Integer.class == type || int.class == type) {
			return StringUtil.parseInt(value, Integer.parseInt(defaultValue.toString()));
		} else if (String.class == type) {
			return value.toString();
		} else if (Byte.class == type || byte.class == type) {
			return StringUtil.parseByte(value, Byte.parseByte(defaultValue.toString()));
		} else if (Character.class == type || char.class == type) {
			return Character.valueOf(value.charAt(0));
		} else if (Short.class == type || short.class == type) {
			return StringUtil.parseShort(value, Short.parseShort(defaultValue.toString()));
		} else if (Long.class == type || long.class == type) {
			return StringUtil.parseLong(value, Long.parseLong(defaultValue.toString()));
		} else if (Float.class == type || float.class == type) {
			return StringUtil.parseFloat(value, Float.parseFloat(defaultValue.toString()));
		} else if (Double.class == type || double.class == type) {
			return StringUtil.parseDouble(value, Double.parseDouble(defaultValue.toString()));
		} else if (Boolean.class == type || boolean.class == type) {
			return StringUtil.parseBoolean(value, Boolean.parseBoolean(defaultValue.toString()));
		} else if (Date.class == type) {
			return StringUtil.parseDate(value, new Date());
		} else
			return value;
	}

	/**
	 * 功能描述：将字符类型数据转换成int类型数据。如果字符串格式非法其默认值为0。
	 */
	public static Integer parseInt(final String value, final Integer... defaultValue) {
		try {
			return (value == null || value.equals("") == false) ? Integer.parseInt(value) : defaultValue[0];
		} catch (Exception e) {
			log.warn("将字符类型数据转换成int类型数据出现异常", e);
			return (defaultValue.length >= 1) ? defaultValue[0] : StringUtil.DefaultValue_Integer;
		}
	}

	/**
	 * 功能描述：将字符类型数据转换成float类型数据。如果字符串格式非法其默认值为0.0。
	 */
	public static Float parseFloat(final String value, final Float... defaultValue) {
		try {
			// return (value == null || value.equals("") == false) ?
			// Float.parseFloat(value) : defaultValue[0];
			return !StringUtil.isEmpty(value) ? Float.parseFloat(value) : defaultValue[0];
		} catch (Exception e) {
			log.error("将字符类型数据转换成float类型数据出现异常", e);
			return (defaultValue.length >= 1) ? defaultValue[0] : StringUtil.DefaultValue_Float;
		}
	}

	/**
	 * 功能描述：将字符类型数据转换成double类型数据。如果字符串格式非法其默认值为0.0。
	 */
	public static Double parseDouble(final String value, final Double... defaultValue) {
		try {
			// return (value == null || value.equals("") == false) ?
			// Double.parseDouble(value) : defaultValue[0];
			return !StringUtil.isEmpty(value) ? Double.parseDouble(value) : defaultValue[0];
		} catch (Exception e) {
			log.warn("将字符类型数据转换成double类型数据出现异常", e);
			return (defaultValue.length >= 1) ? defaultValue[0] : StringUtil.DefaultValue_Double;
		}
	}

	/**
	 * 功能描述：将字符类型数据转换成boolean类型数据。如果字符串格式非法其默认值为false。
	 */
	public static Boolean parseBoolean(final String value, final Boolean... defaultValue) {
		try {
			return (value == null || value.equals("") == true) ? defaultValue[0] : Boolean.parseBoolean(value);
		} catch (Exception e) {
			log.warn("将字符类型数据转换成boolean类型数据出现异常", e);
			return (defaultValue.length >= 1) ? defaultValue[0] : StringUtil.DefaultValue_Boolean;
		}
	}

	/**
	 * 功能描述：将字符类型数据转换成long类型数据。如果字符串格式非法其默认值为0。
	 */
	public static Long parseLong(final String value, final Long... defaultValue) {
		try {
			return (value == null || value.equals("") == false) ? Long.parseLong(value) : defaultValue[0];
		} catch (Exception e) {
			log.warn("将字符类型数据转换成long类型数据出现异常", e);
			return (defaultValue.length >= 1) ? defaultValue[0] : StringUtil.DefaultValue_Long;
		}
	}

	/**
	 * 功能描述：将字符类型数据转换成byte类型数据。如果字符串格式非法其默认值为0。
	 */
	public static Byte parseByte(final String value, final Byte... defaultValue) {
		try {
			// return (value == null || value.equals("") == false) ?
			// Byte.parseByte(value) : defaultValue[0];
			return !StringUtil.isEmpty(value) ? Byte.parseByte(value) : defaultValue[0];
		} catch (Exception e) {
			log.warn("将字符类型数据转换成byte类型数据出现异常", e);
			return (defaultValue.length >= 1) ? defaultValue[0] : StringUtil.DefaultValue_Byte;
		}
	}

	/**
	 * 功能描述：将字符类型数据转换成short类型数据。如果字符串格式非法其默认值为0。
	 */
	public static Short parseShort(final String value, final Short... defaultValue) {
		try {
			// return (value == null || value.equals("") == false) ?
			// Short.parseShort(value) : defaultValue[0];
			return !StringUtil.isEmpty(value) ? Short.parseShort(value) : defaultValue[0];
		} catch (Exception e) {
			log.warn("将字符类型数据转换成short类型数据异常", e);
			return (defaultValue.length >= 1) ? defaultValue[0] : StringUtil.DefaultValue_Short;
		}
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
		for (String var : temp_split) {
			if (array.contains(var) == true) {
				if (replay == true) {
					array.remove(var);
					array.add(StringUtil.changeType(var, toType, defaultValue));
				} else {
				}
			} else {
				array.add(StringUtil.changeType(var, toType, defaultValue));
			}
		}
		return array;
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
	public static Map parseMap(final String in_value, final Object... param) {
		String value = (in_value == null) ? "" : in_value;
		// -------------------
		String split_key = "=";// 默认分割符1。
		String split_val = ";";// 默认分割符2。
		Class<?> toType_key = String.class;// key默认String类型
		Class<?> toType_val = String.class;// val默认String类型
		Object defaultValue = null;// 默认值是null。
		Map array = null;
		boolean replay = true;// 默认值是true 替换。
		// -------------------
		if (param.length == 0) {
			// 没有参数
			array = new HashMap<String, String>(0);
		} else if (param.length == 1) {
			// 一个参数
			String split = (String) param[0];
			if (split.length() == 1)
				split_key = String.valueOf(split.charAt(0));
			else {
				split_key = String.valueOf(split.charAt(0));
				split_val = String.valueOf(split.charAt(1));
			}
			array = new HashMap<String, String>();
		} else if (param.length == 2) {
			// 两个参数
			String split = (String) param[0];
			if (split.length() == 1)
				split_key = String.valueOf(split.charAt(0));
			else {
				split_key = String.valueOf(split.charAt(0));
				split_val = String.valueOf(split.charAt(1));
			}
			toType_key = (Class<?>) param[1];
			array = new HashMap<String, String>();
		} else if (param.length == 3) {
			// 三个参数
			String split = (String) param[0];
			if (split.length() == 1)
				split_key = String.valueOf(split.charAt(0));
			else {
				split_key = String.valueOf(split.charAt(0));
				split_val = String.valueOf(split.charAt(1));
			}
			toType_key = (Class<?>) param[1];
			toType_val = (Class<?>) param[2];
			array = new HashMap<String, String>();
		} else if (param.length == 4) {
			// 四个参数
			String split = (String) param[0];
			if (split.length() == 1)
				split_key = String.valueOf(split.charAt(0));
			else {
				split_key = String.valueOf(split.charAt(0));
				split_val = String.valueOf(split.charAt(1));
			}
			toType_key = (Class<?>) param[1];
			toType_val = (Class<?>) param[2];
			defaultValue = param[3];
			array = new HashMap<String, String>();
		} else if (param.length == 5) {
			// 五个参数
			String split = (String) param[0];
			if (split.length() == 1)
				split_key = String.valueOf(split.charAt(0));
			else {
				split_key = String.valueOf(split.charAt(0));
				split_val = String.valueOf(split.charAt(1));
			}
			toType_key = (Class<?>) param[1];
			toType_val = (Class<?>) param[2];
			defaultValue = param[3];
			array = (Map) param[4];
		} else {
			// 六个参数
			String split = (String) param[0];
			if (split.length() == 1)
				split_key = String.valueOf(split.charAt(0));
			else {
				split_key = String.valueOf(split.charAt(0));
				split_val = String.valueOf(split.charAt(1));
			}
			toType_key = (Class<?>) param[1];
			toType_val = (Class<?>) param[2];
			defaultValue = param[3];
			array = (Map) param[4];
			replay = StringUtil.parseBoolean(param[4].toString(), true);
		}
		// -------------------
		String[] temp_split = value.split(split_val);// key=value
		for (String var : temp_split) {
			String[] over_split = var.split(split_key);
			if (over_split.length != 2)
				continue;
			Object ov_key = StringUtil.changeType(over_split[0], toType_key);
			Object ov_var = StringUtil.changeType(over_split[1], toType_val, defaultValue);
			if (array.containsKey(ov_key.toString().trim()) == true)
				if (replay == true) {
					array.remove(ov_key);
					array.put(ov_key.toString().trim(), ov_var);
				} else {
				}
			else
				array.put(ov_key.toString().trim(), ov_var);
		}
		return array;
	}

	/**
	 * 功能描述：此方法用于字符串转换成时间类型。 默认格式：yyyy/MM/dd-hh:mm:ss 默认时间：系统当前时间 时间格式
	 * 表示说明：yyyy: 表示年 MM：表示月 dd：表示天 hh: 表示时mm: 表示分 ss：表示秒
	 */
	public static Date parseDate(String value, Object... patam) {
		String formatString = null;
		Date defaultValue = null;
		// -------------------
		if (patam.length == 0) {
			defaultValue = new Date();
			formatString = "yyyy/MM/dd-hh:mm:ss";
		} else if (patam.length == 1) {
			defaultValue = (patam[0] == null) ? new Date() : (Date) patam[0];
			formatString = "yyyy/MM/dd-hh:mm:ss";
		} else if (patam.length == 2) {
			defaultValue = (patam[0] == null) ? new Date() : (Date) patam[0];
			formatString = (String) patam[1];
		}
		// -------------------
		if (value == null || value.equals(""))
			return defaultValue;
		try {
			SimpleDateFormat sf = new SimpleDateFormat(formatString);
			Date res = sf.parse(value);
			return res;
		} catch (Exception e) {
			log.error("字符串转换成时间类型异常", e);
			return defaultValue;
		}
	}

	public static String substringBetween(String str, String open, String close) {
		if (str == null || open == null || close == null) {
			return null;
		}
		int start = str.indexOf(open);
		if (start != -1) {
			int end = str.indexOf(close, start + open.length());
			if (end != -1) {
				return str.substring(start + open.length(), end);
			}
		}
		return null;
	}

	/**
	 * 功能描述：大段文本的快速替换(未测试)
	 * 
	 * @param strSource
	 * @param strOld
	 * @param strNew
	 * @return 返回的字符串
	 */
	public static String Replace(String strSource, String strOld, String strNew) {
		int index, indexStart;
		StringBuffer strDest = new StringBuffer(0);
		int nOldLength = strOld.length();
		if (StringUtils.isEmpty(strOld))
			return strSource;
		index = strSource.indexOf(strOld);
		if (index == -1)
			return strSource;
		strDest.append(strSource.substring(0, index) + strNew);
		indexStart = index + nOldLength;
		while ((index = strSource.indexOf(strOld, indexStart)) != -1) {
			strDest.append(strSource.substring(indexStart, index) + strNew);
			indexStart = index + nOldLength;
		}
		strDest.append(strSource.substring(indexStart));
		return strDest.toString();
	}

	/**
	 * 功能描述：字符串截取避免截取半个中文字符
	 * 
	 * @param str
	 *            目标字符串
	 * @param begin
	 *            开始长度
	 * @param end
	 *            结束长度
	 * @return 返回的字符串
	 */
	public static String cutString(String str, int begin, int end) {
		if (StringUtils.isEmpty(str))
			return str;
		char[] b = str.toCharArray();
		String s = new String(b, begin, end - begin);
		return s;
	}

	/**
	 * 功能描述：返回指定字节长度的字符串
	 * 
	 * @param str
	 *            String 字符串
	 * @param length
	 *            int 指定长度
	 * @return String 返回的字符串
	 */
	public static String toLength(String str, int length) {
		if (str == null)
			return null;
		if (length <= 0)
			return "";
		try {
			if (str.getBytes("GBK").length <= length)
				return str;
		} catch (Exception e) {
			log.error("返回指定字节长度的字符串异常", e);
		}
		StringBuffer buff = new StringBuffer();
		int index = 0;
		char c;
		length -= 3;
		while (length > 0) {
			c = str.charAt(index);
			if (c < 128) {
				length--;
			} else {
				length--;
				length--;
			}
			buff.append(c);
			index++;
		}
		buff.append("...");
		return buff.toString();
	}

	/**
	 * 功能描述：字符串截取函数
	 * 
	 * @param str
	 *            String 要处理的字符串
	 * @param length
	 *            int 需要显示的长度
	 * @param symbol
	 *            String 用于表示省略的信息的字符，如“...”,“>>>”等
	 * @return String 返回处理后的字符串
	 * @throws UnsupportedEncodingException
	 */
	public static String getLimitLengthString(String str, int length, String symbol) {
		assert str != null;
		assert length > 0;
		assert symbol != null;
		// 如果字符串的位数小于等于要截取的位数，附加上表示省略的信息的字符串后返回
		if (str.length() <= length)
			return str + symbol;
		// 从零开始，截取length个字符，附加上表示省略的信息的字符串后返回
		else {
			try {
				str = new String(str.getBytes("UTF-8"));
			} catch (UnsupportedEncodingException e) {
				log.error("字符串截取函数异常", e);
			}
			char[] charArray = str.toCharArray();
			char[] charArrayDesc = new char[length];
			System.arraycopy(charArray, 0, charArrayDesc, 0, length);
			return new String(charArrayDesc) + symbol;
		}
	}

	/**
	 * 功能描述: 按字节长度截取字符串
	 * 
	 * @param str
	 *            将要截取的字符串参数
	 * @param toCount
	 *            截取的字节长度
	 * @param more
	 *            字符串末尾补上的字符串
	 * @return 返回截取后的字符串
	 */
	public static String substring(String str, int toCount, String more) {
		int reInt = 0;
		String reStr = "";
		if (str == null)
			return "";
		char[] tempChar = str.toCharArray();
		for (int kk = 0; (kk < tempChar.length && toCount > reInt); kk++) {
			String s1 = String.valueOf(tempChar[kk]);
			byte[] b = s1.getBytes();
			reInt += b.length;
			reStr += tempChar[kk];
		}
		if (toCount == reInt || (toCount == reInt - 1))
			reStr += more;
		return reStr;
	}

	/**
	 * 功能描述: 替换连接里面的特殊字符
	 * 
	 * @param str
	 *            字符串
	 * @return 返回的字符串
	 */
	public static String urlEncode(String str) {
		String result = str;
		for (int n = 0; n < urlReplacements.length; n += 2) {
			result = result.replace(urlReplacements[n], urlReplacements[n + 1]);
		}
		return result;
	}

	/**
	 * 功能描述: 使用给定的分隔符合并字符串数组成为新的字符串。
	 * 
	 * @param array
	 *            要合并的字符串数组
	 * @param separator
	 *            分隔符
	 * @return 由分隔符分隔字符串数组合并的新的字符串
	 */
	public static String join(Object[] array, String separator) {
		return org.apache.commons.lang3.StringUtils.join(array, separator); // by
																			// L.cm
																			// 2014-12-10
																			// 重写为common包Join
	}

	/**
	 * 功能描述：人民币转成大写
	 * 
	 * @param str
	 *            数字字符串
	 * @return String 人民币转换成大写后的字符串
	 */
	public static String hangeToBig(String str) {
		double value;
		try {
			value = Double.parseDouble(str.trim());
		} catch (Exception e) {
			log.error("人民币转成大写异常", e);
			return null;
		}
		char[] hunit = { '拾', '佰', '仟' }; // 段内位置表示
		char[] vunit = { '万', '亿' }; // 段名表示
		char[] digit = { '零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖' }; // 数字表示
		long midVal = (long) (value * 100); // 转化成整形
		String valStr = String.valueOf(midVal); // 转化成字符串
		String head = valStr.substring(0, valStr.length() - 2); // 取整数部分
		String rail = valStr.substring(valStr.length() - 2); // 取小数部分
		String prefix = ""; // 整数部分转化的结果
		String suffix = ""; // 小数部分转化的结果
		// 处理小数点后面的数
		if (rail.equals("00")) { // 如果小数部分为0
			suffix = "整";
		} else {
			suffix = digit[rail.charAt(0) - '0'] + "角" + digit[rail.charAt(1) - '0'] + "分"; // 角分转化出来
		}
		// 处理小数点前面的数
		char[] chDig = head.toCharArray(); // 把整数部分转化成字符数组
		char zero = '0'; // 标志'0'表示出现过0
		byte zeroSerNum = 0; // 连续出现0的次数
		for (int i = 0; i < chDig.length; i++) { // 循环处理每个数字
			int idx = (chDig.length - i - 1) % 4; // 取段内位置
			int vidx = (chDig.length - i - 1) / 4; // 取段位置
			if (chDig[i] == '0') { // 如果当前字符是0
				zeroSerNum++; // 连续0次数递增
				if (zero == '0') { // 标志
					zero = digit[0];
				} else if (idx == 0 && vidx > 0 && zeroSerNum < 4) {
					prefix += vunit[vidx - 1];
					zero = '0';
				}
				continue;
			}
			zeroSerNum = 0; // 连续0次数清零
			if (zero != '0') { // 如果标志不为0,则加上,例如万,亿
				prefix += zero;
				zero = '0';
			}
			prefix += digit[chDig[i] - '0']; // 转化该数字表示
			if (idx > 0)
				prefix += hunit[idx - 1];
			if (idx == 0 && vidx > 0) {
				prefix += vunit[vidx - 1]; // 段结束位置加上万,亿
			}
		}
		if (prefix.length() > 0)
			prefix += '圆'; // 如果整数部分存在,则有圆
		return prefix + suffix; // 返回正确表示
	}

	/**
	 * 生成字母数字间隔的随机密码
	 * 
	 * @param pwd_len
	 *            生成的密码的总长度
	 * @return 密码的字符串
	 */
	public static String createPass(int pwd_len) {
		// 35是因为数组是从0开始的，26个字母+10个数字
		final int maxNum = 26;
		final int maxDig = 10;
		int i; // 生成的随机数
		int count = 0; // 生成的密码的长度
		char[] str = { 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
				't', 'u', 'v', 'w', 'x', 'y', 'z' };
		char[] dig = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' };

		StringBuffer pwd = new StringBuffer("");
		Random r = new Random();
		while (count < pwd_len) {
			// 生成随机数，取绝对值，防止生成负数，

			i = Math.abs(r.nextInt(maxNum)); // 生成的数最大为36-1

			if (i >= 0 && i < str.length) {
				pwd.append(str[i]);
				count++;
			}
			i = Math.abs(r.nextInt(maxDig));
			if (i >= 0 && i < dig.length) {
				pwd.append(dig[i]);
				count++;
			}
		}
		return pwd.toString();
	}

	/***
	 * 验证手机号
	 * 
	 * @param mobiles
	 * @return
	 */
	public static boolean isMobileNO(String mobiles) {
		Pattern p = Pattern.compile("^((13[0-9])|(15[^4,\\D])|(18[0,5-9]))\\d{8}$");
		Matcher m = p.matcher(mobiles);
		return m.matches();
	}

	/**
	 * 将字符串中特定模式的字符转换成map中对应的值
	 * 
	 * @param s
	 *            需要转换的字符串
	 * @param map
	 *            转换所需的键值对集合
	 * @return 转换后的字符串
	 */
	public static String replace(String s, Map<?, ?> map) {
		StringBuilder ret = new StringBuilder((int) (s.length() * 1.5));
		int cursor = 0;
		for (int start, end; (start = s.indexOf("${", cursor)) != -1 && (end = s.indexOf("}", start)) != -1;) {
			ret.append(s.substring(cursor, start));
			String key = s.substring(start + 2, end); // L.cm, 优化 ${tt },或者 ${
														// aa }有空格的情况 2014.5.4
			ret.append(map.get(StringUtils.trim(key)));
			cursor = end + 1;
		}
		ret.append(s.substring(cursor, s.length()));
		return ret.toString();
	}

	/**
	 * 将字符串中特定模式的字符转换成objs中对应的值
	 * 
	 * @param s
	 *            需要转换的字符串
	 * @param objs
	 *            转换所需的键值对集合
	 * @return 转换后的字符串
	 */
	public static String replace(String s, Object... objs) {
		if (objs == null || objs.length == 0)
			return s;
		if (s.indexOf("{}") == -1)
			return s;
		StringBuilder ret = new StringBuilder((int) (s.length() * 1.5));
		int cursor = 0;
		int index = 0;
		for (int start; (start = s.indexOf("{}", cursor)) != -1;) {
			ret.append(s.substring(cursor, start));
			if (index < objs.length) {
				ret.append(objs[index]);
			} else {
				ret.append("{}");
			}
			cursor = start + 2;
			index++;
		}
		ret.append(s.substring(cursor, s.length()));
		return ret.toString();
	}

	/**
	 * 
	 * @description 功能描述: 生成sql占位符 ?,?,?
	 * @author 作 者: 卢春梦
	 * @param 参
	 *            数:
	 * @return 返回类型:
	 * @createdate 建立日期：2013-8-9上午11:08:41
	 */
	public static String sqlPlaceHolder(Integer size) {
		if (null == size || size < 1) {
			return "";
		} else {
			String[] paras = new String[size];
			Arrays.fill(paras, "?"); // L.cm 使用Arrays.fill替代for 2014.5.4
			return StringUtils.join(paras, ",");
		}
	}

	/**
	 * 处理Sql中拼接in导致的SQL注入
	 * 
	 * @param params
	 * @param list
	 * @return
	 */
	public static String sqlParamsSplit(String params, List<Object> list) {
		String[] ps = params.split(",");
		for (String p : ps) {
			list.add(p);
		}
		return sqlPlaceHolder(ps.length);
	}

	/**
	 * 
	 * @description 功能描述: 获取字符串的长度，Chinese
	 * @author 作 者: 卢春梦
	 * @param 参
	 *            数:
	 * @return 返回类型:
	 * @createdate 建立日期：2013-12-4下午3:22:59
	 */
	public static int getStringLength(String string) {
		if (StringUtil.isEmpty(string)) {
			return 0;
		} else {
			char[] chars = string.toCharArray();
			return chars.length;
		}
	}

	/**
	 * @Description: 拆分List列表
	 * @param list
	 * @param size
	 * @return List<List<Map<String,Object>>>
	 * @author 温志成
	 * @date 2016-10-14
	 */
	public static List<List<Map<String, Object>>> splitList(List<Map<String, Object>> list, int size) {
		List<List<Map<String, Object>>> listArr = Lists.newArrayList();
		if (StringUtil.isEmpty(list))
			return listArr;
		int arrSize = list.size() % size == 0 ? list.size() / size : list.size() / size + 1;
		for (int i = 0; i < arrSize; i++) {
			List<Map<String, Object>> sub = Lists.newArrayList();
			for (int j = i * size; j <= size * (i + 1) - 1; j++) {
				if (j <= list.size() - 1) {
					sub.add(list.get(j));
				}
			}
			listArr.add(sub);
		}
		return listArr;
	}

}

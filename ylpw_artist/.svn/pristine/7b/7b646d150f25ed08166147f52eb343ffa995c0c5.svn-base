package cn.com.ylpw.artist.utils;

import java.io.StringWriter;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
/**
 * json转换工具类
 * 
 * @author July july_sky@foxmail.com
 * @date 2015年4月10日下午2:46:37
 * @Copyright ©2003-2015 北京春秋永乐文化传播有限公司. All Rights Reserved.
 * @version 1.0
 */
public class JsonUtils {
	private static ObjectMapper mapper = new ObjectMapper();
	
	/**
	 * 将Object对象转换成json字符串
	 * 
	 * @author July july_sky@foxmail.com
	 * @date 2015年4月10日下午2:46:44
	 * @param obj
	 * @return
	 * @throws Exception
	 */
	public static String format(Object obj) throws Exception {
		if(StringUtils.isBlank(obj)){
			return null;
		}
		if(mapper == null){
			mapper = new ObjectMapper();
		}
		try(StringWriter sw = new StringWriter();JsonGenerator gen = new JsonFactory().createGenerator(sw);){
			mapper.writeValue(gen, obj);
			return sw.toString();
		}catch (Exception e) {
			throw e;
		}
	}
	
	/**
	 * 将json字符串转换成Map
	 * 
	 * @author July july_sky@foxmail.com
	 * @date 2015年4月10日下午2:46:56
	 * @param json
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static Map<String,Object> parseMap(String json) throws Exception {
		if(mapper == null){
			mapper = new ObjectMapper();
		}
		return (Map<String,Object>) mapper.readValue(json, Map.class); 
	}
	
	/**
	 * 将json字符串转换成List
	 * 
	 * @author July july_sky@foxmail.com
	 * @date 2015年4月10日下午2:47:09
	 * @param json
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static List<Map<String,Object>> parseList(String json) throws Exception {
		if(mapper == null){
			mapper = new ObjectMapper();
		}
		return (List<Map<String,Object>>) mapper.readValue(json, Map.class); 
	}
	
	public static Object parseObject(String json) throws Exception {
		if(StringUtils.isBlank(json)) {
			return null;
		}
		if(mapper == null){
			mapper = new ObjectMapper();
		}
		return mapper.readValue(json, Object.class);
	}
}

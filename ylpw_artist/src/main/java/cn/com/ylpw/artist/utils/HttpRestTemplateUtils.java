package cn.com.ylpw.artist.utils;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.RestTemplate;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Maps;

public class HttpRestTemplateUtils {
	public static Map<String, Object> getResult(Map<String, Object> paramMap, String url) {
		Map<String, Object> retMap = sendPost(paramMap, url);
		Integer result = (Integer) retMap.get("result");
		if (result != null && result == 200) {
			String retJson = (String) retMap.get("jsonData");
			ObjectMapper mapper = new ObjectMapper();
			try {
				Map<String, Object> map = mapper.readValue(retJson, Map.class);
				if (map!= null && map.size()>0) {
					return map;
				}else {
					return null;
				}
			} catch (Exception e) {
				return null;
			}
		} else {
			// 请求失败
			try {
				return JsonUtils.parseMap(retMap.get("jsonData").toString());
			} catch (Exception e) {
				return null;
			}
		}
	}
	public static Map<String, Object> getResult(String url) {
		Map<String, Object> retMap = sendGet(url);
		Integer result = (Integer) retMap.get("result");
		if (result != null && result == 200) {
			String retJson = (String) retMap.get("jsonData");
			ObjectMapper mapper = new ObjectMapper();
			try {
				Map<String, Object> map = mapper.readValue(retJson, Map.class);
				if (map!= null && map.size()>0) {
					return map;
				}else {
					return null;
				}
			} catch (Exception e) {
				return null;
			}
		} else {
			// 请求失败
			try {
				return JsonUtils.parseMap(retMap.get("jsonData").toString());
			} catch (Exception e) {
				return null;
			}
		}
	}

	public static Map<String, Object> sendPost(
			Map<String, Object> paramMap, String clinentUrl) {
		RestTemplate restTemplate = RestTemplateUtil.getInstance();
		HttpHeaders requestHeaders = new HttpHeaders();
		LinkedMultiValueMap<String, Object> vars = new LinkedMultiValueMap<String, Object>();
		for (Map.Entry<String, Object> entry : paramMap.entrySet()) {
			vars.add(entry.getKey(), entry.getValue().toString());
		}
		HttpEntity<Object> entity = new HttpEntity<Object>(vars, requestHeaders);
		int result;
		String repXml = "";
		HashMap<String, Object> repMap = Maps.newHashMap();
		try {
			ResponseEntity<String> responseEntity = restTemplate.postForEntity(
					clinentUrl, entity, String.class);
			result = responseEntity.getStatusCode().value();
			repXml = responseEntity.getBody();
			repMap.put("result", result);
			repMap.put("jsonData", repXml);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return repMap;
	}
	public static Map<String, Object> sendGet( String clinentUrl) {
		RestTemplate restTemplate = RestTemplateUtil.getInstance();
		int result;
		String repXml = "";
		HashMap<String, Object> repMap = Maps.newHashMap();
		try {
			ResponseEntity<String> responseEntity = restTemplate.getForEntity(clinentUrl, String.class);
			result = responseEntity.getStatusCode().value();
			repXml = responseEntity.getBody();
			repMap.put("result", result);
			repMap.put("jsonData", repXml);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return repMap;
	}
}

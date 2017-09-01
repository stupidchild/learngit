package cn.com.ylpw.artist.web.service.impl;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import cn.com.ylpw.artist.utils.HttpRestTemplateUtils;
import cn.com.ylpw.artist.web.service.KuwoArtistService;

@Service("kuwoArtistServiceImpl")
public class KuwoArtistServiceImpl implements KuwoArtistService {
	private final Logger logger = LoggerFactory.getLogger(getClass());

	private String getMusicsByAristId = "http://www.kuwo.cn/bd/artist/getMusicsByAristId";
	private String artistalbum = "http://www.kuwo.cn/bd/artist/artistalbum";
	private String artistInfo = "http://www.kuwo.cn/bd/artist/getAtistInfoByAristId";
	private String getArtistsByKeyWord = "http://www.kuwo.cn/bd/artist/getArtistsByKeyWord";
	private String bdfrom="yongle";	//合作id
	private String c="ufjp66rfdbli";	//授权id，由酷我生成，用于区分合作的唯一授权码
	
	@Override
	public Map<String,Object> getMusicsByArtistId(int artistId, int sortby, int pn, int rn) {
		String url=getMusicsByAristId+"?artistId="+artistId+"&sortby="+sortby+"&pn="+pn+"&rn="+rn+"&bdfrom="+bdfrom+"&c="+c;
		logger.info(url);
		Map<String,Object> musics = HttpRestTemplateUtils.getResult(url);
		return musics;
	}

	@Override
	public  Map<String,Object>  getArtistalbum(int artistId, int sortby, int pn, int rn) {
		String url=artistalbum+"?artistId="+artistId+"&sortby="+sortby+"&pn="+pn+"&rn="+rn+"&bdfrom="+bdfrom+"&c="+c;
		logger.info(url);
		Map<String,Object> musics = HttpRestTemplateUtils.getResult(url);
		return musics;
	}

	@Override
	public  Map<String,Object>  getArtistInfo(int artistId) {
		String url=artistInfo+"?artistId="+artistId+"&bdfrom="+bdfrom+"&c="+c;
		logger.info(url);
		Map<String,Object> musics = HttpRestTemplateUtils.getResult(url);
		return musics;
	}

	@Override
	public  Map<String,Object>  getArtistsByKeyWord(String key, int pn, int rn) {
		String url=getArtistsByKeyWord+"?key="+key+"&pn="+pn+"&rn="+rn+"&bdfrom="+bdfrom+"&c="+c;
		logger.info(url);
		Map<String,Object> musics = HttpRestTemplateUtils.getResult(url);
		return musics;
	}
}

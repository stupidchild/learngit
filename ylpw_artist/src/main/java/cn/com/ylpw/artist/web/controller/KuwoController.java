package cn.com.ylpw.artist.web.controller;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.com.ylpw.artist.web.service.KuwoArtistService;

/**
 * 访问酷我音乐接口
 * @author yl
 * @createdate	2017年8月23日
 */
@Controller
@RequestMapping(value="/kuwo")
public class KuwoController {

	private final Logger logger = LoggerFactory.getLogger(getClass());
	
    @Autowired
    private KuwoArtistService kuwoArtistservice;


    @RequestMapping(value="/getMusicsByAristId")
	public @ResponseBody Map<String,Object> getMusicsByAristId(Model model, HttpSession session, Integer artistid,Integer pn) {
    	logger.info("根据艺人id获取歌曲列表，艺人id为：{}",artistid);
    	if(pn==null){
    		pn=0;
    	}
    	Map<String,Object>  musics = kuwoArtistservice.getMusicsByArtistId(artistid, 1, pn, 10);
		return musics;
	}
    @RequestMapping(value="/getArtistalbum")
	public @ResponseBody Map<String,Object> getArtistalbum(Model model, HttpSession session,Integer artistid,Integer pn) {
    	logger.info("根据歌手id回去歌手专辑列表接口，艺人id为：{}",artistid);
    	if(pn==null){
    		pn=0;
    	}
    	Map<String,Object>  album = kuwoArtistservice.getArtistalbum(artistid, 1, pn, 10);
    	return album;
	}
    
    
    @RequestMapping(value="/getArtistInfo")
	public @ResponseBody Map<String,Object> getArtistInfo(Model model, HttpSession session, Integer artistid) {
    	logger.info("通过id获取歌手信息接口，艺人id为：{}",artistid);
    	Map<String,Object>  artistInfo = kuwoArtistservice.getArtistInfo(artistid);
		return artistInfo;
	}
    @RequestMapping(value="/getArtistsByKeyWord")
	public @ResponseBody Map<String,Object> getArtistsByKeyWord(Model model, HttpSession session, String artistName,Integer pn) {
    	logger.info("根据关键字搜索歌手，关键字为：{}",artistName);
    	if(pn==null){
    		pn=0;
    	}
    	Map<String,Object>  artists = kuwoArtistservice.getArtistsByKeyWord(artistName, pn, 10);
    	return artists;
	}
}

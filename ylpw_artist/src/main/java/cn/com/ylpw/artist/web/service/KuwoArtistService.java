package cn.com.ylpw.artist.web.service;

import java.util.Map;

public interface KuwoArtistService {
	
	/**
	 * 根据歌手id获取歌曲列表。
	 * @author	zcy
	 * @createdate 2017年8月8日
	 * @param artistId	歌手id
	 * @param sortby	排序方式 0为最热，1为最新,默认为1
	 * @param pn	页码，从0开始
	 * @param rn	每页行数
	 * @return
	 */
	public Map<String,Object> getMusicsByArtistId(int artistId, int sortby,int pn,int rn);
	
	/**
	 * 根据歌手id回去歌手专辑列表接口。
	 * @author	zcy
	 * @createdate 2017年8月8日
	 * @param artistId	歌手id
	 * @param sortby	排序方式 0为最热，1为最新,默认为1
	 * @param pn	页码，从0开始
	 * @param rn	每页歌数, 默认为100
	 * @return
	 */
	public  Map<String,Object>  getArtistalbum(int artistId,int sortby,int pn,int rn);
	
	/**
	 * 通过id获取歌手信息接口。
	 * @author	zcy
	 * @createdate 2017年8月8日
	 * @param artistId	歌手id
	 * @return
	 */
	public  Map<String,Object>  getArtistInfo(int artistId);
	
	/**
	 * 根据关键字搜索歌手。
	 * @author	zcy
	 * @createdate 2017年8月8日
	 * @param key	搜索关键字
	 * @param pn	页码，从0开始
	 * @param rn	每页行数
	 * @return
	 */
	public  Map<String,Object>  getArtistsByKeyWord(String key,int pn,int rn);
}

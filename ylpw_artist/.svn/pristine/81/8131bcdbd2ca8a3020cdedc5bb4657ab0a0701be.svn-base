package cn.com.ylpw.artist.web.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.com.ylpw.artist.data.CityMapper;
import cn.com.ylpw.artist.data.VenuesMapper;

/**
 * Created by XYUU on 2017/8/10.
 */
@Controller
public class VenuesController {

    private VenuesMapper venuesMapper;
    @Autowired
    private CityMapper cityMapper;

    public VenuesController(VenuesMapper venuesMapper) {
        this.venuesMapper = venuesMapper;
    }

    /**
     * 测试地址：http://localhost:8080/venues?id=481607
     * @param id
     * @return
     */
    @GetMapping("venues")
    @ResponseBody
    public Map<String, Object> venues(long id) {
        return venuesMapper.getVenues(id);
    }
    
    @RequestMapping(value="test")
    public String test(Model model) {
    	Integer cityid = 1;
    	Map<String,Object> city = cityMapper.findByCityid(cityid);
    	model.addAttribute("city", city);
//        return new ModelAndView("/kuwo/test");
        return "index";
    }
}

package com.game.qask.api.controllers;

import javax.servlet.http.HttpServletRequest;

import com.game.qask.model.User;
import com.game.qask.services.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@RequestMapping
@Controller
public class HomeController {
    private final UserService userService;

    public HomeController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ModelAndView getHomePage(){
        ModelAndView mav = new ModelAndView("redirect:" + "home");
        return mav;
    }

    @GetMapping("/home")
    public ModelAndView getHomePage(HttpServletRequest request){
        ModelAndView mav = new ModelAndView("home");
        mav.addObject("name", "home");
        mav.addObject("title", "home");
        mav.addObject("questionnaireId", "1");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth.getAuthorities());
        if (auth != null && !auth.getName().equalsIgnoreCase("anonymousUser")) {
            mav.addObject("isAuth", "true");
            User user = userService.getUserByEmail(auth.getName()).orElse(new User());
            mav.addObject("user", user);
        }
        return mav;
    }
}

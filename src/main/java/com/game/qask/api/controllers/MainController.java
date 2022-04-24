package com.game.qask.api.controllers;

import javax.servlet.http.HttpServletRequest;

import com.game.qask.model.User;
import com.game.qask.services.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@RequestMapping
@Controller
public class MainController {
    private final UserService userService;

    public MainController(UserService userService) {
        this.userService = userService;
    }

    //@PostMapping("/**/submit_login")
    /*public ModelAndView getLogin(HttpServletRequest request){
        String pageURL = request.getParameter("page");
        ModelAndView mav = new ModelAndView("redirect:" + pageURL);

        String login = request.getParameter("login");
        String password = request.getParameter("password");
        System.out.println(login + " | " + password + " | " + pageURL);
        return mav;
    }*/

    @PostMapping("/**/submit_logout")
    public ModelAndView getLogout(HttpServletRequest request){
        ModelAndView mav = new ModelAndView("home");
        setUser(mav);
        System.out.println("asdasdasd");
        return mav;
    }

    @GetMapping("/**/login")
    public ModelAndView getLoginPage(HttpServletRequest request){
        ModelAndView mav = new ModelAndView("login-page");
        setUser(mav);
        return mav;
    }

    @GetMapping("/**/register")
    public ModelAndView getRegisterForm(){
        ModelAndView mav = new ModelAndView("register");
        setUser(mav);
        return mav;
    }

    @GetMapping("/**/registered")
    public ModelAndView getRegisteredPage(){
        ModelAndView mav = new ModelAndView("registered");
        setUser(mav);
        return mav;
    }

    @GetMapping("/**/contacts")
    public ModelAndView getContactsPage(HttpServletRequest request){
        ModelAndView mav = new ModelAndView("contacts-page");
        setUser(mav);
        return mav;
    }

    @GetMapping("/**/partnership")
    public ModelAndView getPartnershipPage(HttpServletRequest request){
        ModelAndView mav = new ModelAndView("partnership-page");
        setUser(mav);
        return mav;
    }

    @GetMapping("/**/support")
    public ModelAndView getSupportPage(HttpServletRequest request){
        ModelAndView mav = new ModelAndView("support-page");
        setUser(mav);
        return mav;
    }

    private void setUser(ModelAndView mav){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth.getAuthorities());
        if (auth != null && !auth.getName().equalsIgnoreCase("anonymousUser")) {
            mav.addObject("isAuth", "true");
            User user = userService.getUserByUserName(auth.getName()).orElse(new User());
            mav.addObject("user", user);
        }
    }

}

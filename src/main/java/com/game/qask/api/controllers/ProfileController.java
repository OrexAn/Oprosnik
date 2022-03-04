package com.game.qask.api.controllers;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;


@RequestMapping("profile")
@Controller
public class ProfileController {
    /*private final PersonService personService;
    private final DocumentService documentService;

    public ProfileController(PersonService personService, DocumentService documentService) {
        this.personService = personService;
        this.documentService = documentService;
    }

    @GetMapping("/{id}")
    public ModelAndView getProfilePage(@PathVariable("id") Long id, HttpServletRequest request){
        ModelAndView mav = new ModelAndView("profile");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth.getAuthorities());
        //TODO при каждом запросе нужно проверять, авторизован ли пользователь.
        // Если да, то передавать isAuth = true;
        // Если страница подразумевает наличие авторизации, то просто отправяем isAuth = true
        // Желательно переделать, чтобы не приходилось в каждом методе прописывать один и тот же код
        mav.addObject("isAuth", "true");
        Person person = personService.getPersonById(id).orElse(new Person());
        mav.addObject("person", person);
        if(person.getAuthority().equalsIgnoreCase("MANAGER") || person.getAuthority().equalsIgnoreCase("ADMIN")){
            ArrayList<Document> documents = documentService.getAllInProgressRequests();
            mav.addObject("requestDocs", documents);
        }else if(person.getAuthority().equalsIgnoreCase("RECRUIT")){
            ArrayList<Document> documents = documentService.getAllOkResponseDocumentsByUserName(person.getUserName());
            mav.addObject("activeProjects", documents);
        }
        return mav;
    }*/
}

package com.game.qask.api.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import com.game.qask.api.UserAuthority;
import com.game.qask.model.User;
import com.game.qask.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("user")
@Controller
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/submit_register")
    public ResponseEntity<Map<String, Object>> addNewPerson(@RequestBody @Valid User user){
        Map<String, Object> map = new HashMap<>();
        Optional<User> oldUser = userService.getUserByEmail(user.getEmail());

        if(oldUser.isPresent()){
            map.put("errorMessage", "Пользователь с такой почтой уже существует");
        }else{
            BCryptPasswordEncoder pe = new BCryptPasswordEncoder();
            user.setPassword(pe.encode(user.getPassword()));
            user.setAuthority(UserAuthority.USER.toString());
            User newUser = userService.addNewUser(user);
        }
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
    /*private final PersonService personService;

    @Autowired
    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @PostMapping("/submit_register")
    public ModelAndView addNewPerson(@RequestBody @Valid Person person){
        ModelAndView mav = new ModelAndView("registered");
        mav.addObject("isAuth", "false");
        BCryptPasswordEncoder pe = new BCryptPasswordEncoder();
        person.setPassword(pe.encode(person.getPassword()));
        personService.addNewPerson(person);
        return mav;
    }

    @GetMapping
    public ModelAndView getAllPeople(){
        ModelAndView mav = new ModelAndView("home");
        List<Person> personList = personService.getAllPeople();
        mav.addObject("list", personList);
        return mav;
    }

    @ResponseBody
    @GetMapping("/{id}")
    public Person getPersonById(@PathVariable("id") Long id){
        return personService.getPersonById(id).orElse(null);
    }

    @PutMapping ("/{id}")
    public ResponseEntity<Map<String,String>> updatePerson(@PathVariable("id") Long id, @Valid @NotNull @RequestBody Person personToUpdate){
        Map<String, String> resp = new LinkedHashMap<>();
        Optional<Person> oldPerson = personService.getPersonById(id);
        Optional<Person> person = Optional.empty();
        if(oldPerson.isPresent()){
            oldPerson.get().setAvatar(personToUpdate.getAvatar());
            person = personService.updatePersonById(id, oldPerson.get());
        }

        if(!person.isPresent()){
            resp.put("Can't find and update person", null);
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        }

        resp.put("Person", person.get().getName());
        return new ResponseEntity<>(resp, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public boolean deletePerson(@PathVariable("id") Long id){
        return personService.deletePersonById(id);
    }

    @ResponseBody
    @GetMapping("/recruits")
    public ResponseEntity<Map<String,Map<String, Map<String, String>>>> getAllRecruits(){
        ArrayList<Person> recruits = personService.getAllRecruits();
        ArrayList<PersonVO> recruitsVO = new ArrayList<>();
        recruits.forEach(p -> {
            recruitsVO.add(new PersonVO(p.getId(), p.getAuthority(), p.getName(), p.getUserName(), p.getAvatar(), p.getNumber(), p.getEmail(), p.getPoints()));
        });
        HashMap<String, Map<String, Map<String, String>>> personsResult = new LinkedHashMap<>();
        personsResult.put("persons", personService.getPersonVOArrayView(recruitsVO));
        return new ResponseEntity<>(personsResult, HttpStatus.OK);
    }*/
}

package com.game.qask.api.controllers;

import com.game.qask.model.Question;
import com.game.qask.model.QuestionnaireAnswer;
import com.game.qask.model.QuestionnaireQuestion;
import com.game.qask.model.User;
import com.game.qask.services.QuestionnaireAnswerService;
import com.game.qask.services.QuestionnaireQuestionService;
import com.game.qask.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RequestMapping("questionnaire")
@Controller
public class QuestionnaireController {
    private final QuestionnaireQuestionService qqService;
    private final QuestionnaireAnswerService qaService;
    private final UserService userService;

    @Autowired
    public QuestionnaireController(QuestionnaireQuestionService qqService, QuestionnaireAnswerService qaService, UserService userService) {
        this.qqService = qqService;
        this.qaService = qaService;
        this.userService = userService;
    }

    @PutMapping("public")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> updateQuestionnaire(@RequestBody QuestionnaireQuestion questionnaire){
        HashMap<String, Object> questionnaireView = new HashMap<>();
        questionnaireView.put("QuestionnaireQuestion", "received");
        questionnaire.getQuestionnairePages().forEach(qp -> {
            qp.setQuestionnaireQuestion(questionnaire);
            qp.getQuestions().forEach(q -> {
                q.setQuestionnairePage(qp);
                q.getSuggestions().forEach(s -> s.setQuestion(q));
            });
        });
        qqService.updateQuestionnaireQuestionById(questionnaire.getId(), questionnaire);
        return new ResponseEntity<>(questionnaireView, HttpStatus.OK);
    }

    @PutMapping("update/answer")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> updateQuestionnaire(@RequestBody QuestionnaireAnswer questionnaire){
        HashMap<String, Object> questionnaireView = new HashMap<>();
        questionnaireView.put("QuestionnaireAnswer", "received");
        questionnaire.setUser(userService.getUserById(questionnaire.getCreatorID()).orElse(new User()));
        questionnaire.getAnswers().forEach(a -> {
            a.setQuestionnaireAnswer(questionnaire);
        });
        qaService.updateQuestionnaireAnswerById(questionnaire.getId(), questionnaire);
        return new ResponseEntity<>(questionnaireView, HttpStatus.OK);
    }

    @PostMapping("new/question")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> createNewQuestionnaireQuestion(@RequestBody QuestionnaireQuestion questionnaire){
        HashMap<String, Object> questionnaireView = new HashMap<>();
        questionnaire.setUser(userService.getUserById(questionnaire.getCreatorID()).orElse(new User()));
        QuestionnaireQuestion qq = qqService.addQuestionnaireQuestion(questionnaire);
        questionnaireView.put("newQuestionnaireId", qq.getId());

        return new ResponseEntity<>(questionnaireView, HttpStatus.OK);
    }

    @PostMapping("new/answer")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> createNewQuestionnaireAnswer(@RequestBody QuestionnaireAnswer questionnaire){
        HashMap<String, Object> questionnaireView = new HashMap<>();
        questionnaire.setUser(userService.getUserById(questionnaire.getCreatorID()).orElse(new User()));
        QuestionnaireAnswer qq = qaService.addQuestionnaireAnswer(questionnaire);
        questionnaireView.put("newQuestionnaireId", qq.getId());

        return new ResponseEntity<>(questionnaireView, HttpStatus.OK);
    }

    @GetMapping("builder/{id}")
    public ModelAndView getBuilderPage(@PathVariable("id") Long id, HttpServletRequest request){
        ModelAndView mav = new ModelAndView("builder");
        Optional<QuestionnaireQuestion> qQuest = qqService.getQuestionnaireQuestionById(id);
        QuestionnaireQuestion qq;
        if(qQuest.isPresent()){
            qq = qQuest.get();
            mav.addObject("questionnaireId", id);
            mav.addObject("questionnaireTitle", qq.getTitle());
            mav.addObject("questionnaireStatus", qq.getStatus());
        }else{
            return null;
        }


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth.getAuthorities());
        if (auth != null && !auth.getName().equalsIgnoreCase("anonymousUser")) {
            mav.addObject("isAuth", "true");
            User user = userService.getUserByEmail(auth.getName()).orElse(new User());
            mav.addObject("person", user);
        }
        return mav;
    }

    @GetMapping("/{id}")
    public ModelAndView getQuestionnairePage(@PathVariable("id") Long id, HttpServletRequest request){
        ModelAndView mav = new ModelAndView("questionnaire");
        mav.addObject("questionnaireId", id);

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth.getAuthorities());
        //TODO при каждом запросе нужно проверять, авторизован ли пользователь.
        // Если да, то передавать isAuth = true;
        // Если страница подразумевает наличие авторизации, то просто отправяем isAuth = true
        mav.addObject("isAuth", "true");

        return mav;
    }

    @GetMapping("/thanks")
    public ModelAndView getThanksPage(HttpServletRequest request){
        ModelAndView mav = new ModelAndView("thanks");

        return mav;
    }

    @GetMapping("load/{id}")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> getQuestionnaireQuestions(@PathVariable("id") Long id, HttpServletRequest request){
        Optional<QuestionnaireQuestion> qq = qqService.getQuestionnaireQuestionById(id);
        Map<String, Object> questionnaireQuestionVO;
        if(qq.isPresent()){ //TODO && status
            questionnaireQuestionVO = qqService.getQuestionnaireQuestionVO(qq.get());
        }else{
            questionnaireQuestionVO = new HashMap<>();
            questionnaireQuestionVO.put("errorMessage", "Can't get questionnaire with id = " + id);
        }


        return new ResponseEntity<>(questionnaireQuestionVO, HttpStatus.OK);
    }

    @GetMapping("/answers/stat/load/{id}")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> getQuestAnswersStats(@PathVariable("id") Long id, HttpServletRequest request){
        QuestionnaireQuestion qq = qqService.getQuestionnaireQuestionById(id).get();
        ArrayList<Question> questions = qqService.getQuestionsByQuestQuestId(qq.getId());
        ArrayList<ArrayList<Object>> result = qaService.getQAStatsByQuestQuest(qq.getId(), questions);

        ArrayList<String> typesArray = qqService.getStatTypes(questions);
        ArrayList<String> answersTitles = qqService.getStatTitles(questions);

        Map<String, Object> questAnswerStatsVO = new HashMap<>();
        questAnswerStatsVO.put("answersStat", result);
        questAnswerStatsVO.put("answersTypes", typesArray);
        questAnswerStatsVO.put("answersTitles", answersTitles);

        return new ResponseEntity<>(questAnswerStatsVO, HttpStatus.OK);
    }

    @GetMapping("/links/{userName}")
    @ResponseBody
    public ResponseEntity<ArrayList<String[]>> getQuestionnairesLinks(@PathVariable("userName") String userName, HttpServletRequest request){
        ArrayList<String[]> titlesAndIds = qqService.getTitlesAndIdsByCreatorName(userName);

        return new ResponseEntity<>(titlesAndIds, HttpStatus.OK);
    }

    @GetMapping("/results/{id}")
    public ModelAndView getResultsPage(@PathVariable("id") Long id, HttpServletRequest request){
        ModelAndView mav = new ModelAndView("results");
        Optional<QuestionnaireQuestion> qQuest = qqService.getQuestionnaireQuestionOptionalById(id);
        QuestionnaireQuestion qq;
        if(qQuest.isPresent()){
            qq = qQuest.get();
            mav.addObject("questionnaireId", id);
            mav.addObject("questionnaireTitle", qq.getTitle());
            mav.addObject("questionnaireStatus", qq.getStatus());
        }else{
            return null;
        }


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth.getAuthorities());
        //TODO при каждом запросе нужно проверять, авторизован ли пользователь.
        // Если да, то передавать isAuth = true;
        // Если страница подразумевает наличие авторизации, то просто отправяем isAuth = true
        mav.addObject("isAuth", "true");

        return mav;
    }

    @GetMapping("/preferences/{id}")
    public ModelAndView getPreferencesPage(@PathVariable("id") Long id, HttpServletRequest request){
        ModelAndView mav = new ModelAndView("preferences");
        Optional<QuestionnaireQuestion> qQuest = qqService.getQuestionnaireQuestionById(id);
        QuestionnaireQuestion qq;
        if(qQuest.isPresent()){
            qq = qQuest.get();
            mav.addObject("questionnaireId", id);
            mav.addObject("questionnaireTitle", qq.getTitle());
            mav.addObject("questionnaireStatus", qq.getStatus());
        }else{
            return null;
        }

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth.getAuthorities());
        //TODO при каждом запросе нужно проверять, авторизован ли пользователь.
        // Если да, то передавать isAuth = true;
        // Если страница подразумевает наличие авторизации, то просто отправяем isAuth = true
        mav.addObject("isAuth", "true");

        return mav;
    }

    @GetMapping("/share/{id}")
    public ModelAndView getSharePage(@PathVariable("id") Long id, HttpServletRequest request){
        ModelAndView mav = new ModelAndView("share");
        Optional<QuestionnaireQuestion> qQuest = qqService.getQuestionnaireQuestionById(id);
        QuestionnaireQuestion qq;
        if(qQuest.isPresent()){
            qq = qQuest.get();
            mav.addObject("questionnaireId", id);
            mav.addObject("questionnaireTitle", qq.getTitle());
            mav.addObject("questionnaireStatus", qq.getStatus());
        }else{
            return null;
        }


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth.getAuthorities());
        //TODO при каждом запросе нужно проверять, авторизован ли пользователь.
        // Если да, то передавать isAuth = true;
        // Если страница подразумевает наличие авторизации, то просто отправяем isAuth = true
        mav.addObject("isAuth", "true");

        return mav;
    }
}

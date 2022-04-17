package com.game.qask.api.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.game.qask.api.documents.QuestionnaireType;
import com.game.qask.model.Questionnaire;
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
import java.util.HashMap;
import java.util.Map;

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
        questionnaire.setUser(userService.getUserById(questionnaire.getCreatorID()).orElse(new User()));
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

    @PostMapping("new")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> createNewQuestionnaire(@RequestBody QuestionnaireQuestion questionnaire){
        HashMap<String, Object> questionnaireView = new HashMap<>();


        questionnaire.setUser(userService.getUserById(questionnaire.getCreatorID()).orElse(new User()));
        QuestionnaireQuestion qq = qqService.addQuestionnaireQuestion(questionnaire);
        questionnaireView.put("newQuestionnaireId", qq.getId());

        return new ResponseEntity<>(questionnaireView, HttpStatus.OK);
    }

    @GetMapping("builder/{id}")
    public ModelAndView getBuilderPage(@PathVariable("id") Long id, HttpServletRequest request){
        ModelAndView mav = new ModelAndView("builder");
        mav.addObject("questionnaireId", id);

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth.getAuthorities());
        if (auth != null && !auth.getName().equalsIgnoreCase("anonymousUser")) {
            mav.addObject("isAuth", "true");
            User user = userService.getUserByName(auth.getName()).orElse(new User());
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

    @GetMapping("/load/{id}")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> getQuestionnaireQuestions(@PathVariable("id") Long id, HttpServletRequest request){
        QuestionnaireQuestion qq = qqService.getQuestionnaireQuestionById(id);

        Map<String, Object> questionnaireQuestionVO = qqService.getQuestionnaireQuestionVO(qq);

        return new ResponseEntity<>(questionnaireQuestionVO, HttpStatus.OK);
    }

    @GetMapping("/results/{id}")
    public ModelAndView getResultsPage(@PathVariable("id") Long id, HttpServletRequest request){
        ModelAndView mav = new ModelAndView("results");
        mav.addObject("questionnaireId", id);

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
        mav.addObject("questionnaireId", id);

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth.getAuthorities());
        //TODO при каждом запросе нужно проверять, авторизован ли пользователь.
        // Если да, то передавать isAuth = true;
        // Если страница подразумевает наличие авторизации, то просто отправяем isAuth = true
        mav.addObject("isAuth", "true");

        return mav;
    }
    /*private final DocumentService documentService;
    private final PersonService personService;

    @Autowired
    public DocumentController(DocumentService documentService, PersonService personService) {
        this.documentService = documentService;
        this.personService = personService;
    }

    @ResponseBody
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getDocumentById(@PathVariable Long id){
        return new ResponseEntity<>(documentService.getDocumentById(id), HttpStatus.OK);
    }

    @PostMapping()
    @ResponseBody
    public ResponseEntity<Map<String, Object>> addNewDocument(@RequestBody Document document){
        HashMap<String, Object> documentView = new HashMap<>();
        documentView.put("Document", "received");
        document.setPerson(personService.getPersonById(document.getUserID()).orElse(new Person()));
        if(document.getStatus()==DocStatus.OK && document.getDocType()== DocType.RESPONSE){
            documentService.updateRequestInProgressDocumentStatusByUserName(document.getReceiver(), DocStatus.ACCEPTED);
        }
        if(document.getStatus() == DocStatus.DONE && document.getDocType() == DocType.REPORT){
            documentService.updateResponseOkStatusByDocId(document.getTargetDocId(), DocStatus.IN_PROGRESS);
        }
        documentService.addDocument(document);
        return new ResponseEntity<>(documentView, HttpStatus.OK);
    }

    @PostMapping("/accept-report")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> acceptReport(@RequestBody Document document){
        HashMap<String, Object> documentView = new HashMap<>();
        documentView.put("Document", "received"); //TODO начислить баллы
        Document doc = documentService.getDocumentOptionalById(document.getTargetDocId()).orElse(null);
        if(doc != null){
            String s = doc.getDescription().split("Cost:")[1];
            String s2 = s.split(";")[0];
            s2 = s2.trim();
            Integer points = 0;
            try{
                points = Integer.parseInt(s2);
            }catch (NumberFormatException ex){
                System.err.println(ex.getMessage());
            }
            Map<String, Object> docView = documentService.getDocumentById(document.getTargetDocId());
            Object obj = docView.get("receiver");
            String receiver = null;
            if((obj instanceof String) && obj != null){
                receiver = (String)obj;
                personService.addPointsToPersonByUserName(receiver, points);
            }


        }
        documentService.updateReportDoneStatusByDocId(document.getId(), DocStatus.OK);
        documentService.updateResponseInProgressStatusByDocId(document.getTargetDocId(), document.getStatus());
        return new ResponseEntity<>(documentView, HttpStatus.OK);
    }

    @GetMapping("/request/{username}")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> getInProgressRequestByUserName(@PathVariable String username){
        Map<String, Object> documentView;

        documentView = documentService.getInProgressRequestByUserName(username);

        return new ResponseEntity<>(documentView, HttpStatus.OK);
    }
    @GetMapping("/projectsHistory/{username}")
    public ResponseEntity<Map<String,Map<String, Map<String, String>>>> getProjectsHistory(@PathVariable String username){
        ArrayList<Document> documents = documentService.getProjectsHistoryByUsername(username);
        ArrayList<DocumentVO> documentVOS = new ArrayList<>();
        documents.forEach(d -> {
            documentVOS.add(new DocumentVO(d.getId(), d.getDocType(), d.getDate(), d.getStatus(), d.getUsername(), d.getDescription(), d.getReceiver(), d.getUserID(), d.getTargetDocId()));
        });
        HashMap<String, Map<String, Map<String, String>>> documentsResult = new LinkedHashMap<>();
        documentsResult.put("documents", documentService.getDocumentVOArrayView(documentVOS));
        return new ResponseEntity<>(documentsResult, HttpStatus.OK);
    }

    @GetMapping("/reports")
    public ResponseEntity<Map<String,Map<String, Map<String, String>>>> getAllDoneReports(){
        ArrayList<Document> documents = documentService.getAllDoneReports();
        ArrayList<DocumentVO> documentVOS = new ArrayList<>();
        documents.forEach(d -> {
            documentVOS.add(new DocumentVO(d.getId(), d.getDocType(), d.getDate(), d.getStatus(), d.getUsername(), d.getDescription(), d.getReceiver(), d.getUserID(), d.getTargetDocId()));
        });
        HashMap<String, Map<String, Map<String, String>>> documentsResult = new LinkedHashMap<>();
        documentsResult.put("documents", documentService.getDocumentVOArrayView(documentVOS));
        return new ResponseEntity<>(documentsResult, HttpStatus.OK);
    }

    @PutMapping("/remove/{id}")
    public ResponseEntity<Map<String, String>> removeProject(@PathVariable Long id){  //in fact project just goes to reject status
        Map<String, String> result = new HashMap<>();
        documentService.updateDocStatusByDocId(id, DocStatus.REJECTED);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }*/
}

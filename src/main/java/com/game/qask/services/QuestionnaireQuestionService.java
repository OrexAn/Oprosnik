package com.game.qask.services;

import com.game.qask.api.documents.QuestionnaireStatus;
import com.game.qask.dao.QuestionnaireQuestionDAO;
import com.game.qask.model.Question;
import com.game.qask.model.QuestionnaireQuestion;
import com.game.qask.view.QuestionnaireVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * сервис по сути делает некоторые манипуляции с воходными данными (запросами к "базе") и делает запрос к DAO слою
 * после чего возвращает требуемые данные
 */
@Service
public class QuestionnaireQuestionService {

    private final QuestionnaireQuestionDAO questionnaireQuestionDAO;

    @Autowired
    public QuestionnaireQuestionService(QuestionnaireQuestionDAO questionnaireQuestionDAO) {
        this.questionnaireQuestionDAO = questionnaireQuestionDAO;
    }

    public QuestionnaireQuestion addQuestionnaireQuestion(QuestionnaireQuestion questionnaireQuestion){
        return questionnaireQuestionDAO.save(questionnaireQuestion);
    }
    public Optional<QuestionnaireQuestion> getQuestionnaireQuestionById(Long id){
        Optional<QuestionnaireQuestion> optionalQuestionnaireQuestion = questionnaireQuestionDAO.findById(id);

        return optionalQuestionnaireQuestion;
    }

    public Optional<QuestionnaireQuestion> getQuestionnaireQuestionOptionalById(Long id){
        return questionnaireQuestionDAO.findById(id);
    }

    public Optional<QuestionnaireQuestion> updateQuestionnaireQuestionById(Long id, QuestionnaireQuestion newQuestQuest){
        deletePagesByQQId(id);
        QuestionnaireQuestion oldQuestionnaireQuestion = questionnaireQuestionDAO.findById(id).orElse(null);
        if(oldQuestionnaireQuestion == null){
            return Optional.empty();
        }
        if (newQuestQuest.getDate() != null) {
            oldQuestionnaireQuestion.setDate(newQuestQuest.getDate());
        }
        if (newQuestQuest.getQuestionnaireType() != null) {
            oldQuestionnaireQuestion.setQuestionnaireType(newQuestQuest.getQuestionnaireType());
        }
        if (newQuestQuest.getQuestionnairePages() != null) {
            oldQuestionnaireQuestion.setQuestionnairePages(newQuestQuest.getQuestionnairePages());
        }
        if (newQuestQuest.getStatus() != null) {
            oldQuestionnaireQuestion.setStatus(newQuestQuest.getStatus());
        }
        if (newQuestQuest.getCreatorID() != null) {
            oldQuestionnaireQuestion.setCreatorID(newQuestQuest.getCreatorID());
        }
        if (newQuestQuest.getCreatorName() != null) {
            oldQuestionnaireQuestion.setCreatorName(newQuestQuest.getCreatorName());
        }
        if (newQuestQuest.getTitle() != null) {
            oldQuestionnaireQuestion.setTitle(newQuestQuest.getTitle());
        }
        if (newQuestQuest.getUser() != null) {
            oldQuestionnaireQuestion.setUser(newQuestQuest.getUser());
        }
        return Optional.ofNullable(questionnaireQuestionDAO.save(oldQuestionnaireQuestion));
    }

    public void deletePagesByQQId(Long id){
        questionnaireQuestionDAO.deletePagesByQQId(id);
    }

    /*public Map<String, Map<String, String>> getQuestionnaireQuestionVOArrayView(ArrayList<QuestionnaireVO> questionnaireQuestionVOs){

        HashMap<String, Map<String, String>> questionnaireQuestionVOsResult = new LinkedHashMap<>();
        for(int i = 0; i < questionnaireQuestionVOs.size(); i++){
            questionnaireQuestionVOsResult.put(String.valueOf(i), questionnaireQuestionVOs.get(i).getMapParameters());
        }
        return questionnaireQuestionVOsResult;
    }*/

    public Map<String, Object> getQuestionnaireQuestionVO(QuestionnaireQuestion questionnaireQuestion){

        Map<String, Object> questionnaireQuestionVOsResult = questionnaireQuestion.getVO();

        return questionnaireQuestionVOsResult;
    }

    public Optional<QuestionnaireQuestion> updateStatusById(Long id, QuestionnaireStatus newStatus){
        QuestionnaireQuestion oldQuestionnaire = questionnaireQuestionDAO.findById(id).orElse(null);
        if(oldQuestionnaire == null){
            return Optional.empty();
        }
        oldQuestionnaire.setStatus(newStatus);
        return Optional.ofNullable(questionnaireQuestionDAO.save(oldQuestionnaire));
    }

    public ArrayList<String[]> getTitlesAndIdsByCreatorName(String creatorName) {
        ArrayList<QuestionnaireQuestion> qqs = null;
        try {
            qqs = questionnaireQuestionDAO.getQuestionnaireQuestionsByCreatorName(creatorName);
        }catch (Exception exception){
            System.out.println("WARNING: Can't get questionnaire questions by creator name");
        }

        ArrayList<String[]> titlesAndIds = new ArrayList<>();
        if(qqs != null){
            qqs.forEach(qq -> {
                String[] titlesAndIdsPair = new String[2];
                titlesAndIdsPair[0] = qq.getTitle();
                titlesAndIdsPair[1] = qq.getId().toString();
                titlesAndIds.add(titlesAndIdsPair);
            });
        }
        return titlesAndIds;
    }

    public ArrayList<Question> getQuestionsByQuestQuestId(Long id) {
        return questionnaireQuestionDAO.getQuestionsByQQId(id);
    }

    public ArrayList<QuestionnaireQuestion> getQuestionnaireQuestions() {
        return questionnaireQuestionDAO.findAll();
    }

    public ArrayList<String> getStatTypes(ArrayList<Question> questions) {
        ArrayList<String> arr = new ArrayList<>();
        for (int i = 0; i < questions.size(); i++){
            arr.add(questions.get(i).getQuestionType().toString());
        }
        return arr;
    }

    public ArrayList<String> getStatTitles(ArrayList<Question> questions) {
        ArrayList<String> arr = new ArrayList<>();
        for (int i = 0; i < questions.size(); i++){
            arr.add(questions.get(i).getTitle());
        }
        return arr;
    }
}

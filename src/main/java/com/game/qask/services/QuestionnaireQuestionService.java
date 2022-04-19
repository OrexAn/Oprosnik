package com.game.qask.services;

import com.game.qask.api.documents.QuestionnaireStatus;
import com.game.qask.dao.QuestionnaireQuestionDAO;
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
    public QuestionnaireQuestion getQuestionnaireQuestionById(Long id){
        Optional<QuestionnaireQuestion> optionalQuestionnaireQuestion = questionnaireQuestionDAO.findById(id);
        return optionalQuestionnaireQuestion.get();
    }

    public Optional<QuestionnaireQuestion> getQuestionnaireQuestionOptionalById(Long id){
        return questionnaireQuestionDAO.findById(id);
    }

    public Optional<QuestionnaireQuestion> updateQuestionnaireQuestionById(Long id, QuestionnaireQuestion newQuestionnaireQuestion){
        QuestionnaireQuestion oldQuestionnaireQuestion = questionnaireQuestionDAO.findById(id).orElse(null);
        if(oldQuestionnaireQuestion == null){
            return Optional.empty();
        }
        oldQuestionnaireQuestion.setDate(newQuestionnaireQuestion.getDate());
        oldQuestionnaireQuestion.setQuestionnaireType(newQuestionnaireQuestion.getQuestionnaireType());
        oldQuestionnaireQuestion.setQuestionnairePages(newQuestionnaireQuestion.getQuestionnairePages());
        oldQuestionnaireQuestion.setStatus(newQuestionnaireQuestion.getStatus());
        oldQuestionnaireQuestion.setCreatorID(newQuestionnaireQuestion.getCreatorID());
        oldQuestionnaireQuestion.setCreatorName(newQuestionnaireQuestion.getCreatorName());
        oldQuestionnaireQuestion.setTitle(newQuestionnaireQuestion.getTitle());
        oldQuestionnaireQuestion.setUser(newQuestionnaireQuestion.getUser());
        return Optional.ofNullable(questionnaireQuestionDAO.save(oldQuestionnaireQuestion));
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
        ArrayList<QuestionnaireQuestion> qqs = questionnaireQuestionDAO.getQuestionnaireQuestionsByCreatorName(creatorName);
        ArrayList<String[]> titlesAndIds = new ArrayList<>();
        qqs.forEach(qq -> {
            String[] titlesAndIdsPair = new String[2];
            titlesAndIdsPair[0] = qq.getTitle();
            titlesAndIdsPair[1] = qq.getId().toString();
            titlesAndIds.add(titlesAndIdsPair);
        });
        return titlesAndIds;
    }
}

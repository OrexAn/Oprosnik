package com.game.qask.services;

import com.game.qask.api.documents.QuestionnaireStatus;
import com.game.qask.api.documents.QuestionnaireView;
import com.game.qask.dao.QuestionnaireAnswerDAO;
import com.game.qask.model.QuestionnaireAnswer;
import com.game.qask.view.QuestionnaireVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * сервис по сути делает некоторые манипуляции с воходными данными (запросами к "базе") и делает запрос к DAO слою
 * после чего возвращает требуемые данные
 */
@Service
public class QuestionnaireAnswerService {

    private final QuestionnaireAnswerDAO questionnaireAnswerDAO;

    @Autowired
    public QuestionnaireAnswerService(QuestionnaireAnswerDAO questionnaireAnswerDAO) {
        this.questionnaireAnswerDAO = questionnaireAnswerDAO;
    }

    public QuestionnaireAnswer addQuestionnaireAnswer(QuestionnaireAnswer questionnaireAnswer){
        return questionnaireAnswerDAO.save(questionnaireAnswer);
    }
    public Map<String, Object> getQuestionnaireAnswerById(Long id){
        Map<String, Object> resultMap = new HashMap<>();
        if(!id.equals(-1L)){
            Optional<QuestionnaireAnswer> optionalQuestionnaireAnswer = questionnaireAnswerDAO.findById(id);
            QuestionnaireView questionnaireView;
            try {
                questionnaireView = new QuestionnaireView(optionalQuestionnaireAnswer.get());
                resultMap = questionnaireView.getParams();
            }catch (NoSuchElementException nsEx){
                nsEx.printStackTrace();
            }
        }
        else{
            resultMap.put("id", new Long(-1));
        }
        return resultMap;
    }

    public Optional<QuestionnaireAnswer> getQuestionnaireAnswerOptionalById(Long id){
        return questionnaireAnswerDAO.findById(id);
    }

    public Optional<QuestionnaireAnswer> updateQuestionnaireAnswerById(Long id, QuestionnaireAnswer newQuestionnaireAnswer){
        QuestionnaireAnswer oldQuestionnaireAnswer = questionnaireAnswerDAO.findById(id).orElse(null);
        if(oldQuestionnaireAnswer == null){
            return Optional.empty();
        }
        oldQuestionnaireAnswer.setDate(oldQuestionnaireAnswer.getDate());
        oldQuestionnaireAnswer.setQuestionnaireType(oldQuestionnaireAnswer.getQuestionnaireType());
        oldQuestionnaireAnswer.setAnswers(oldQuestionnaireAnswer.getAnswers());
        oldQuestionnaireAnswer.setStatus(oldQuestionnaireAnswer.getStatus());
        oldQuestionnaireAnswer.setCreatorID(oldQuestionnaireAnswer.getCreatorID());
        oldQuestionnaireAnswer.setCreatorName(oldQuestionnaireAnswer.getCreatorName());
        oldQuestionnaireAnswer.setTitle(oldQuestionnaireAnswer.getTitle());
        oldQuestionnaireAnswer.setUser(oldQuestionnaireAnswer.getUser());
        return Optional.ofNullable(questionnaireAnswerDAO.save(oldQuestionnaireAnswer));
    }

    public Map<String, Map<String, String>> getQuestionnaireAnswerVOArrayView(ArrayList<QuestionnaireVO> questionnaireAnswerVOs){

        HashMap<String, Map<String, String>> questionnaireAnswerVOsResult = new LinkedHashMap<>();
        for(int i = 0; i < questionnaireAnswerVOs.size(); i++){
            questionnaireAnswerVOsResult.put(String.valueOf(i), questionnaireAnswerVOs.get(i).getMapParameters());
        }
        return questionnaireAnswerVOsResult;
    }

    public Optional<QuestionnaireAnswer> updateStatusById(Long id, QuestionnaireStatus newStatus){
        QuestionnaireAnswer oldQuestionnaire = questionnaireAnswerDAO.findById(id).orElse(null);
        if(oldQuestionnaire == null){
            return Optional.empty();
        }
        oldQuestionnaire.setStatus(newStatus);
        return Optional.ofNullable(questionnaireAnswerDAO.save(oldQuestionnaire));
    }
}

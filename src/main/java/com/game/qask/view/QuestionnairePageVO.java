package com.game.qask.view;

import com.game.qask.model.QuestionnairePage;

import java.util.*;

public class QuestionnairePageVO {
    private String orderNum;
    private Long id;

    private Map<String, Object> questionnairePageVO;

    public QuestionnairePageVO(String number, Long id) {
        this.orderNum = number;
        this.id = id;
    }

    public QuestionnairePageVO(QuestionnairePage questionnairePage) {
        this(questionnairePage.getOrderNum(), questionnairePage.getId());
        buildQuestionnairePageVO(questionnairePage);
    }

    public String getOrderNum() {
        return orderNum;
    }

    public void setNumber(String number) {
        this.orderNum = number;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void buildQuestionnairePageVO(QuestionnairePage questionnairePage){
        ArrayList<Object> questions = getQuestionsSet(questionnairePage);
        questionnairePageVO = getBaseParameters();
        questionnairePageVO.put("questions", questions);
    }

    public Map<String, Object> getBaseParameters(){
        Map<String, Object> questionnairePageVOParameters = new HashMap<>();
        questionnairePageVOParameters.put("id", getId().toString());
        questionnairePageVOParameters.put("orderNum", getOrderNum());

        return questionnairePageVOParameters;
    }

    private ArrayList<Object> getQuestionsSet(QuestionnairePage questionnairePage){
        ArrayList<Object> params = new ArrayList<>();
        questionnairePage.getQuestions().forEach(q -> params.add(q.getVO()));
        return params;
    }

    public Map<String, Object> get(){
        return questionnairePageVO;
    }
}

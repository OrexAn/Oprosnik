package com.game.qask.view;

import com.game.qask.api.documents.QuestionnaireStatus;
import com.game.qask.api.documents.QuestionnaireType;
import com.game.qask.model.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

public class QuestionnaireVO {
    private String title;
    private QuestionnaireType questionnaireType;
    private LocalDateTime date;
    private QuestionnaireStatus status;
    private String creatorName;
    private Long creatorID;

    private Map<String, Object> questionnaireVO;

    public QuestionnaireVO(String title, QuestionnaireType questionnaireType, LocalDateTime date, QuestionnaireStatus status, String creatorName, Long creatorID) {
        this.title = title;
        this.questionnaireType = questionnaireType;
        this.date = date;
        this.status = status;
        this.creatorName = creatorName;
        this.creatorID = creatorID;
    }

    public QuestionnaireVO(Questionnaire questionnaire){
        this(questionnaire.getTitle(), questionnaire.getQuestionnaireType(), questionnaire.getDate(),
                questionnaire.getStatus(), questionnaire.getCreatorName(), questionnaire.getCreatorID());
        switch (questionnaire.getQuestionnaireType()){
            case QUESTION:
                buildQuestionnaireQuestionVO(questionnaire);
                break;
            case ANSWER:
                buildQuestionnaireAnswerVO(questionnaire);
                break;
        }
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public QuestionnaireType getQuestionnaireType() {
        return questionnaireType;
    }

    public void setQuestionnaireType(QuestionnaireType questionnaireType) {
        this.questionnaireType = questionnaireType;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public QuestionnaireStatus getStatus() {
        return status;
    }

    public void setStatus(QuestionnaireStatus status) {
        this.status = status;
    }

    public String getCreatorName() {
        return creatorName;
    }

    public void setCreatorName(String creatorName) {
        this.creatorName = creatorName;
    }

    public Long getCreatorID() {
        return creatorID;
    }

    public void setCreatorID(Long creatorID) {
        this.creatorID = creatorID;
    }

    public void buildQuestionnaireQuestionVO(Questionnaire questionnaire){
        QuestionnaireQuestion qq = (QuestionnaireQuestion) questionnaire;
        ArrayList<Object> pages = getPagesSet(qq);
        questionnaireVO = getBaseParameters();
        questionnaireVO.put("id", qq.getId().toString());
        questionnaireVO.put("pages", pages);
    }

    public Map<String, Object> buildQuestionnaireAnswerVO(Questionnaire questionnaire){
        QuestionnaireAnswer qa = (QuestionnaireAnswer) questionnaire;
        Map<String, Object> params;
        params = getBaseParameters();

        return params;
    }

    public Map<String, Object> getBaseParameters(){
        Map<String, Object> questionnaireAnswerVOParameters = new TreeMap<>();
        questionnaireAnswerVOParameters.put("title", getTitle());
        questionnaireAnswerVOParameters.put("date", getDate().toString());
        questionnaireAnswerVOParameters.put("status", getStatus().toString());
        questionnaireAnswerVOParameters.put("type", getQuestionnaireType().toString());
        questionnaireAnswerVOParameters.put("creator", getCreatorName());
        questionnaireAnswerVOParameters.put("creatorID", getCreatorID().toString());

        return questionnaireAnswerVOParameters;
    }

    private ArrayList<Object> getPagesSet(QuestionnaireQuestion qq){
        ArrayList<Object> params = new ArrayList<>();
        qq.getQuestionnairePages().forEach(qp -> params.add(qp.getVO()));
        return params;
    }

    public Map<String, Object> get(){
        return questionnaireVO;
    }
}

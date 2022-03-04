package com.game.qask.view;

import com.game.qask.api.documents.QuestionnaireStatus;
import com.game.qask.api.documents.QuestionnaireType;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

public class QuestionnaireVO {
    private Long id;
    private String title;
    private QuestionnaireType questionnaireType;
    private LocalDateTime date;
    private QuestionnaireStatus status;
    private String creatorName;
    private Long creatorID;

    public QuestionnaireVO(Long id, String title, QuestionnaireType questionnaireType, LocalDateTime date, QuestionnaireStatus status, String creatorName, Long creatorID) {
        this.id = id;
        this.title = title;
        this.questionnaireType = questionnaireType;
        this.date = date;
        this.status = status;
        this.creatorName = creatorName;
        this.creatorID = creatorID;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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


    public Map<String, String> getMapParameters(){
        HashMap<String, String> questionnaireAnswerVOParameters = new HashMap<>();
        questionnaireAnswerVOParameters.put("id", getId().toString());
        questionnaireAnswerVOParameters.put("title", getTitle());
        questionnaireAnswerVOParameters.put("date", getDate().toString());
        questionnaireAnswerVOParameters.put("status", getStatus().toString());
        questionnaireAnswerVOParameters.put("type", getQuestionnaireType().toString());
        questionnaireAnswerVOParameters.put("creator", getCreatorName());
        questionnaireAnswerVOParameters.put("creatorID", getCreatorID().toString());

        return questionnaireAnswerVOParameters;
    }
}

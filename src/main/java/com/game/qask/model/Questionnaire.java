package com.game.qask.model;

import com.game.qask.api.documents.QuestionnaireStatus;
import com.game.qask.api.documents.QuestionnaireType;
import com.game.qask.view.QuestionnaireVO;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.TreeMap;

@MappedSuperclass
public abstract class Questionnaire {
    @Column(name = "title")
    private String title;
    @Column(name = "questionnaire_type")
    private QuestionnaireType questionnaireType;
    //private DocType qType;
    @Column(name = "date")
    private LocalDateTime date;
    @Column(name = "status")
    private QuestionnaireStatus status;
    @Column(name = "creator_name")
    private String creatorName;
    @Column(name = "creator_id")
    private Long creatorID;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="user", nullable=false)
    private User user;

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Map<String, Object> getVO(){
        QuestionnaireVO questionnaireVO = new QuestionnaireVO(this);
        return questionnaireVO.get();
    }
}

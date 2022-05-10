package com.game.qask.model;

import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@DynamicInsert
public class QuestionnaireAnswer extends Questionnaire{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "GeneratorQA1")
    @SequenceGenerator(name="GeneratorQA1", sequenceName = "seqQA1", allocationSize = 1)
    @Column(name = "id")
    private final Long id;
    @Column(name = "time_spend")
    private Long timeSpend;
    @OneToMany(cascade = CascadeType.ALL, mappedBy="questionnaireAnswer")
    private List<Answer> answers;
    @Column(name = "q_question_id")
    private Long qQuestionId;

    public QuestionnaireAnswer(Long id) {
        this.id = id;
    }

    public QuestionnaireAnswer() {
        this.id = -1L;
    }

    public Long getId() {
        return id;
    }

    public Long getTimeSpend() {
        return timeSpend;
    }

    public void setTimeSpend(Long timeSpend) {
        this.timeSpend = timeSpend;
    }

    public List<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<Answer> answers) {
        this.answers = answers;
    }

    public Long getqQuestionId() {
        return qQuestionId;
    }

    public void setqQuestionId(Long qQuestionId) {
        this.qQuestionId = qQuestionId;
    }
}

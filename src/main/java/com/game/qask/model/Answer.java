package com.game.qask.model;

import com.game.qask.api.documents.AnswerType;
import com.game.qask.api.documents.QuestionType;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@DynamicInsert
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "GeneratorAn1")
    @SequenceGenerator(name="GeneratorAn1", sequenceName = "seqAn1", allocationSize = 1)
    @Column(name = "id")
    private Long id;
    @Column(name = "text")
    private String text;
    @Column(name = "answer_type")
    private AnswerType answerType;
    @Column(name = "order_num")
    private String orderNum;
    @ManyToOne
    @JoinColumn(name="questionnaire_answer_id", nullable=false, columnDefinition = "bigint default -1")
    private QuestionnaireAnswer questionnaireAnswer;

    public Answer(Long id) {
        this.id = id;
    }
    public Answer() {
        this.id = -1L;
    }

    public QuestionnaireAnswer getQuestionnaireAnswer() {
        return questionnaireAnswer;
    }

    public void setQuestionnaireAnswer(QuestionnaireAnswer questionnaireAnswer) {
        this.questionnaireAnswer = questionnaireAnswer;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public AnswerType getAnswerType() {
        return answerType;
    }

    public void setAnswerType(AnswerType answerType) {
        this.answerType = answerType;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getOrderNum() {
        return orderNum;
    }

    public void setOrderNum(String orderNum) {
        this.orderNum = orderNum;
    }
}

package com.game.qask.model;

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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="questionnaire_answer_id", nullable=false)
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
}

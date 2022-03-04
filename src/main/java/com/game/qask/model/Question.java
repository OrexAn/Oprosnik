package com.game.qask.model;

import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@DynamicInsert
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "GeneratorQu1")
    @SequenceGenerator(name="GeneratorQu1", sequenceName = "seqQu1", allocationSize = 1)
    @Column(name = "id")
    private Long id;
    @ManyToOne
    @JoinColumn(name="questionnaire_question_id", nullable=false)
    private QuestionnaireQuestion questionnaireQuestion;

    public Question(Long id) {
        this.id = id;
    }
    public Question() {
        this.id = -1L;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public QuestionnaireQuestion getQuestionnaireQuestion() {
        return questionnaireQuestion;
    }

    public void setQuestionnaireQuestion(QuestionnaireQuestion questionnaireQuestion) {
        this.questionnaireQuestion = questionnaireQuestion;
    }
}

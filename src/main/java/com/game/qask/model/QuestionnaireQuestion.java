package com.game.qask.model;

import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.Set;

@Entity
@DynamicInsert
public class QuestionnaireQuestion extends Questionnaire{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "GeneratorQQ1")
    @SequenceGenerator(name="GeneratorQQ1", sequenceName = "seqQQ1", allocationSize = 1)
    @Column(name = "id")
    private Long id;
    @OneToMany(mappedBy="questionnaireQuestion")
    private Set<Question> questions;

    public QuestionnaireQuestion(Long id) {
        this.id = id;
    }

    public QuestionnaireQuestion() {
        this.id = -1L;
    }

    public Long getId() {
        return id;
    }

    public Set<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(Set<Question> questions) {
        this.questions = questions;
    }
}

package com.game.qask.model;

import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.Set;

@Entity
@DynamicInsert
public class QuestionnaireAnswer extends Questionnaire{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "GeneratorQA1")
    @SequenceGenerator(name="GeneratorQA1", sequenceName = "seqQA1", allocationSize = 1)
    @Column(name = "id")
    private final Long id;
    @OneToMany(fetch = FetchType.LAZY, mappedBy="questionnaireAnswer")
    private Set<Answer> answers;

    public QuestionnaireAnswer(Long id) {
        this.id = id;
    }

    public QuestionnaireAnswer() {
        this.id = -1L;
    }

    public Long getId() {
        return id;
    }

    public Set<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(Set<Answer> answers) {
        this.answers = answers;
    }
}

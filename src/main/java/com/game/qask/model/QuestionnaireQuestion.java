package com.game.qask.model;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.SortNatural;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@DynamicInsert
public class QuestionnaireQuestion extends Questionnaire{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "GeneratorQQ1")
    @SequenceGenerator(name="GeneratorQQ1", sequenceName = "seqQQ1", allocationSize = 1)
    @Column(name = "id")
    private Long id;
    @OneToMany(cascade = CascadeType.ALL, mappedBy="questionnaireQuestion")
    @OrderBy("id asc")
    private List<QuestionnairePage> questionnairePages;

    public QuestionnaireQuestion(Long id) {
        this.id = id;
    }

    public QuestionnaireQuestion() {
        this.id = -1L;
    }

    public Long getId() {
        return id;
    }

    public ArrayList<QuestionnairePage> getQuestionnairePages() {
        return new ArrayList<>(questionnairePages);
    }

    public void setQuestionnairePages(ArrayList<QuestionnairePage> questionnairePages) {
        this.questionnairePages = questionnairePages;
    }
}

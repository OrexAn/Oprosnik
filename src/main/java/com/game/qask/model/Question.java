package com.game.qask.model;

import com.game.qask.api.documents.QuestionType;
import com.game.qask.api.documents.QuestionnaireType;
import com.game.qask.view.QuestionVO;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.SortNatural;

import javax.persistence.*;
import java.util.*;

@Entity
@DynamicInsert
public class Question implements Comparable<Question> {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "GeneratorQu1")
    @SequenceGenerator(name="GeneratorQu1", sequenceName = "seqQu1", allocationSize = 1)
    @Column(name = "id")
    private Long id;
    @ManyToOne
    @JoinColumn(name="questionnaire_page_id", nullable=false)
    private QuestionnairePage questionnairePage;
    @Column(name = "title")
    private String title;
    @Column(name = "question_type")
    private QuestionType questionType;
    @Column(name = "order_num")
    private String orderNum;
    @OneToMany(cascade = CascadeType.ALL, mappedBy="question")
    @SortNatural
    private List<Suggestion> suggestions;

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

    public QuestionnairePage getQuestionnairePage() {
        return questionnairePage;
    }

    public void setQuestionnairePage(QuestionnairePage questionnairePage) {
        this.questionnairePage = questionnairePage;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public QuestionType getQuestionType() {
        return questionType;
    }

    public void setQuestionType(QuestionType questionType) {
        this.questionType = questionType;
    }

    public String getOrderNum() {
        return orderNum;
    }

    public void setOrderNum(String orderNum) {
        this.orderNum = orderNum;
    }

    public ArrayList<Suggestion> getSuggestions() {
        return new ArrayList<>(suggestions);
    }

    public void setSuggestions(ArrayList<Suggestion> suggestions) {
        this.suggestions = suggestions;
    }

    public Map<String, Object> getVO(){
        QuestionVO questionVO = new QuestionVO(this);
        return questionVO.get();
    }

    @Override
    public int compareTo(Question o) {
        if (o == null) {
            return -1;
        }

        Comparable subject1 = this.getOrderNum();
        Comparable subject2 = o.getOrderNum();

        if(subject1 == null) {
            return 1;
        } else if(subject2 == null) {
            return -1;
        } else {
            return subject1.compareTo(subject2);
        }
    }
}

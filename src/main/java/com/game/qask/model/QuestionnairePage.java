package com.game.qask.model;

import com.game.qask.view.QuestionnairePageVO;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.SortNatural;

import javax.persistence.*;
import java.util.*;

@Entity
@DynamicInsert
public class QuestionnairePage implements Comparable <QuestionnairePage>{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "GeneratorQP1")
    @SequenceGenerator(name="GeneratorQP1", sequenceName = "seqQP1", allocationSize = 1)
    @Column(name = "id")
    private Long id;
    @ManyToOne
    @JoinColumn(name="questionnaire_question_id", nullable=false)
    private QuestionnaireQuestion questionnaireQuestion;
    @OneToMany(cascade = CascadeType.ALL, mappedBy="questionnairePage")
    @SortNatural
    private List<Question> questions;
    @Column(name = "order_num")
    private String orderNum;

    public QuestionnairePage(Long id) {
        this.id = id;
    }

    public QuestionnairePage() {
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

    public ArrayList<Question> getQuestions() {
        return new ArrayList<>(questions);
    }

    public void setQuestions(ArrayList<Question> questions) {
        this.questions = questions;
    }

    public String getOrderNum() {
        return orderNum;
    }

    public void setOrderNum(String orderNum) {
        this.orderNum = orderNum;
    }

    public Map<String, Object> getVO(){
        QuestionnairePageVO questionnairePageVO = new QuestionnairePageVO(this);
        return questionnairePageVO.get();
    }

    @Override
    public int compareTo(QuestionnairePage o) {
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

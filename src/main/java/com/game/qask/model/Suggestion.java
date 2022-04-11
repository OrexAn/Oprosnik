package com.game.qask.model;

import com.game.qask.view.SuggestionVO;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.Map;

@Entity
@DynamicInsert
public class Suggestion implements Comparable<Suggestion>{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "GeneratorSuggest1")
    @SequenceGenerator(name="GeneratorSuggest1", sequenceName = "seqSuggest1", allocationSize = 1)
    @Column(name = "id")
    private Long id;
    @ManyToOne
    @JoinColumn(name="question_id", nullable=false)
    private Question question;
    @Column(name = "text")
    private String text;
    @Column(name = "order_num")
    private String orderNum;

    public Suggestion(Long id) {
        this.id = id;
    }
    public Suggestion() {
        this.id = -1L;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
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

    public Map<String, Object> getVO(){
        SuggestionVO suggestionVO = new SuggestionVO(this);
        return suggestionVO.get();
    }

    @Override
    public int compareTo(Suggestion o) {
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

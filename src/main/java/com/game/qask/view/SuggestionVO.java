package com.game.qask.view;

import com.game.qask.model.Question;
import com.game.qask.model.QuestionnaireQuestion;
import com.game.qask.model.Suggestion;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

public class SuggestionVO {
    private Long id;
    private String text;
    private Question question;

    private Map<String, Object> suggestionVO;

    public SuggestionVO(Long id, String text, Question question) {
        this.id = id;
        this.text = text;
        this.question = question;
    }

    public SuggestionVO(Suggestion suggestion) {
        this(suggestion.getId(), suggestion.getText(), suggestion.getQuestion());
        buildSuggestionVO(suggestion);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public Map<String, Object> getBaseParameters(){
        Map<String, Object> suggestionVOParameters = new HashMap<>();
        suggestionVOParameters.put("id", getId().toString());
        suggestionVOParameters.put("question", getQuestion() != null ? getQuestion().getId().toString() : "");
        suggestionVOParameters.put("text", getText());

        return suggestionVOParameters;
    }

    public void buildSuggestionVO(Suggestion suggestion){
        suggestionVO = getBaseParameters();
    }

    public Map<String, Object> get(){
        return suggestionVO;
    }
}

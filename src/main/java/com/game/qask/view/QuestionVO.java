package com.game.qask.view;

import com.game.qask.api.documents.QuestionType;
import com.game.qask.model.Question;
import com.game.qask.model.QuestionnairePage;
import com.game.qask.model.QuestionnaireQuestion;
import com.game.qask.model.Suggestion;

import java.util.*;
import java.util.stream.Collectors;

public class QuestionVO {
    private Long id;
    private QuestionnairePage questionnairePage;
    private String title;
    private QuestionType type;
    private ArrayList<Suggestion> suggestions;

    private Map<String, Object> questionVO;

    public QuestionVO(Long id, QuestionnairePage questionnairePage, String title, ArrayList<Suggestion> suggestions, QuestionType questionType) {
        this.id = id;
        this.questionnairePage = questionnairePage;
        this.title = title;
        this.suggestions = suggestions;
        this.type = questionType;
    }

    public QuestionVO(Question question) {
        this(question.getId(), question.getQuestionnairePage(), question.getTitle(), question.getSuggestions(), question.getQuestionType());
        buildQuestionVO(question);
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

    public QuestionType getType() {
        return type;
    }

    public void setType(QuestionType type) {
        this.type = type;
    }

    public ArrayList<Suggestion> getSuggestions() {
        return suggestions;
    }

    public void setSuggestions(ArrayList<Suggestion> suggestions) {
        this.suggestions = suggestions;
    }

    public Map<String, Object> getBaseParameters(){
        Map<String, Object> questionVOParameters = new HashMap<>();
        questionVOParameters.put("id", getId().toString());
        questionVOParameters.put("questionnairePage", getQuestionnairePage() != null ? getQuestionnairePage().getId().toString() : "");
        questionVOParameters.put("title", getTitle());
        questionVOParameters.put("type", getType());

        return questionVOParameters;
    }

    public void buildQuestionVO(Question question){
        ArrayList<Object> suggestions = getSuggestionsSet(question);
        questionVO = getBaseParameters();
        questionVO.put("suggestions", suggestions);
    }

    private ArrayList<Object> getSuggestionsSet(Question question){
        ArrayList<Object> params = new ArrayList<>();
        question.getSuggestions().forEach(s -> params.add(s.getVO()));
        return params;
    }

    public Map<String, Object> get(){
        return questionVO;
    }
}

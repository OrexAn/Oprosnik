package com.game.qask.api.documents;

import com.game.qask.model.Questionnaire;
import com.game.qask.model.QuestionnaireQuestion;

import java.util.Map;

public class QuestionnaireQuestionViewBuilder extends QuestionnaireViewBuilder{
    @Override
    public void build(Questionnaire questionnaire, Map<String, Object> outParams) {
        super.build(questionnaire, outParams);
        QuestionnaireQuestion questionnaireQuestion = (QuestionnaireQuestion) questionnaire;
        outParams.put("id", questionnaireQuestion.getId());
        outParams.put("questions", questionnaireQuestion.getQuestions());
    }
}

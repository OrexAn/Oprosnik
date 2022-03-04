package com.game.qask.api.documents;

import com.game.qask.model.Questionnaire;
import com.game.qask.model.QuestionnaireAnswer;
import com.game.qask.model.QuestionnaireQuestion;

import java.util.Map;

public class QuestionnaireAnswerViewBuilder extends QuestionnaireViewBuilder{
    @Override
    public void build(Questionnaire questionnaire, Map<String, Object> outParams) {
        super.build(questionnaire, outParams);
        QuestionnaireAnswer questionnaireAnswer = (QuestionnaireAnswer) questionnaire;
        outParams.put("id", questionnaireAnswer.getId());
        outParams.put("answers", questionnaireAnswer.getAnswers());
    }
}

package com.game.qask.api.documents;

import com.game.qask.model.Questionnaire;
import com.game.qask.testclasses.SomeInterface;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class QuestionnaireView {
    private Map<String, Object> params = new HashMap();

    public QuestionnaireView(Questionnaire questionnaire){
        switch (questionnaire.getQuestionnaireType()){
            case QUESTION:
                QuestionnaireQuestionViewBuilder questionBuilder = new QuestionnaireQuestionViewBuilder();
                questionBuilder.build(questionnaire, params);
                break;
            case ANSWER:
                QuestionnaireAnswerViewBuilder answerBuilder = new QuestionnaireAnswerViewBuilder();
                answerBuilder.build(questionnaire, params);
                break;
        }
    }

    public Map<String, Object> getParams(){
        return params;
    }
}

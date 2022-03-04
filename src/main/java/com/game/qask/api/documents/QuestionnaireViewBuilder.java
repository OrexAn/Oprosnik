package com.game.qask.api.documents;

import com.game.qask.model.Questionnaire;

import java.util.Map;

public abstract class QuestionnaireViewBuilder {

    public void build(Questionnaire questionnaire, Map<String, Object> outParams){
        outParams.put("questionnaire_type", questionnaire.getQuestionnaireType());
        outParams.put("date", questionnaire.getDate());
        outParams.put("status", questionnaire.getStatus());
        outParams.put("creator_id", questionnaire.getCreatorID());
        outParams.put("creator_name", questionnaire.getCreatorName());
        outParams.put("title", questionnaire.getTitle());
    }
}

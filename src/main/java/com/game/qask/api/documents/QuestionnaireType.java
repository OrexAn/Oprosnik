package com.game.qask.api.documents;

public enum QuestionnaireType {
    QUESTION("question"),
    ANSWER("answer");

    private final String label;

    QuestionnaireType(String label) {
        this.label = label;
    }

    public String toString() {
        return this.label;
    }
}

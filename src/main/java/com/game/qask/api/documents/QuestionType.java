package com.game.qask.api.documents;

public enum QuestionType {
    SINGLE("single"),
    MULTI("multi"),
    RATING("rating"),
    SORTED("sorted"),
    SEMANTIC("semantic"),
    DISTRIBUTE("distribute");

    private final String label;

    QuestionType(String label) {
        this.label = label;
    }

    public String toString() {
        return this.label;
    }
}

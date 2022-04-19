package com.game.qask.api.documents;

public enum AnswerType {
    SINGLE("single"),
    MULTI("multi"),
    RATING("rating"),
    SORTED("sorted"),
    SEMANTIC("semantic"),
    DISTRIBUTE("distribute");

    private final String label;

    AnswerType(String label) {
        this.label = label;
    }

    public String toString() {
        return this.label;
    }
}

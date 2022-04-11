package com.game.qask.api.documents;

public enum QuestionType {
    SINGLE("single"),
    MULTI("multi");

    private final String label;

    QuestionType(String label) {
        this.label = label;
    }

    public String toString() {
        return this.label;
    }
}

package com.game.qask.api.documents;

public enum QuestionStatus {
    PASSED("passed"),
    NOT_READY("notReady"),
    HIDDEN("hidden");

    private final String label;

    QuestionStatus(String label) {
        this.label = label;
    }

    public String toString() {
        return this.label;
    }
}

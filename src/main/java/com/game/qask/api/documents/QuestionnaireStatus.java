package com.game.qask.api.documents;

public enum QuestionnaireStatus {
    PASSED("passed"),
    PAUSED("paused"),
    REJECTED("rejected"),
    HIDDEN("hidden");

    private final String label;

    QuestionnaireStatus(String label) {
        this.label = label;
    }

    public String toString() {
        return this.label;
    }
}

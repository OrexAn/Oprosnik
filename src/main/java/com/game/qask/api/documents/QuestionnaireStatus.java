package com.game.qask.api.documents;

public enum QuestionnaireStatus {
    PUBLISHED("published"),
    PASSED("passed"),
    NOT_PASSED("not_passed"),
    PAUSED("paused"),
    REJECTED("rejected"),
    HIDDEN("hidden"),
    CREATED("created");

    private final String label;

    QuestionnaireStatus(String label) {
        this.label = label;
    }

    public String toString() {
        return this.label;
    }
}

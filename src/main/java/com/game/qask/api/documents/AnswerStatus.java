package com.game.qask.api.documents;

public enum AnswerStatus {
    FORMED("formed"),
    HIDDEN("hidden");

    private final String label;

    AnswerStatus(String label) {
        this.label = label;
    }

    public String toString() {
        return this.label;
    }
}

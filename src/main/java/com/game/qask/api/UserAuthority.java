package com.game.qask.api;

public enum UserAuthority {
    USER("USER");

    private final String label;

    UserAuthority(String label) {
        this.label = label;
    }

    public String toString() {
        return this.label;
    }
}

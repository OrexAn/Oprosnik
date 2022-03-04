package com.game.qask.view;

import com.game.qask.model.QuestionnaireAnswer;
import com.game.qask.model.QuestionnaireQuestion;

import javax.persistence.Column;
import javax.persistence.OneToMany;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class UserVO {
    private Long id;
    private String name;
    private String login;
    private String password;
    private String avatar;
    private String email;
    private String authority;

    public UserVO(Long id, String name, String login, String password, String avatar, String email, String authority) {
        this.id = id;
        this.name = name;
        this.login = login;
        this.password = password;
        this.avatar = avatar;
        this.email = email;
        this.authority = authority;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    public Map<String, String> getMapParameters(){
        HashMap<String, String> userVOParameters = new HashMap<>();
        userVOParameters.put("id", getId().toString());
        userVOParameters.put("name", getName());
        userVOParameters.put("login", getLogin());
        userVOParameters.put("avatar", getAvatar());
        userVOParameters.put("authority", getAuthority());
        userVOParameters.put("email", getEmail());
        userVOParameters.put("password", getPassword());
        return userVOParameters;
    }
}

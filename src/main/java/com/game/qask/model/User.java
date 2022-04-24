package com.game.qask.model;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.util.Set;

/**
 * класс, описывающий объект, который хранит информацию о пользователе
 */
@Entity
@DynamicInsert
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "GeneratorName1")
    @SequenceGenerator(name="GeneratorName1", sequenceName = "seq1", allocationSize = 1)
    @Column(name = "id")
    private final Long id;
    @Column(name = "user_name")
    private String userName;
    @Column(name = "password")
    private String password;
    @Column(name="avatar", columnDefinition = "varchar(255) default 'no-avatar'")
    private String avatar;
    @Column(name = "email")
    private String email;
    @Column(name = "authority")
    private String authority;
    @OneToMany(mappedBy="user")
    private Set<QuestionnaireAnswer> answerQuestionnaires;
    @OneToMany(mappedBy="user")
    private Set<QuestionnaireQuestion> questionQuestionnaires;
    //private Set<Document> documents;

    public User() {
        this.id = -1l;
    }

    public Long getId() {
        return id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
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

    public Set<QuestionnaireAnswer> getAnswerQuestionnaires() {
        return answerQuestionnaires;
    }

    public void setAnswerQuestionnaires(Set<QuestionnaireAnswer> answerQuestionnaires) {
        this.answerQuestionnaires = answerQuestionnaires;
    }
    public Set<QuestionnaireQuestion> getQuestionQuestionnaires() {
        return questionQuestionnaires;
    }

    public void setQuestionQuestionnaires(Set<QuestionnaireQuestion> questionQuestionnaires) {
        this.questionQuestionnaires = questionQuestionnaires;
    }
    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }


}

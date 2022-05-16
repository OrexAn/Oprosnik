package com.game.qask.dao;

import com.game.qask.model.Question;
import com.game.qask.model.QuestionnaireAnswer;
import com.game.qask.model.QuestionnaireQuestion;
import com.game.qask.model.Suggestion;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Transactional
public interface QuestionnaireQuestionDAO extends JpaRepository<QuestionnaireQuestion, Long> {
    @Query("select qq from QuestionnaireQuestion qq where qq.creatorName = :creatorName order by qq.id")
    ArrayList<QuestionnaireQuestion> getQuestionnaireQuestionsByCreatorName(@Param("creatorName") String creatorName);

    @Query("select q from Question q where q.questionnairePage.questionnaireQuestion.id = :id order by q.id")
    ArrayList<Question> getQuestionsByQQId(@Param("id") Long id);

    @Query("delete from QuestionnairePage where questionnaireQuestion.id = :id")
    @Modifying
    void deletePagesByQQId(@Param("id") Long id);
    /*
    @Query("select d.id from Document d where d.username = :username and d.status = '0' and d.docType = '0'")
    Integer getInProgressRequestIdByUserName(@Param("username") String username);

    @Query("select d from Document d where d.status = '0' and d.docType = '0'")
    ArrayList<Document> getAllInProgressRequests();

    @Query("select d from Document d where d.username = :username and d.status = '4' and d.docType = '0'")
    ArrayList<Document> getAllResponseAcceptedDocumentsByUserName(@Param("username") String username);

    @Query("select d from Document d where d.receiver = :username and d.status = '2' and d.docType = '1'")
    ArrayList<Document> getAllOkResponseDocumentsByReceiverName(@Param("username") String username);

    ArrayList<Document> findByUsername(String username);

    @Query("select d from Document d where d.id = :id")
    Optional<Document> findDocumentByDocId(@Param("id") Long id);

    @Query("select d from Document d where d.username = :username and d.status = '0' and d.docType = '0'")
    Optional<Document> findRequestInProgressByUsername(@Param("username") String username);

    @Query("select d from Document d where d.id = :id and d.status = '2' and d.docType = '1'")
    Optional<Document> findResponseOkByDocId(@Param("id") Long id);

    @Query("select d from Document d where d.id = :id and d.status = '1' and d.docType = '2'")
    Optional<Document> findReportDoneByDocId(@Param("id") Long id);

    @Query("select d from Document d where d.id = :id and d.status = '0' and d.docType = '1'")
    Optional<Document> findResponseInProgressByDocId(@Param("id") Long id);

    @Query("select d from Document d where d.receiver = :username and (d.status = '1' or d.status = '3') and d.docType = '1'")
    ArrayList<Document> findProjectsHistoryByUsername(@Param("username") String username);

    @Query("select d from Document d where d.status = '1' and d.docType = '2'")
    ArrayList<Document> findAllDoneReports();
    */
}

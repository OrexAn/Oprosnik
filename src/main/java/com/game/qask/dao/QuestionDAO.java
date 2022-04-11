package com.game.qask.dao;

import com.game.qask.model.QuestionnaireQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionDAO extends JpaRepository<QuestionnaireQuestion, Long> {
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

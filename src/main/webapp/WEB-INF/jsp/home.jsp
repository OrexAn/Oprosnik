<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<script src="http://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://unpkg.com/ag-grid-community/dist/ag-grid-community.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/ag-grid-community/dist/styles/ag-grid.css">
<link rel="stylesheet" href="https://unpkg.com/ag-grid-community/dist/styles/ag-theme-alpine.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">
<link type="text/css" href="<c:url value="/resources/bootstrap/css/bootstrap.css"/>" rel="stylesheet">
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/home.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/bootstrap/js/bootstrap.js"></script>
<script type="text/javascript">
    $(window).on('load',function(){
        $('#myTrigger').click(function (){
            $('#myModal').modal('show');
        });
        $('#moreQuestionnairesTriggerContainerId').click(function (){
            $('#questionnaireListModalId').modal('show');
            fitGridCols();
        });
    });

</script>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hello ${name}!</title>
</head>
<body style="background-image: url(img/background.png); background-size: cover;">
<jsp:include page="header.jsp" />

<style>
    .flicker-icon:hover{
        color: #5f9ea0;
    }
    .flicker-icon:active{
        color: #87ceeb;
    }
    .truncate{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>



<main class="px-5 text-center">
    <h1>Добро пожаловать в Q-Ask сервис!</h1>
        <%-----------------------------------------------%>
    <!-- new Questionnaire Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Назовите анкету</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="text" id="newQuestionnaireNameId" name="newQuestionnaireName" class="form-control" placeholder="Введите текст..." required>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                    <button type="button" class="btn btn-primary" onclick="createQuestionnaire()">Создать</button>
                </div>
            </div>
        </div>
    </div>
    <%-----------------------------------------------------------%>
    <%-----------------------------------------------------------%>
    <!-- Questionnaire list Modal -->
    <div class="modal fade" id="questionnaireListModalId" tabindex="-1" aria-labelledby="questionnaireListLabelId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="questionnaireListLabelId">Мои анкеты</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="questionnaireListTableId" style="height: 200px; width:100%;" class="ag-theme-alpine"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                </div>
            </div>
        </div>
    </div>
    <%-----------------------------------------------------------%>
    <div class="d-none" id="quickAccessButtonsContainerId">
        <div class="row" style="padding-top: 50px;">
            <div class="col d-flex justify-content-start">
                <p style="margin: 0;">Создате новый опрос или редактируйте существующий</p>
            </div>
        </div>
        <div class="row py-4">
            <div class="col-2">
                <div class="d-flex justify-content-start">
                    <div id="myTrigger" tabindex="-1" style="cursor: pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="currentColor" class="bi bi-plus-square-dotted flicker-icon" viewBox="0 0 16 16">
                            <path d="M2.5 0c-.166 0-.33.016-.487.048l.194.98A1.51 1.51 0 0 1 2.5 1h.458V0H2.5zm2.292 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zm1.833 0h-.916v1h.916V0zm1.834 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zM13.5 0h-.458v1h.458c.1 0 .199.01.293.029l.194-.981A2.51 2.51 0 0 0 13.5 0zm2.079 1.11a2.511 2.511 0 0 0-.69-.689l-.556.831c.164.11.305.251.415.415l.83-.556zM1.11.421a2.511 2.511 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415L1.11.422zM16 2.5c0-.166-.016-.33-.048-.487l-.98.194c.018.094.028.192.028.293v.458h1V2.5zM.048 2.013A2.51 2.51 0 0 0 0 2.5v.458h1V2.5c0-.1.01-.199.029-.293l-.981-.194zM0 3.875v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 5.708v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 7.542v.916h1v-.916H0zm15 .916h1v-.916h-1v.916zM0 9.375v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .916v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .917v.458c0 .166.016.33.048.487l.98-.194A1.51 1.51 0 0 1 1 13.5v-.458H0zm16 .458v-.458h-1v.458c0 .1-.01.199-.029.293l.981.194c.032-.158.048-.32.048-.487zM.421 14.89c.183.272.417.506.69.689l.556-.831a1.51 1.51 0 0 1-.415-.415l-.83.556zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373c.158.032.32.048.487.048h.458v-1H2.5c-.1 0-.199-.01-.293-.029l-.194.981zM13.5 16c.166 0 .33-.016.487-.048l-.194-.98A1.51 1.51 0 0 1 13.5 15h-.458v1h.458zm-9.625 0h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zm1.834-1v1h.916v-1h-.916zm1.833 1h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                        </svg>
                        <small class="form-text text-muted truncate" style="width: 128px;">Новый опрос</small>
                    </div>
                </div>
            </div>
            <div class="col-2 d-none" id="firstQuestionnaireTriggerContainerId">
                <div class="d-flex justify-content-start">
                    <div id="firstQuestionnaireTriggerId" tabindex="-1" onclick="toQuestionnaire(this);" style="cursor: pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="currentColor" class="bi bi-pencil-square flicker-icon" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                        <small class="form-text text-muted truncate" style="width: 128px;">Один из множества опросов</small>
                    </div>
                </div>
            </div>
            <div class="col-2 d-none" id="secondQuestionnaireTriggerContainerId">
                <div class="d-flex justify-content-start">
                    <div id="secondQuestionnaireTriggerId" tabindex="-1" onclick="toQuestionnaire(this);" style="cursor: pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="currentColor" class="bi bi-pencil-square flicker-icon" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                        <small class="form-text text-muted truncate" style="width: 128px;">Один из множества опросов</small>
                    </div>
                </div>
            </div>
            <div class="col-2 d-none" id="thirdQuestionnaireTriggerContainerId">
                <div class="d-flex justify-content-start">
                    <div id="thirdQuestionnaireTriggerId" tabindex="-1" onclick="toQuestionnaire(this);" style="cursor: pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="currentColor" class="bi bi-pencil-square flicker-icon" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                        <small class="form-text text-muted truncate" style="width: 128px;">Один из множества опросов</small>
                    </div>
                </div>
            </div>
            <div class="col-2 d-none" id="moreQuestionnairesTriggerContainerId">
                <div class="d-flex justify-content-start">
                    <div id="moreQuestionnairesTriggerId" tabindex="-1" style="cursor: pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="currentColor" class="bi bi-folder2 flicker-icon" viewBox="0 0 16 16">
                            <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5v-9zM2.5 3a.5.5 0 0 0-.5.5V6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5zM14 7H2v5.5a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5V7z"/>
                        </svg>
                        <small class="form-text text-muted" style="width: 128px;">Мои анкеты</small>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row pb-4 d-none" style="padding-top: 130px;">
        <div class="col-3 d-flex justify-content-start">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Введите текст..." aria-label="Recipient's username" aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button">Искать</button>
                </div>
            </div>
        </div>
    </div>
    <div style="position: absolute; width: 100%; left: 0px; right: 0px; bottom: 50px; padding: 0 50px;">
        <div id="staticHomeTableId" style="height: 250px; width: 100%; padding: 0 !important;" class="ag-theme-alpine px-3"></div>
    </div>
</main>
<div class="container" id="login-container" style="display: none">
    <jsp:include page="login-form.jsp" />
</div>

<jsp:include page="footer.jsp" />
</body>
</html>
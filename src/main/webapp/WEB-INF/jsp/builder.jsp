<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<link type="text/css" href="<c:url value="/resources/bootstrap/css/bootstrap.css"/>" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">

<script src="http://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/builder.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/bootstrap/js/bootstrap.js"></script>
<script src="https://cdn.jsdelivr.net/gh/RubaXa/Sortable/Sortable.min.js"></script>

<style>
    .fake-list-group-item {
        position: relative;
        padding: 0.5rem 1rem;
        color: #212529;
        text-decoration: none;
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.125);
    }
    .add-item-cell:hover{
    background-color: #f0f8ff;
    }
    .sort-item-container .form-control:focus{
        box-shadow: none;
    }
    .sort-item-container .col{
        cursor: default;
        margin: 0;
    }
    #createNewQ .container{
        padding: 0;
    }
    .rating {
        display: flex;
        flex-direction: row-reverse;
        justify-content: center
    }

    .rating>input {
        display: none
    }

    .rating>label {
        position: relative;
        width: 30px;
        font-size: 40px;
        color: #FFD600;
        cursor: pointer
    }

    .rating>label::before {
        content: "\2605";
        position: absolute;
        opacity: 0
    }

    h1,
    p {
        text-align: center
    }

    h1 {
        margin-top: 150px
    }

    p {
        font-size: 1.2rem
    }

    @media only screen and (max-width: 600px) {
        h1 {
            font-size: 14px
        }

        p {
            font-size: 12px
        }
    }
</style>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
</head>
<body>
<jsp:include page="header.jsp" />
<input type="hidden" name="questionnaireId" value="${questionnaireId}">
<%-----------------------------------------------------------%>
<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div id="createNewQ" class="row py-2 border-top border-bottom d-flex justify-content-center">
                    <div id="answersContainerId" class="col d-flex justify-content-center flex-column">
                        <div class="row py-2">
                            <div class="col">
                                <label for="newTitleInputId">Заголовок</label>
                                <input id="newTitleInputId" class="form-control" type="text" value="">
                            </div>
                        </div>
                        <div id="simpleSelectContainerID" class="row py-2 d-none">
                            <div class="col" id="simpleSelectRowsContainerId">
                                <div class="row py-2">
                                    <div class="col">
                                        <label for="selectQ_1">Ответ 1</label>
                                        <input id="selectQ_1" class="form-control choose-question" type="text" placeholder="прим. Вариант">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="ratingContainerID" class="row py-2 d-none">
                            <div class="col">
                                <div class="container">
                                    <div class="rating" id="create-star-container-id">
                                        <input type="radio" name="rating" value="1" id="1">
                                        <label for="1">☆</label>
                                        <input type="radio" name="rating" value="2" id="2">
                                        <label for="2">☆</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="sortItemsContainerID" class="row py-2 d-none">
                            <div class="col sort-item-container" id="demo1">
                                <div class="row m-0 fake-list-group-item d-flex"> <%--TODO list-group-item--%>
                                    <div class="col">
                                        <input class="form-control sort-item" name="suggestion" type="text" placeholder="прим. Вариант">
                                    </div>
                                    <div class="col-1 d-flex align-items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-expand" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"/>
                                        </svg>
                                    </div>
                                </div>
                                <div class="row m-0 fake-list-group-item d-flex">
                                    <div class="col">
                                        <input class="form-control sort-item" name="suggestion" type="text" placeholder="прим. Вариант">
                                    </div>
                                    <div class="col-1 d-flex align-items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-expand" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"/>
                                        </svg>
                                    </div>
                                </div>
                                <div class="row m-0 fake-list-group-item d-flex">
                                    <div class="col">
                                        <input class="form-control sort-item" name="suggestion" type="text" placeholder="прим. Вариант"><%--TODO need sort-item class in work version--%>
                                        <%--<input class="form-control sort-item" type="text" value="Вариант 3">--%>
                                    </div>
                                    <div class="col-1 d-flex align-items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-expand" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="semanticContainerID" class="row py-2 d-none">
                            <div class="col cont" name="newSemanticRowsContainer">
                                <div class="row" name="semanticNumbersContainer">
                                    <div class="col-3 d-flex justify-content-center align-self-center" onclick="removeNewPoints()">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle-fill" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"/>
                                        </svg>
                                    </div>
                                    <div class="col d-flex justify-content-between" name="newAvailablePointsContainer">
                                        <span>-1</span>
                                        <span>0</span>
                                        <span>1</span>
                                    </div>
                                    <div class="col-3 d-flex justify-content-center align-self-center" onclick="addNewPoints()">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                                        </svg>
                                    </div>
                                </div>
                                <div class="row py-2" name="newSemanticSuggestion">
                                    <div class="col-3">
                                        <input class="form-control" name="newLeftText" type="text" placeholder="прим. Вариант">
                                    </div>
                                    <div class="col-6 d-flex align-items-center">
                                        <input type="range" class="form-range" min="1" max="3" id="customRange1" disabled>
                                    </div>
                                    <div class="col-3">
                                        <input class="form-control" name='newRightText' type="text" placeholder="прим. Вариант">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="distributeContainerId" class="row py-2 d-none">
                            <div class="col cont" name="newDistributeRowsContainer">
                                <div class="row py-2" name="newDistributePointsContainer">
                                    <div class="col">
                                        <div class="row">
                                            <div class="col-4 d-flex align-items-center">
                                                <span>Максимум баллов</span>
                                            </div>
                                            <div class="col-5">
                                                <input class="form-control" name="newDistributePoints" type="text" placeholder="прим. 100">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row py-2" name="newDistributeRow">
                                    <div class="col">
                                        <div class="row">
                                            <div class="col">
                                                <input class="form-control" name="distributeRowText" type="text" placeholder="прим. Вариант">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-11">
                                                <input type="range" style="width: 100%; height: 30px;" min="0" max="100" id="customRange11" value="0" disabled>
                                            </div>
                                            <div class="col-1">
                                                <span>0</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="addAnswerContainerId" class="row py-2">
                            <div class="col">
                                <button id="addElementButtonId" type="button" class="btn btn-outline-success w-100" onclick="">+ Добавить элемент</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="beforeCloseModal()" >Закрыть</button>
                <button id="addModalQuestionId" type="button" class="btn btn-primary" onclick="createSelectedType(this)">Создать</button>
            </div>
        </div>
    </div>
</div>
<%-----------------------------------------------------------%>
<%--Alert modal--%>
<jsp:include page="SuccessAlertModal.jsp" />
<jsp:include page="ErrorAlertModal.jsp" />
<%------------------------------------------------------------%>

<main class="px-3 text-center">
    <div class="row py-1 border">
        <div class="col d-flex justify-content-end">
            <button type="button" class="btn btn-success" id="publishButtonId" onclick="publish('опубликовано')">Опубликовать</button>
        </div>
        <div class="col d-flex justify-content-end d-none">
            <button type="button" class="btn btn-warning" id="updateButtonId" onclick="updateQuestionnaire()">Редактировать</button>
        </div>
    </div>
    <div class="row">
        <div class="col-2 border-end border-start">
            <div class="row py-2">
                <div class="col">
                    <button type="button" class="btn btn-light w-100" onclick="goToEditor()">Редактор</button>
                </div>
            </div>
            <div class="row py-2">
                <div class="col">
                    <button type="button" class="btn btn-light w-100" onclick="toPreferencesPage()">Настройки</button>
                </div>
            </div>
            <div class="row py-2">
                <div class="col">
                    <button type="button" class="btn btn-light w-100" id="sharePageBtnId" onclick="toSharePage()" disabled>Распространение</button>
                </div>
            </div>
            <div class="row py-2 border-bottom">
                <div class="col">
                    <button type="button" class="btn btn-light w-100" id="resultsPageBtnId" onclick="toResultsPage();" disabled>Результаты</button>
                </div>
            </div>
            <div style="overflow-y: auto; overflow-x: hidden; height: 650px">
                <div class="row py-2">
                    <div class="col">
                        <button type="button" class="btn btn-light w-100 item1">Титульная страница</button>
                    </div>
                </div>
                <div class="row py-2">
                    <div class="col">
                        <button type="button" class="btn btn-light w-100 item2">Страница 1</button>
                    </div>
                </div>
                <div id="newPageButtonContainerId" class="row py-2">
                    <div class="col">
                        <button type="button" class="btn btn-outline-success w-100" onclick="addCarouselItem()">+ Добавить страницу</button>
                    </div>
                </div>
            </div>

        </div>
        <div class="col-10 border-end">
            <div class="row py-2">
                <div class="col">
                    <div class="container px-0" style="min-height: 800px; max-height: 800px;">
                        <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-interval="false" data-wrap="false" style="width: 100%;height: 800px;">
                            <div id="carouselItemsContainerId" class="carousel-inner" style="min-height: 800px;">
                                <div class="carousel-item active" style="height: 100%;" page="0">
                                    <div style="height: 100%;overflow-y: auto;overflow-x: hidden;" class="d-flex justify-content-center flex-column">

                                        <div class="row py-2 border-top border-bottom d-flex justify-content-center add-item-cell">
                                            <div class="col-6 d-flex justify-content-center flex-column">
                                                <h4 id="questionnaireTitleId">${questionnaireTitle}</h4>
                                            </div>
                                        </div>
                                        <div class="row py-2 border-top border-bottom d-flex justify-content-center add-item-cell d-none"> <%--TODO it could be displayed later--%>
                                            <div class="col-2 d-flex justify-content-center flex-column">
                                                <h5>Описание</h5>
                                            </div>
                                        </div>
                                        <div class="row py-2 border-top border-bottom d-flex justify-content-center add-item-cell">
                                            <div class="col-3 d-flex justify-content-center flex-column">
                                                <button type="button" class="btn btn-primary">
                                                    <input type="text" class="form-control" value="Приступить" maxlength="30" style="text-align: center;
                                                    background: transparent; border: none; color: white; box-shadow: none;" readonly>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="carousel-item questionsPage">
                                    <div style="height: 100%;overflow-y: auto;overflow-x: hidden;" class="justify-content-center flex-column">
                                        <div id="selectQuestionType_1" class="row py-2 d-flex justify-content-center d-none">
                                            <div class="col-8">
                                                <div class="row border-top border-bottom">
                                                    <div class="col-2 d-flex justify-content-center flex-column border-end">
                                                        <a>Выберите тип вопроса</a>
                                                    </div>
                                                    <div class="col">
                                                        <div class="row d-flex justify-content-between">
                                                            <div class="col-3 add-item-cell" onclick="typeSelected('SINGLE')">
                                                                <div class="row py-2" style="height: 55px;">
                                                                    <div class="col align-self-center">
                                                                        <a style="font-size: small;">Одиночный выбор</a>
                                                                    </div>
                                                                </div>
                                                                <div class="row py-2">
                                                                    <div class="col">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
                                                                            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"></path>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-3 add-item-cell" onclick="typeSelected('MULTI')">
                                                                <div class="row py-2" style="height: 55px;">
                                                                    <div class="col align-self-center">
                                                                        <a style="font-size: small;">Множественный выбор</a>
                                                                    </div>
                                                                </div>
                                                                <div class="row py-2">
                                                                    <div class="col">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check2-all" viewBox="0 0 16 16">
                                                                            <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"></path>
                                                                            <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"></path>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-3 add-item-cell" onclick="typeSelected('RATING')">
                                                                <div class="row py-2" style="height: 55px;">
                                                                    <div class="col align-self-center">
                                                                        <a style="font-size: small;">Рейтинг</a>
                                                                    </div>
                                                                </div>
                                                                <div class="row py-2">
                                                                    <div class="col">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                                                                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row d-flex justify-content-between">
                                                            <div class="col-3 add-item-cell" onclick="typeSelected('SORTED')">
                                                                <div class="row py-2" style="height: 55px;">
                                                                    <div class="col align-self-center">
                                                                        <a style="font-size: small;">Ранжирование</a>
                                                                    </div>
                                                                </div>
                                                                <div class="row py-2">
                                                                    <div class="col">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
                                                                            <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-3 add-item-cell" onclick="typeSelected('SEMANTIC')">
                                                                <div class="row py-2" style="height: 55px;">
                                                                    <div class="col align-self-center">
                                                                        <a style="font-size: small;">Дифференцированный выбор</a>
                                                                    </div>
                                                                </div>
                                                                <div class="row py-2">
                                                                    <div class="col">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-sliders" viewBox="0 0 16 16">
                                                                            <path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"/>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-3 add-item-cell" onclick="typeSelected('DISTRIBUTE')">
                                                                <div class="row py-2" style="height: 55px;">
                                                                    <div class="col align-self-center">
                                                                        <a style="font-size: small;">Распределение значений</a>
                                                                    </div>
                                                                </div>
                                                                <div class="row py-2">
                                                                    <div class="col">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-filter-left" viewBox="0 0 16 16">
                                                                            <path d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="newQuestionTriggerId_1" class="row py-2 border-top border-bottom d-flex justify-content-center add-item-cell" onclick="newQuestion();">
                                            <div class="col-2 d-flex justify-content-center flex-column">
                                                <a>Добавьте вопрос</a>
                                            </div>
                                            <div class="col-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-plus-square-dotted" viewBox="0 0 16 16">
                                                    <path d="M2.5 0c-.166 0-.33.016-.487.048l.194.98A1.51 1.51 0 0 1 2.5 1h.458V0H2.5zm2.292 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zm1.833 0h-.916v1h.916V0zm1.834 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zM13.5 0h-.458v1h.458c.1 0 .199.01.293.029l.194-.981A2.51 2.51 0 0 0 13.5 0zm2.079 1.11a2.511 2.511 0 0 0-.69-.689l-.556.831c.164.11.305.251.415.415l.83-.556zM1.11.421a2.511 2.511 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415L1.11.422zM16 2.5c0-.166-.016-.33-.048-.487l-.98.194c.018.094.028.192.028.293v.458h1V2.5zM.048 2.013A2.51 2.51 0 0 0 0 2.5v.458h1V2.5c0-.1.01-.199.029-.293l-.981-.194zM0 3.875v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 5.708v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 7.542v.916h1v-.916H0zm15 .916h1v-.916h-1v.916zM0 9.375v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .916v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .917v.458c0 .166.016.33.048.487l.98-.194A1.51 1.51 0 0 1 1 13.5v-.458H0zm16 .458v-.458h-1v.458c0 .1-.01.199-.029.293l.981.194c.032-.158.048-.32.048-.487zM.421 14.89c.183.272.417.506.69.689l.556-.831a1.51 1.51 0 0 1-.415-.415l-.83.556zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373c.158.032.32.048.487.048h.458v-1H2.5c-.1 0-.199-.01-.293-.029l-.194.981zM13.5 16c.166 0 .33-.016.487-.048l-.194-.98A1.51 1.51 0 0 1 13.5 15h-.458v1h.458zm-9.625 0h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zm1.834-1v1h.916v-1h-.916zm1.833 1h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row py-2 d-flex justify-content-end">
                <div class="col-1">
                    <button type="button" class="btn btn-primary w-100 left" onclick="prev()">&lt;</button>
                </div>
                <div class="col-1">
                    <button type="button" class="btn btn-primary w-100 right" onclick="next()">&gt;</button>
                </div>
            </div>
        </div>
    </div>
    <%--Pattern carousel item--%>
    <div class="carousel-item pattern-item d-none" style="height: 100%;">
        <div style="height: 100%;overflow-y: auto;overflow-x: hidden;" class="justify-content-center flex-column">
            <div class="row py-2 border-top border-bottom d-flex justify-content-center d-none select-question-type">
                <div class="col-8">
                    <div class="row border-top border-bottom">
                        <div class="col-2 d-flex justify-content-center flex-column border-end">
                            <a>Выберите тип вопроса</a>
                        </div>
                        <div class="col">
                            <div class="row d-flex justify-content-between">
                                <div class="col-3 add-item-cell" onclick="typeSelected('SINGLE')">
                                    <div class="row py-2" style="height: 55px;">
                                        <div class="col align-self-center">
                                            <a style="font-size: small;">Одиночный выбор</a>
                                        </div>
                                    </div>
                                    <div class="row py-2">
                                        <div class="col">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
                                                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3 add-item-cell" onclick="typeSelected('MULTI')">
                                    <div class="row py-2" style="height: 55px;">
                                        <div class="col align-self-center">
                                            <a style="font-size: small;">Множественный выбор</a>
                                        </div>
                                    </div>
                                    <div class="row py-2">
                                        <div class="col">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check2-all" viewBox="0 0 16 16">
                                                <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"></path>
                                                <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3 add-item-cell" onclick="typeSelected('RATING')">
                                    <div class="row py-2" style="height: 55px;">
                                        <div class="col align-self-center">
                                            <a style="font-size: small;">Рейтинг</a>
                                        </div>
                                    </div>
                                    <div class="row py-2">
                                        <div class="col">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row d-flex justify-content-between">
                                <div class="col-3 add-item-cell" onclick="typeSelected('SORTED')">
                                    <div class="row py-2" style="height: 55px;">
                                        <div class="col align-self-center">
                                            <a style="font-size: small;">Ранжирование</a>
                                        </div>
                                    </div>
                                    <div class="row py-2">
                                        <div class="col">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3 add-item-cell" onclick="typeSelected('SEMANTIC')">
                                    <div class="row py-2" style="height: 55px;">
                                        <div class="col align-self-center">
                                            <a style="font-size: small;">Дифференцированный выбор</a>
                                        </div>
                                    </div>
                                    <div class="row py-2">
                                        <div class="col">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-sliders" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3 add-item-cell" onclick="typeSelected('DISTRIBUTE')">
                                    <div class="row py-2" style="height: 55px;">
                                        <div class="col align-self-center">
                                            <a style="font-size: small;">Распределение значений</a>
                                        </div>
                                    </div>
                                    <div class="row py-2">
                                        <div class="col">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-filter-left" viewBox="0 0 16 16">
                                                <path d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row py-2 border-top border-bottom d-flex justify-content-center add-item-cell new-question-trigger" onclick="newQuestion();">
                <div class="col-2 d-flex justify-content-center flex-column">
                    <a>Добавьте вопрос</a>
                </div>
                <div class="col-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-plus-square-dotted" viewBox="0 0 16 16">
                        <path d="M2.5 0c-.166 0-.33.016-.487.048l.194.98A1.51 1.51 0 0 1 2.5 1h.458V0H2.5zm2.292 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zm1.833 0h-.916v1h.916V0zm1.834 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zM13.5 0h-.458v1h.458c.1 0 .199.01.293.029l.194-.981A2.51 2.51 0 0 0 13.5 0zm2.079 1.11a2.511 2.511 0 0 0-.69-.689l-.556.831c.164.11.305.251.415.415l.83-.556zM1.11.421a2.511 2.511 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415L1.11.422zM16 2.5c0-.166-.016-.33-.048-.487l-.98.194c.018.094.028.192.028.293v.458h1V2.5zM.048 2.013A2.51 2.51 0 0 0 0 2.5v.458h1V2.5c0-.1.01-.199.029-.293l-.981-.194zM0 3.875v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 5.708v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 7.542v.916h1v-.916H0zm15 .916h1v-.916h-1v.916zM0 9.375v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .916v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .917v.458c0 .166.016.33.048.487l.98-.194A1.51 1.51 0 0 1 1 13.5v-.458H0zm16 .458v-.458h-1v.458c0 .1-.01.199-.029.293l.981.194c.032-.158.048-.32.048-.487zM.421 14.89c.183.272.417.506.69.689l.556-.831a1.51 1.51 0 0 1-.415-.415l-.83.556zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373c.158.032.32.048.487.048h.458v-1H2.5c-.1 0-.199-.01-.293-.029l-.194.981zM13.5 16c.166 0 .33-.016.487-.048l-.194-.98A1.51 1.51 0 0 1 13.5 15h-.458v1h.458zm-9.625 0h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zm1.834-1v1h.916v-1h-.916zm1.833 1h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"></path>
                    </svg>
                </div>
            </div>
        </div>
    </div>
    <%-----------------------------------------------------%>
    <%--Pattern page button--%>
    <div class="row py-2 pattern-button d-none">
        <div class="col">
            <button type="button" class="btn btn-light w-100"></button>
        </div>
    </div>
    <%--Pattern sorted item--%>
    <div class="row m-0 fake-list-group-item d-flex d-none pattern-sorted-item">
        <div class="col">
            <input class="form-control sort-item" name="suggestion" type="text" placeholder="прим. Вариант">
        </div>
        <div class="col-1 d-flex align-items-center px-0 justify-content-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-expand" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"/>
            </svg>
        </div>
    </div>
    <%-----------------------------------------------------%>
    <%--Pattern semantic numbers--%>
    <div class="row py-2 d-none semantic-pattern">
        <div class="col-3">

        </div>
        <div class="col d-flex justify-content-between" name="availablePointsContainer">
            <span>-1</span>
            <span>0</span>
            <span>1</span>
        </div>
        <div class="col-3">

        </div>
    </div>
    <%-----------------------------------------------------%>
    <%--Pattern semantic element--%>
    <div class="row py-2 d-none semantic-element-pattern">
        <div class="col-3">
            <input class="form-control" name="newLeftText" type="text" placeholder="прим. Вариант">
        </div>
        <div class="col-6 d-flex align-items-center">
            <input type="range" class="form-range" min="1" max="3" disabled>
        </div>
        <div class="col-3">
            <input class="form-control" name="newRightText" type="text" placeholder="прим. Вариант">
        </div>
    </div>
    <%-----------------------------------------------------%>
    <%--Pattern distribute row--%>
    <div class="row py-2 d-none distribute-row-pattern">
        <div class="col">
            <div class="row">
                <div class="col">
                    <input class="form-control" name="distributeRowText" type="text" placeholder="прим. Вариант">
                </div>
            </div>
            <div class="row">
                <div class="col-11">
                    <input type="range" name="customRange" style="width: 100%; height: 30px;" min="0" max="100" value="0" disabled>
                </div>
                <div class="col-1">
                    <span>0</span>
                </div>
            </div>
        </div>
    </div>
    <%-----------------------------------------------------%>
</main>

<jsp:include page="footer.jsp" />
</body>
</html>
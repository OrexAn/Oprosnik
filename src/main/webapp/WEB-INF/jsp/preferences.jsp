<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<link type="text/css" href="<c:url value="/resources/bootstrap/css/bootstrap.css"/>" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">

<script src="http://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/preferences.js"></script>
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

<main class="px-3 text-center">
    <div class="row py-1 border">
        <div class="col d-flex justify-content-end">
            <button type="button" class="btn btn-success" onclick="publish('опубликовано')">Опубликовать</button>
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
        </div>
        <div class="col-10 border-end">
            <div class="row py-2">
                <div class="col" style="padding-left: 60px;">
                    <div class="row py-2">
                        <div class="col d-flex justify-content-start">
                            <h3>Настройки</h3>
                        </div>
                    </div>
                    <div class="row py-2">
                        <div class="col d-flex justify-content-start">
                            <h5>[${questionnaireTitle}]</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row py-2">
                <div class="col">
                    <div class="container px-0" style="min-height: 800px; max-height: 800px;">

                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<jsp:include page="footer.jsp" />
</body>
</html>
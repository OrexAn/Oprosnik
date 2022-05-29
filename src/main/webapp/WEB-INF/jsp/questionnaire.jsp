<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<link type="text/css" href="<c:url value="/resources/bootstrap/css/bootstrap.css"/>" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">

<script src="http://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/questionnaire.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/bootstrap/js/bootstrap.js"></script>
<script src="https://cdn.jsdelivr.net/gh/RubaXa/Sortable/Sortable.min.js"></script>

<style>
    .indicator{
        box-sizing: border-box;
        border: 1px solid #fff;
        background-color: rgba(0 0 0 0);
        border-radius: 10px;
        width: 10px;
        height: 10px;
        cursor: pointer;
    }
    .indicator .active{
        background-color: rgba(0 0 0 1);
    }
    .h-15{
        height: 15px;
    }
    .main-height{
        height: calc(100% - 15px);
    }
    .selected{
        outline: #4CAF50 solid 2px;
    }
    .form-control:focus{

    }
    .suggestion{
        background-color: #ffffff !important;
    }
    .suggestion:focus{
        background-color: #ffffff;
        border: 1px solid #ced4da;
        box-shadow: none;
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

    .rating>label:hover:before,
    .rating>label:hover~label:before {
        opacity: 1 !important
    }

    .rating>input:checked~label:before {
        opacity: 1
    }

    .rating:hover>input:checked~label:before {
        opacity: 0.4
    }

    .star-selected::before{
        opacity: 1 !important;
    }

    .star-selected~label:before{
        opacity: 1 !important;
    }

    .rating>input:checked~label:before {
        opacity: 1
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

<script>

</script>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
</head>
<body style="background-image: url(http://localhost:8080/img/support.jpg); background-size: cover;">

<header class="d-flex justify-content-center h-15">
    <div class="row">
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="indicator active"></div>
                </div>
            </div>
        </div>
    </div>
</header>
<input type="hidden" name="questionnaireId" value="${questionnaireId}">
<input type="hidden" name="questionnaireAId" value="${questionnaireId}">
<main class="px-3 text-center d-flex justify-content-center flex-column main-height">
    <div class="row">
        <div class="col-12">
            <div class="row py-2" id="startBlockId">
                <div class="col">
                    <div class="container px-0" style="min-height: 800px; max-height: 800px;">
                        <div style="width: 100%;height: 800px;">
                            <div style="min-height: 800px;">
                                <div style="height: 100%;">

                                    <div style="height: 100%;overflow-y: auto;overflow-x: hidden;" class="d-flex justify-content-center flex-column">

                                        <div class="row py-2 border-top border-bottom d-flex justify-content-center add-item-cell">
                                            <div class="col-2 d-flex justify-content-center flex-column">
                                                <h4 id="titleId"></h4>
                                            </div>
                                        </div>
                                        <%--<div class="row py-2 border-top border-bottom d-flex justify-content-center add-item-cell">
                                            <div class="col-2 d-flex justify-content-center flex-column">
                                                <h5>Описание</h5>
                                            </div>
                                        </div>--%>
                                        <div class="row py-2 border-top border-bottom d-flex justify-content-center add-item-cell">
                                            <div class="col-3 d-flex justify-content-center flex-column">
                                                <button type="button" class="btn btn-primary" onclick="startQuestionnaire()">
                                                    Приступить
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row py-2 d-none" id="progressBlockId">
                <div class="col">
                    <div class="container px-0" style="min-height: 800px; max-height: 800px;">
                        <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-interval="false" data-wrap="false" style="width: 100%;height: 800px;">
                            <div id="carouselItemsContainerId" class="carousel-inner" style="min-height: 800px;">
                                <div class="carousel-item active" page="0">
                                    <div style="height: 100%;overflow-y: auto;overflow-x: hidden;" id="qBlockContainer_0" class="justify-content-center flex-column">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row py-2 d-flex justify-content-end invisible" id="buttonsBlockId">
            <div class="col-1">
                <button type="button" class="btn btn-primary w-100 left invisible" id="finishButtonId" onclick="finishAnswer();">Finish</button>
            </div>
            <div class="col-1">
                <button type="button" class="btn btn-primary w-100 left" onclick="prev();">&lt;</button>
            </div>
            <div class="col-1">
                <button type="button" class="btn btn-primary w-100 right" onclick="next();">&gt;</button>
            </div>
        </div>
    </div>

<%--TODO нужно переделать паттерн--%>
    <div class="pattern-item d-none">
        <div style="height: 100%;overflow-y: auto;overflow-x: hidden;" id="qBlockContainer_n" class="justify-content-center flex-column question-block-container">
            <%--<div class="row py-2 border-top border-bottom d-flex justify-content-center question-block">
                <div class="col-5 d-flex justify-content-center flex-column">
                    <div class="row py-2">
                        <div class="col d-flex justify-content-start">
                            <a name="title">123</a>
                        </div>
                    </div>
                    <div class="row py-2">
                        <div class="col">
                            <input type="text" class="form-control" name="suggestion" readonly="true" value="1!" style="cursor: pointer">
                        </div>
                    </div>
                    <div class="row py-2">
                        <div class="col">
                            <input type="text" class="form-control selected" name="suggestion" readonly="true" value="2!" style="cursor: pointer">
                        </div>
                    </div>
                </div>
            </div>--%>
        </div>
    </div>
    <%--Pattern sorted item--%>
    <div class="row m-0 list-group-item d-flex d-none pattern-sorted-item">
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
        <div class="col-4">

        </div>
        <div class="col d-flex justify-content-between" name="availablePointsContainer">
            <span>-1</span>
            <span>0</span>
            <span>1</span>
        </div>
        <div class="col-4">

        </div>
    </div>
    <%-----------------------------------------------------%>
    <%--Pattern semantic element--%>
    <div class="row py-2 d-none semantic-element-pattern">
        <div class="col-4">
            <input class="form-control" name="newLeftText" type="text" placeholder="прим. Вариант">
        </div>
        <div class="col-4 d-flex align-items-center">
            <input type="range" name="range" class="form-range" min="1" max="3">
        </div>
        <div class="col-4">
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
            <div class="row" name="customRangeContainer">
                <div class="col-11">
                    <input type="hidden" name="constMaxValue">
                    <input type="range" name="customRange" style="width: 100%; height: 30px;" min="0" max="100" step="1" value="0">
                </div>
                <div class="col-1">
                    <span>0</span>
                </div>
            </div>
        </div>
    </div>
    <%-----------------------------------------------------%>

</main>





</body>
</html>
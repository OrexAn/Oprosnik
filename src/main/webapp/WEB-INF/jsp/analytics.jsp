<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<link type="text/css" href="<c:url value="/resources/bootstrap/css/bootstrap.css"/>" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">

<script src="http://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/analytics.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/bootstrap/js/bootstrap.js"></script>

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
</style>

<script>

</script>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
</head>
<body>

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

<main class="px-3 text-center d-flex justify-content-start flex-column main-height">
    <div class="row py-1 border">
        <div class="col d-flex justify-content-end">
            <button type="button" class="btn btn-warning" onclick="publish()">Редактировать</button>
        </div>
    </div>
    <div class="row h-100">
        <div class="col-2 border-end border-start">
            <div class="row py-2">
                <div class="col">
                    <button type="button" class="btn btn-light w-100">Анализ опросов</button>
                </div>
            </div>
            <div class="row py-2">
                <div class="col">
                    <button type="button" class="btn btn-light w-100">Индивидуальные ответы</button>
                </div>
            </div>
            <div class="row py-2">
                <div class="col">
                    <button type="button" class="btn btn-light w-100">Состояния опроса</button>
                </div>
            </div>
        </div>
        <div id="analyticsId" class="col-10 border-end">
            <div class="row py-2">
                <div class="col" style="padding-left: 60px;">
                    <div class="row py-2">
                        <div class="col d-flex justify-content-start">
                            <h3>Анализ опросов</h3>
                        </div>
                    </div>
                    <div class="row py-2">
                        <div class="col d-flex justify-content-start">
                            <h5>[Название опроса]</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row py-2 d-flex justify-content-around">
                <div class="col border" style="border-radius: 10px; width: 450px; max-width: 450px;">
                    <div class="row py-2">
                        <div class="col d-flex justify-content-center">
                            <h5>1. Первый вопрос ?</h5>
                        </div>
                    </div>
                    <div class="row py-2 d-flex justify-content-center">
                        <div class="col-6 d-flex justify-content-center" style="height: 350px; width: 350px; max-width: 450px;">
                            <canvas id="myChart"></canvas>
                        </div>
                    </div>
                    <div class="row py-2">
                        <div class="col d-flex justify-content-center">
                            <a href="#" class="link-primary">Детали</a>
                        </div>
                    </div>
                </div>
                <div class="col border" style="border-radius: 10px; width: 450px; max-width: 450px;">
                    <div class="row py-2">
                        <div class="col d-flex justify-content-center">
                            <h5>2. Второй вопрос ?</h5>
                        </div>
                    </div>
                    <div class="row py-2 d-flex justify-content-center">
                        <div class="col-6 d-flex justify-content-center" style="height: 350px; width: 350px;">
                            <canvas id="myChart2"></canvas>
                        </div>
                    </div>
                    <div class="row py-2">
                        <div class="col d-flex justify-content-center">
                            <a href="#" class="link-primary">Детали</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="ansversId" class="col-10 border-end" style="display: none">
            <jsp:include page="IndieAnswers.jsp" />
        </div>
    </div>
</main>





</body>
</html>
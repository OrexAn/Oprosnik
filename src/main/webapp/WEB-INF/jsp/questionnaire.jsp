<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<link type="text/css" href="<c:url value="/resources/bootstrap/css/bootstrap.css"/>" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">

<script src="http://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/questionnaire.js"></script>
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
                                                <h4>Название</h4>
                                            </div>
                                        </div>
                                        <div class="row py-2 border-top border-bottom d-flex justify-content-center add-item-cell">
                                            <div class="col-2 d-flex justify-content-center flex-column">
                                                <h5>Описание</h5>
                                            </div>
                                        </div>
                                        <div class="row py-2 border-top border-bottom d-flex justify-content-center add-item-cell">
                                            <div class="col-3 d-flex justify-content-center flex-column">
                                                <button type="button" class="btn btn-primary" onclick="startQuestionnaire()">
                                                    Start
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
                                    <div style="height: 100%;overflow-y: auto;overflow-x: hidden;" id="qBlockContainer_0" class="d-flex justify-content-center flex-column">
                                        <%--<div class="row py-2 border-top border-bottom d-flex justify-content-center question-block" id="q_0">
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
                                            </div>--%>
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
                    <button type="button" class="btn btn-primary w-100 left">Finish</button>
                </div>
                <div class="col-1">
                    <button type="button" class="btn btn-primary w-100 left" onclick="prev();">&lt;</button>
                </div>
                <div class="col-1">
                    <button type="button" class="btn btn-primary w-100 right" onclick="next();">&gt;</button>
                </div>
            </div>
        </div>
    </div>

<%--TODO нужно переделать паттерн--%>
    <div class="pattern-item d-none">
        <div style="height: 100%;overflow-y: auto;overflow-x: hidden;" id="qBlockContainer_n" class="d-flex justify-content-center flex-column question-block-container">
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

</main>





</body>
</html>
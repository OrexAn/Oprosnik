<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<link type="text/css" href="<c:url value="/resources/bootstrap/css/bootstrap.css"/>" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">

<script src="http://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/builder.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/bootstrap/js/bootstrap.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/builder.js"></script>

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
        box-shadow: 0 0 0 4px rgba(49 132 253 0.5);
    }
</style>

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
            <div class="row py-2">
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
                                                <button type="button" class="btn btn-primary">
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
            <div class="row py-2 d-none">
                <div class="col">
                    <div class="container px-0" style="min-height: 800px; max-height: 800px;">
                        <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-interval="false" data-wrap="false" style="width: 100%;height: 800px;">
                            <div id="carouselItemsContainerId" class="carousel-inner" style="min-height: 800px;">
                                <div class="carousel-item active">
                                    <div style="height: 100%;overflow-y: auto;overflow-x: hidden;" class="d-flex justify-content-center flex-column">
                                        <div class="row py-2 border-top border-bottom d-flex justify-content-center" id="q_0">
                                            <div class="col-5 d-flex justify-content-center flex-column">
                                                <div class="row py-2">
                                                    <div class="col d-flex justify-content-start">
                                                        <a>123</a>
                                                    </div>
                                                </div>
                                                <div class="row py-2">
                                                    <div class="col">
                                                        <input type="text" class="form-control" disabled="true" readonly="true" value="1!">
                                                    </div>
                                                </div>
                                                <div class="row py-2">
                                                    <div class="col">
                                                        <input type="text" class="form-control selected" disabled="true" readonly="true" value="2!">
                                                    </div>
                                                </div>
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
    <div class="carousel-item pattern-item d-none" style="height: 100%;">
        <div class="row">
            <div class="col">
                <h5 class="page-name"></h5>
            </div>
        </div>
        <div style="height: 100%;overflow-y: auto;overflow-x: hidden;" class="d-flex justify-content-center flex-column">
            <div class="row py-2 border-top border-bottom d-flex justify-content-center d-none select-question-type">
                <div class="col-2 d-flex justify-content-center flex-column border-end">
                    <a>Выберите тип вопроса</a>
                </div>
                <div class="col-2 add-item-cell" onclick="typeSelected('Одиночный выбор')">
                    <div class="row py-2">
                        <div class="col">
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
                <div class="col-2 add-item-cell" onclick="typeSelected('Множественный выбор')">
                    <div class="row py-2">
                        <div class="col">
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

</main>





</body>
</html>
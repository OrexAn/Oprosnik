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
    .add-item-cell:hover{
    background-color: #f0f8ff;
}
</style>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
</head>
<body>
<jsp:include page="header.jsp" />
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
                                <label for="newTitleInputId">Вопрос</label>
                                <input id="newTitleInputId" class="form-control" type="text" value="">
                            </div>
                        </div>
                        <div class="row py-2">
                            <div class="col">
                                <label for="selectQ_1">Ответ 1</label>
                                <input id="selectQ_1" class="form-control choose-question" type="text" value="">
                            </div>
                        </div>
                        <div id="addAnswerContainerId" class="row py-2">
                            <div class="col">
                                <button type="button" class="btn btn-outline-success w-100" onclick="addAnswer()">+ Добавить ответ</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                <button type="button" class="btn btn-primary" onclick="createSelectedType()">Создать</button>
            </div>
        </div>
    </div>
</div>
<%-----------------------------------------------------------%>

<main class="px-3 text-center">
    <div class="row py-1 border">
        <div class="col d-flex justify-content-end">
            <button type="button" class="btn btn-success">Опубликовать</button>
        </div>
    </div>
    <div class="row">
        <div class="col-2 border-end border-start">
            <div class="row py-2">
                <div class="col">
                    <button type="button" class="btn btn-light w-100">Редактор</button>
                </div>
            </div>
            <div class="row py-2">
                <div class="col">
                    <button type="button" class="btn btn-light w-100">Настройки</button>
                </div>
            </div>
            <div class="row py-2">
                <div class="col">
                    <button type="button" class="btn btn-light w-100">Распространение</button>
                </div>
            </div>
            <div class="row py-2 border-bottom">
                <div class="col">
                    <button type="button" class="btn btn-light w-100">Результаты</button>
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
                                <div class="carousel-item active" style="height: 100%;">
                                    <div class="row">
                                        <div class="col">
                                            <h5>Page 0</h5>
                                        </div>
                                    </div>
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
                                                    <input type="text" class="form-control" value="Приступить" maxlength="30" style="text-align: center;
                                                    background: transparent; border: none; color: white; box-shadow: none;">
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="carousel-item">
                                    <div class="row">
                                        <div class="col">
                                            <h5>Page 1</h5>
                                        </div>
                                    </div>
                                    <div style="height: 100%;overflow-y: auto;overflow-x: hidden;" class="d-flex justify-content-center flex-column">
                                        <div id="selectQuestionType_1" class="row py-2 border-top border-bottom d-flex justify-content-center d-none">
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
    <%-----------------------------------------------------%>
    <%--Pattern page button--%>
    <div class="row py-2 pattern-button d-none">
        <div class="col">
            <button type="button" class="btn btn-light w-100"></button>
        </div>
    </div>
    <%-----------------------------------------------------%>
</main>

<jsp:include page="footer.jsp" />
</body>
</html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<script src="http://code.jquery.com/jquery-3.5.1.min.js"></script>
<link type="text/css" href="<c:url value="/resources/bootstrap/css/bootstrap.css"/>" rel="stylesheet">
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/home.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/bootstrap/js/bootstrap.js"></script>
<script type="text/javascript">
    $(window).on('load',function(){
        $('#myTrigger').click(function (){
            $('#myModal').modal('show');
        });
    });

</script>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hello ${name}!</title>
</head>
<body>
<jsp:include page="header.jsp" />

<style>
    .image{
        background-size: 100% auto;
        height: 150px;
        width: 150px;
        background-image: url("img/addItemNew.png");
    }
    .image:hover{
        background-image: url("img/addItemNewHover.png");
    }
    .image:active{
        background-image: url("img/addItemNewClicked.png");
    }
</style>



<main class="px-5 text-center">
    <h1>Welcome to Q-Ask service!</h1>
    <%-----------------------------------------------------------%>
    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Назовите анкету</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="text" class="form-control" placeholder="Введите текст...">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                    <button type="button" class="btn btn-primary">Создать</button>
                </div>
            </div>
        </div>
    </div>
    <%-----------------------------------------------------------%>
    <div class="row" style="padding-top: 50px;">
        <div class="col d-flex justify-content-start">
            <p style="margin: 0;">Создате новый опрос или редактируйте существующий</p>
        </div>
    </div>
    <div class="row py-4">
        <div class="col-2">
            <div class="d-flex justify-content-start">
                <div id="myTrigger" class="image" tabindex="-1"></div>
            </div>
        </div>
    </div>
    <div class="row pb-4" style="padding-top: 130px;">
        <div class="col-3 d-flex justify-content-start">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Введите текст..." aria-label="Recipient's username" aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button">Искать</button>
                </div>
            </div>
        </div>
    </div>

    <div>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">Название</th>
                <th scope="col">Ответило</th>
                <th scope="col">Вопросов</th>

            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">О социалках</th>
                <td>755</td>
                <td>12</td>

            </tr>
            <tr>
                <th scope="row">Любители книг</th>
                <td>1589</td>
                <td>15</td>

            </tr>
            <tr>
                <th scope="row">Коммуналка</th>
                <td>17</td>
                <td>3</td>

            </tr>
            </tbody>
        </table>
    </div>
    <h2 class="hello-title" id="hello-id" style="display: none">Hello ${user.name}!</h2>
</main>
<div class="container" id="login-container" style="display: none">
    <jsp:include page="login-form.jsp" />
</div>

<jsp:include page="footer.jsp" />
</body>
</html>
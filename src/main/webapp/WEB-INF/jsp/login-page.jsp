<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<script src="http://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/bootstrap/js/bootstrap.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/log-in.js"></script>

<link type="text/css" href="<c:url value="/resources/bootstrap/css/bootstrap.css"/>" rel="stylesheet">

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hello ${name}!</title>
</head>
<body style="background-image: url(http://localhost:8080/img/registration.jpg); background-size: cover;">
<jsp:include page="header.jsp" />
<div class="container d-flex align-items-center" style="width: 350px; height: calc(100% - 80px);">
    <div class="row w-100">
        <div class="col">
            <form action="submit_login" method="post" id="loginForm">
                <div class="form-group py-2">
                    <label for="inputUserName">Почта</label>
                    <input type="email" class="form-control" id="inputUserName" name="username" autocomplete="off" placeholder="Введите почту...">
                </div>
                <div class="form-group py-2">
                    <label for="inputPassword">Пароль</label>
                    <input type="password" class="form-control" id="inputPassword" name="password" autocomplete="off" placeholder="Введите пароль...">
                    <div id="validationLoginFeedback" class="invalid-feedback">
                        Неверная почта или пароль.
                    </div>
                </div>
                <div class="form-group py-2">
                    <button class="btn btn-primary py-2" onclick="loginUser()">Войти</button>
                </div>
                <input type="hidden" name="page" id="page-url" value=""/>
            </form>
        </div>
    </div>
</div>

</body>
</html>

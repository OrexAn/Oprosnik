<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Форма регистрации</title>
    <script src="http://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/bootstrap/js/bootstrap.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/register.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"/>
</head>
<body style="background-image: url(http://localhost:8080/img/registration.jpg); background-size: cover;">
<jsp:include page="header.jsp" />

<%-----------------------------------------------------------%>
<%--Alert modal--%>
<jsp:include page="SuccessAlertModal.jsp" />
<jsp:include page="ErrorAlertModal.jsp" />
<%------------------------------------------------------------%>

<main class="px-3 text-center">
    <h1>Зарегистрировать аккаунт</h1>
    <div class="container d-flex align-items-center" style="width: 350px; height: calc(100% - 80px);">
        <div class="row w-100">
            <div class="col">
                <div>
                    <div class="form-group py-2">
                        <label for="userNameId">Имя пользователя</label>
                        <input type="text" class="form-control" id="userNameId" autocomplete="off" required placeholder="Введите имя пользователя..." required>
                    </div>
                    <div class="form-group py-2">
                        <label for="emailId">Почта</label>
                        <input type="email" class="form-control" id="emailId" name="email" autocomplete="off" placeholder="Введите email..." required>
                    </div>
                    <div class="form-group py-2">
                        <label for="passwordId">Пароль</label>
                        <input type="password" class="form-control" id="passwordId" name="password" required autocomplete="new-password" placeholder="Введите пароль..." required>
                    </div>
                    <div class="form-group py-2">
                        <button class="btn btn-primary py-2" onclick="registerUser()">Регистрация</button>
                    </div>
                    <input type="hidden" name="page" id="page-url" value=""/>
                </div>
            </div>
        </div>
    </div>
</main>

<jsp:include page="footer.jsp" />
</body>

</html>

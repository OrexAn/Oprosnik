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
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/register.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</head>
<body>
<jsp:include page="header.jsp" />
<main class="px-3 text-center">
    <h1>Зарегистрировать аккаунт</h1>
    <div class="container d-flex align-items-center" style="width: 350px; height: calc(100% - 80px);">
        <div class="row w-100">
            <div class="col">
                <form>
                    <!--  fake fields are a workaround for chrome/opera autofill getting the wrong fields -->
                    <input id="username" style="display:none" type="text" name="fakeusernameremembered">
                    <input id="password" style="display:none" type="password" name="fakepasswordremembered">
                    <div class="form-group py-2">
                        <label for="userNameId">Имя пользователя</label>
                        <input type="text" class="form-control" id="userNameId" autocomplete="off" required placeholder="Введите имя пользователя...">
                    </div>
                    <div class="form-group py-2">
                        <label for="emailId">Email</label>
                        <input type="text" class="form-control" id="emailId" name="email" autocomplete="off" placeholder="Введите email...">
                    </div>
                    <div class="form-group py-2">
                        <label for="passwordId">Пароль</label>
                        <input type="password" class="form-control" id="passwordId" name="password" required autocomplete="new-password" placeholder="Введите пароль...">
                    </div>
                    <div class="form-group py-2">
                        <button type="button" class="btn btn-primary py-2" onclick="registerUser()">Регистрация</button>
                    </div>
                    <input type="hidden" name="page" id="page-url" value=""/>
                </form>
            </div>
        </div>
    </div>
</main>

<jsp:include page="footer.jsp" />
</body>

</html>

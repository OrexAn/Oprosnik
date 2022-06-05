<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>


<!DOCTYPE html>
<html lang="en">
<head>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/log-in.js"></script>
    <link type="text/css" href="<c:url value="/resources/css/login-form.css"/>" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"/>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <title>Форма для входа</title>
</head>
<script type="text/javascript">
    $(window).on('load',function(){
        $('#loginTrigger').click(function (){
            $('#loginModal').modal('show');
        });
    });

</script>
<body>
<main>

</main>
<div class="container">
    <!-- Modal -->
    <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="container py-4" style="width: 380px; height: 100%;">
                    <div class="row">
                        <div class="col-4">
                            <h4>Войти</h4>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <form action="submit_login" method="post" class="m-0">
                                <div class="form-group py-2 m-0">
                                    <label for="inputUserName">Почта</label>
                                    <input type="email" class="form-control" id="inputUserName" name="username" autocomplete="off" placeholder="Введите почту">
                                </div>
                                <div class="form-group py-2 m-0">
                                    <label for="inputPassword">Пароль</label>
                                    <input type="password" class="form-control" id="inputPassword" name="password" autocomplete="off" placeholder="Введите пароль">
                                </div>
                                <div class="form-group py-2 m-0">
                                    <button class="btn btn-primary py-2" onclick="loginUser()">Войти</button>
                                </div>
                                <input type="hidden" name="page" id="page-url" value=""/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <%-----------------------------------------------------------%>
</div>


</body>
</html>

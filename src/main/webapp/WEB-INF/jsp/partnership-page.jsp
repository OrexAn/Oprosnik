<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Q-Ask</title>
    <script src="http://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

</head>
<body style="background-image: url(http://localhost:8080/img/registration.jpg); background-size: cover;">
<jsp:include page="header.jsp" />

<div class="container" style="text-align: center">
    <h1>Наши партнёры</h1>
    <p>Здесь, в сервисе Q-Ask, мы уделяем большое значение отношениям с нашими корпоративными партнерами.<br>Будь то активное участие в жизни проекта или организация анкет для наших партнёров, существует множество способов, с помощью которых корпоративные партнеры могут наладить взаимовыгодные отношения с Q-Ask.</p>
    <img src="<c:url value="/resources/img/nasdaq_company_logos.jpg"></c:url>" id="partners-id">
</div>
<div class="container" id="login-container" style="display: none">
    <jsp:include page="login-form.jsp" />
</div>

<jsp:include page="footer.jsp" />
</body>
</html>

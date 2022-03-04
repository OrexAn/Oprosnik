<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<script src="http://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/home.js"></script>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hello ${name}!</title>
    <link type="text/css" href="<c:url value="/resources/css/login-page.css"/>" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"/>

</head>
<body>
<jsp:include page="header.jsp" />
<div class="container">
    <div class="box-background"></div>
    <div class="log-tab-back"></div>

    <form action="submit_login" method="post">
        <%--<div class="center round1"></div>--%>
        <table class="log-tab">
            <tr>
                <th style="width: 30%"></th>
                <th style="width: 70%"></th>
            </tr>
            <tr>
                <td><label for="inputUserName">UserName</label></td>
                <%--<td><input type="text" name="username" style="font-size: 14pt"/></td>--%>
                <td><input type="text" class="form-control" id="inputUserName" name="username" placeholder="username"></td>
            </tr>
            <tr>
                <td><label for="inputPassword">Password</label></td>
                <%--<td><input type="password" name="password" style="font-size: 14pt" /></td>--%>
                <td><input type="password" class="form-control" id="inputPassword" name="password" placeholder="password" autocomplete="on"></td>
            </tr>
            <tr>
                <td colspan="2" style="text-align: center">
                    <button type="submit" class="btn btn-primary">Log-in</button>
                </td>
            </tr>
        </table>
        <input type="hidden" name="page" id="page-url" value=""/>
    </form>
</div>

</body>
</html>

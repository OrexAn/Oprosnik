<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>


<!DOCTYPE html>
<html lang="en">
<head>
    <script src="http://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/log-in.js"></script>
    <link type="text/css" href="<c:url value="/resources/css/login-form.css"/>" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"/>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <title>Login Form</title>
</head>
<body>
<main>

</main>
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

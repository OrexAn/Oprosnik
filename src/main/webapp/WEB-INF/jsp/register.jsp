<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Register Form</title>
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
    <h1>Register new account</h1>

    <div class="container" style="text-align: center">
        <!--  fake fields are a workaround for chrome/opera autofill getting the wrong fields -->
        <input id="username" style="display:none" type="text" name="fakeusernameremembered">
        <input id="password" style="display:none" type="password" name="fakepasswordremembered">
        <table style="margin: 0 auto; ">
            <tr>
                <td>Name</td>
                <td><input type="text" id="name-id" required/></td>
            </tr>
            <tr>
                <td>Email</td>
                <td><input type="text" id="email-id" /></td>
            </tr>
            <tr>
                <td>Number</td>
                <td><input type="tel" id="number-id" /></td>
            </tr>
            <tr>
                <td>UserName</td>
                <td><input type="text" id="username-id" required autocomplete="nope"/></td>
            </tr>
            <tr>
                <td>Password</td>
                <td><input type="password" id="password-id" required autocomplete="new-password"/></td>
            </tr>
        </table>
        <br>
        <button class="btn btn-primary" onclick="registerPerson()">Register</button>
    </div>
</main>

<jsp:include page="footer.jsp" />
</body>

</html>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>


<!DOCTYPE html>
<html lang="en">
<head>
    <link type="text/css" href="<c:url value="/resources/css/profile.css"/>" rel="stylesheet">
</head>
<body>
<main>

</main>
<div class="container">
    <div class="img-tbl-box-background" id="img-tbl-box-background-id"></div>
    <div class="img-tab-back"></div>

    <form action="submit_login" method="post">
        <table class="image-pic-table">
            <tr>
                <td style="text-align: center"><img src="<c:url value="/resources/img/avatar.png"></c:url>" id="avatar-id" width="48" height="48" onclick="selectAvatar('avatar')"></td>
                <td><img src="<c:url value="/resources/img/doctor.png"></c:url>" id="doctor-id" width="48" height="48" onclick="selectAvatar('doctor')"></td>
                <td><img src="<c:url value="/resources/img/avatar-in-glass.png"></c:url>" id="avatar-in-glass-id" width="48" height="48" onclick="selectAvatar('avatar-in-glass')"></td>
            </tr>
            <tr>
                <td><img src="<c:url value="/resources/img/student.png"></c:url>" id="student-id" width="48" height="48" onclick="selectAvatar('student')"></td>
                <td><img src="<c:url value="/resources/img/nurse.png"></c:url>" id="nurse-id" width="48" height="48" onclick="selectAvatar('nurse')"></td>
                <td><img src="<c:url value="/resources/img/no-avatar.png"></c:url>" id="no-avatar-id" width="48" height="48" onclick="selectAvatar('no-avatar')"></td>
            </tr>
        </table>
    </form>
</div>


</body>
</html>

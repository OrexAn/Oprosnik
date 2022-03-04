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
    <div class="img-tbl-box-background" id="manager-img-tbl-box-background-id"></div>
    <div class="img-tab-back"></div>

    <form action="submit_login" method="post">
        <table class="image-pic-table">
            <tr>
                <td style="text-align: center"><img src="<c:url value="/resources/img/avatar.png"></c:url>" id="manager-avatar-id" width="48" height="48" onclick="selectManagerAvatar('avatar')"></td>
                <td><img src="<c:url value="/resources/img/doctor.png"></c:url>" id="manager-doctor-id" width="48" height="48" onclick="selectManagerAvatar('doctor')"></td>
                <td><img src="<c:url value="/resources/img/avatar-in-glass.png"></c:url>" id="manager-avatar-in-glass-id" width="48" height="48" onclick="selectManagerAvatar('avatar-in-glass')"></td>
            </tr>
            <tr>
                <td><img src="<c:url value="/resources/img/student.png"></c:url>" id="manager-student-id" width="48" height="48" onclick="selectManagerAvatar('student')"></td>
                <td><img src="<c:url value="/resources/img/nurse.png"></c:url>" id="manager-nurse-id" width="48" height="48" onclick="selectManagerAvatar('nurse')"></td>
                <td><img src="<c:url value="/resources/img/no-avatar.png"></c:url>" id="manager-no-avatar-id" width="48" height="48" onclick="selectManagerAvatar('no-avatar')"></td>
            </tr>
        </table>
    </form>
</div>


</body>
</html>

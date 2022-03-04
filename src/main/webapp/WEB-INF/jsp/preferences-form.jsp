<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<html>
<head>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/preferences-form.js"></script>
</head>
<body>
<div class="container">
    <label for="inputNickName">NickName</label>
    <input type="text" class="form-control" id="inputNickName" name="nickname" placeholder="nickname">

    <label for="inputTel">Tel.</label>
    <input type="tel" class="form-control" id="inputTel" name="tel" placeholder="tel">

    <div class="row" style="height: 60px">
        <div class="col-md">
            <label for="selectImage-id">Avatar</label>
        </div>
        <div class="col-md">
            <img src="<c:url value="/resources/img/${person.avatar}.png"></c:url>" id="avatar-preview-id" width="48" height="48">
        </div>
    </div>

    <button class="btn btn-secondary" type="button" id="selectImageButton">
        Select avatar
    </button>
    <div id="selectImage-id" style="display: none">
        <jsp:include page="image-picker.jsp"></jsp:include>
    </div>
    <br>

    <label for="selectStatus">Status</label>
    <div id="selectStatus" class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Select status
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item">Active</a>
            <a class="dropdown-item">Ready for project</a>
            <a class="dropdown-item">Temporarily inactive</a> <%--href="#"--%>
        </div>
    </div>
    <br>
    <button type="submit" class="btn btn-primary">Submit</button>
    <br>
    <input type="hidden" id="contextPath" value="${pageContext.request.contextPath}">
</div>
</body>
</html>

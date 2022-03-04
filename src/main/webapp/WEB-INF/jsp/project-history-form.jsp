<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<html>
<head>
    <meta charset="UTF-8">
    <title>Make popular!</title>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/project-history-form.js"></script>
</head>
<body>
<div id="history-project-info-container-id" style="display: none">
    <jsp:include page="history-project-info.jsp"></jsp:include>
</div>

<div class="container" id="projects-history-container-id">
</div>
</body>
</html>

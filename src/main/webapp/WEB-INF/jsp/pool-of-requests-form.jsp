<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<html>
<head>
    <meta charset="UTF-8">
    <title>Make popular!</title>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/pool-of-requests-form.js"></script>
</head>
<body>
<div class="container">
    <c:forEach items="${requestDocs}" var="result" varStatus="theCount">
        <div class="btn-toolbar justify-content-between mb-3" style="width: 100%; background-color: #a1ffe6">
            <div class="btn-group mr-2">
                <button type="button" class="btn btn-sm btn-outline-secondary"><c:out value="${result.username}"/> [<c:out value="${result.date}"/>]</button>
                <button type="button" id="${result.username}" name="request-info" class="btn btn-sm btn-outline-secondary">Info</button>
            </div>
        </div>
    </c:forEach>
    <div id="response-form-container-id" style="display: none">
        <jsp:include page="response-form.jsp"></jsp:include>
    </div>
</div>
</body>
</html>

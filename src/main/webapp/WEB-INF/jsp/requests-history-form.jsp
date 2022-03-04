<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<html>
<%--<head>
    <meta charset="UTF-8">
    <title>Make popular!</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"/>
</head>--%>
<body>
<div class="container">
    <h3>Requests History</h3>
    <c:forEach begin="0" end="10" var="i">
        <div class="btn-toolbar justify-content-between mb-3" style="width: 100%; background-color: #ffb7b7">
            <div class="btn-group mr-2">
                <button type="button" class="btn btn-sm btn-outline-secondary">${i+1} [1/1/2021]</button>
                <button type="button" class="btn btn-sm btn-outline-secondary">Info</button>
            </div>
            <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">
                This week
            </button>
        </div>
    </c:forEach>
</div>
</body>
</html>

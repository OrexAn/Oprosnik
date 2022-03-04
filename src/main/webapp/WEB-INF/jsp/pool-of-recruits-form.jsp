<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<html>
<head>
    <meta charset="UTF-8">
    <title>Make popular!</title>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/pool-of-recruits-form.js"></script>
</head>
<body>
<div class="container" id="recruits-container-id">

</div>
<div id="assign-response-form-container-id" style="display: none">
    <jsp:include page="assign-response-form.jsp"></jsp:include>
</div>
</body>
</html>

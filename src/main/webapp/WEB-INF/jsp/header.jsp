<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/header.js"></script>

<%--<header class="d-flex justify-content-end align-items-center bg-body border-bottom shadow-sm">--%>
<header class="d-flex flex-column flex-md-row align-items-center p-2 px-md-4 mb-3 bg-white border-bottom shadow-sm">
    <p class="h5 my-0 mr-auto p-2 me-md-auto fw-normal" style="cursor:pointer;" onclick="goToHomePage()">Q-Ask</p>
    <nav class="my-2 my-md-0 me-md-3">
        <a class="p-2 text-dark" id="contacts" href="http://localhost:8080/mp/contacts">Contacts</a>
        <a class="p-2 text-dark" id="partner" href="http://localhost:8080/mp/partnership">Partnership</a>
        <a class="p-2 text-dark" id="support" href="http://localhost:8080/mp/support">Support</a>
        <a class="p-2 text-dark" id="profile-link" href="http://localhost:8080/mp/profile/${person.id}">My Profile</a>
    </nav>
    <a class="btn btn-outline-success" href="http://localhost:8080/mp/register">Sign up</a>
    <a class="btn btn-outline-primary" id="sign-in">Sign in</a>
    <a class="btn btn-outline-primary" id="sign-out">Sign out</a>
    <input type="hidden" id="auth" value="${isAuth}">
    <input type="hidden" id="user_id" value="${person.id}">
    <input type="hidden" id="user-authority-id" value="${person.authority}">
    <%--<a class="btn btn-outline-primary" href="http://localhost:8080/mp/home/login">Sign in</a>--%>
    <%--href="http://localhost:8080/mp/login"--%>
</header>

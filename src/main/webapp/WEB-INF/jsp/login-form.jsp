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
<script type="text/javascript">
    $(window).on('load',function(){
        $('#loginTrigger').click(function (){
            $('#loginModal').modal('show');
        });
    });

</script>
<body>
<main>

</main>
<div class="container">
    <div class="box-background"></div>

    <!-- Modal -->
    <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="container py-4" style="width: 380px; height: 100%;">
                    <div class="row">
                        <div class="col-4">
                            <h4>Войти</h4>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <form action="submit_login" method="post" class="m-0">
                                <div class="form-group py-2 m-0">
                                    <label for="inputUserName">Username</label>
                                    <input type="text" class="form-control" id="inputUserName" autocomplete="off" placeholder="Enter username">
                                </div>
                                <div class="form-group py-2 m-0">
                                    <label for="inputPassword">Password</label>
                                    <input type="password" class="form-control" id="inputPassword" name="password" autocomplete="off" placeholder="Password">
                                </div>
                                <div class="form-group py-2 m-0">
                                    <button type="submit" class="btn btn-primary py-2">Submit</button>
                                </div>
                                <input type="hidden" name="page" id="page-url" value=""/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <%-----------------------------------------------------------%>
</div>


</body>
</html>

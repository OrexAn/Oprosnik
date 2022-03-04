<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>


<!DOCTYPE html>
<html lang="en">
<head>
    <link type="text/css" href="<c:url value="/resources/css/active-project-info.css"/>" rel="stylesheet">
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/history-project-info.js"></script>
</head>
<body>
<main>

</main>
<div class="container">
    <div class="act-project-info-table-box-background" id="act-project-info-table-box-background-id"></div>
    <div class="act-project-info-table-back"></div>

    <table class="act-project-info-table">
        <tbody>
        <tr>
            <td colspan="4"  style="text-align: left" valign="top">
                <div class="container">
                    <table class="inner-act-project-info-table" id="act-project-info-table-id">
                        <tbody>
                        <tr>
                            <td>Descriptions</td>
                        </tr>
                        <tr>
                            <td colspan="4" style="text-align: left"><p id="description-history-info-id">Some info about project</p></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </td>
        </tr>

        </tbody>
        <tfoot>
        <tr>
            <td></td>
            <td colspan="2"  style="text-align: center" valign="top">
                <button class="btn btn-primary" id="close-history-project-info-id">Ok</button>
            </td>
            <td></td>
        </tr>
        </tfoot>
    </table>
</div>


</body>
</html>

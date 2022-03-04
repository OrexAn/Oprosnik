<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>


<!DOCTYPE html>
<html lang="en">
<head>
    <link type="text/css" href="<c:url value="/resources/css/report-view-form.css"/>" rel="stylesheet">
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/report-view-form.js"></script>
</head>
<body>
<main>

</main>
<div class="container">
    <div class="report-view-table-box-background" id="report-view-table-box-background-id"></div>
    <div class="report-view-table-back"></div>

    <table class="report-view-table">
        <tbody>
        <tr>
            <td colspan="4"  style="text-align: left" valign="top">
                <div class="container">
                    <table class="inner-report-view-table" id="report-view-table-id">
                        <tbody>
                        <tr>
                            <td>Descriptions</td>
                        </tr>
                        <tr>
                            <td colspan="4"><p id="description-report-view-id">Some info about project</p></td>
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
            <td colspan="2"  style="text-align: center" valign="top">
                <button class="btn btn-primary" id="accept-report-view-id">Accept</button>
            </td>
            <td colspan="2"  style="text-align: center" valign="top">
                <button class="btn btn-primary" id="reject-report-view-id">Reject</button>
            </td>
        </tr>
        </tfoot>
    </table>
</div>


</body>
</html>

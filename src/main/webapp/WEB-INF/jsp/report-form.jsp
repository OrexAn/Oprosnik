<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>


<!DOCTYPE html>
<html lang="en">
<head>
    <link type="text/css" href="<c:url value="/resources/css/report-form.css"/>" rel="stylesheet">
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/report-form.js"></script>
</head>
<body>
<main>

</main>
<div class="container">
    <input type="hidden" id="user-name-report-id" value="${person.userName}">
    <input type="hidden" id="user-id-report-id" value="${person.id}">
    <input type="hidden" id="status-report-id" value="DONE">
    <input type="hidden" id="doc-type-report-id" value="REPORT">
    <div class="report-table-box-background" id="report-table-box-background-id"></div>
    <div class="report-table-back"></div>

    <table class="report-form-table">
        <tbody>
            <tr>
                <td colspan="4"  style="text-align: left" valign="top">
                    <div class="container">
                        <table class="inner-report-form-table" id="report-form-table-id">
                            <tbody>
                            <tr>
                                <td colspan="2"><h3>Fill report</h3></td>
                            </tr>
                            <tr>
                                <td colspan="2">Nick name on site</td>
                                <td colspan="2"><input type="text" name="description-report-nick" value=""></td>

                            </tr>
                            <tr>
                                <td>Link</td>
                                <td><input type="text" name="description-report-link" value=""></td>
                                <td>Time</td>
                                <td><input type="text" name="description-report-time" value=""></td>
                            </tr>
                            <tr>
                                <td><input type="button" class="add-row" value="Add link"></td>
                                <td><input type="button" class="delete-row" value="Remove link" style="margin: 10px 0px"></td>
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
                <td colspan="2"><input type="button" class="btn btn-primary" value="Submit" onclick="submitReport()"></td>
                <td></td>
            </tr>
        </tfoot>
    </table>
</div>


</body>
</html>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>


<!DOCTYPE html>
<html lang="en">
<head>
    <link type="text/css" href="<c:url value="/resources/css/assign-response-form.css"/>" rel="stylesheet">
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/assign-response-form.js"></script>
</head>
<body>
<main>

</main>
<div class="container">
    <input type="hidden" id="user-name-assign-response-id" value="${person.userName}">
    <input type="hidden" id="user-id-assign-response-id" value="${person.id}">
    <input type="hidden" id="status-assign-response-id" value="OK">
    <input type="hidden" id="doc-type-assign-response-id" value="RESPONSE">
    <div class="assign-response-table-box-background" id="assign-response-table-box-background-id"></div>
    <div class="assign-response-table-back"></div>

    <table class="assign-response-form-table">
        <tbody>
            <tr>
                <td colspan="4"  style="text-align: left" valign="top">
                    <div class="container">
                        <table class="inner-assign-response-form-table" id="assign-response-form-table-id">
                            <tbody>
                            <tr>
                                <td>Descriptions</td>
                            </tr>
                            <tr>
                                <td colspan="4"><input type="text" name="assign-description-text" placeholder="Write here description of response" value=""></td>
                            </tr>
                            <tr>
                                <td>Link</td>
                                <td><input type="text" name="assign-description-link" value=""></td>
                                <td>Cost</td>
                                <td><input type="text" name="assign-description-cost" value=""></td>
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
                <td colspan="2"><input type="button" class="btn btn-primary" value="Submit" onclick="submitAssignResponse()"></td>
                <td></td>
            </tr>
        </tfoot>
    </table>
</div>


</body>
</html>

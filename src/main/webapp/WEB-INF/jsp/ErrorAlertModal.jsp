<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>


<div id="errorAlertModal" class="modal fade">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" style="background-color: #af5c5b;">
            <!-- dialog body -->
            <div class="modal-body d-flex justify-content-center">
                <span id="errorAlertSpanId"></span>
            </div>
            <!-- dialog buttons -->
            <div class="modal-footer d-flex justify-content-center">
                <button id="errorAlertButtonId" type="button" class="btn btn-danger" data-bs-dismiss="modal">OK</button>
            </div>
        </div>
    </div>
</div>

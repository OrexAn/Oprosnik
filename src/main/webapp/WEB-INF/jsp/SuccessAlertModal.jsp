<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>


<div id="alertModal" class="modal fade">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" style="background-color: #d1e7dd;">
            <!-- dialog body -->
            <div class="modal-body d-flex justify-content-center">
                <span id="alertSpanId"></span>
            </div>
            <!-- dialog buttons -->
            <div class="modal-footer d-flex justify-content-center">
                <button id="alertButtonId" type="button" class="btn btn-success" onclick="return true;">OK</button>
            </div>
        </div>
    </div>
</div>

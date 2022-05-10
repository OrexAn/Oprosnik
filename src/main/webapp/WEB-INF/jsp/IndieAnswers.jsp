<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/IndieAnswers.js"></script>

<div class="row py-2">
    <div class="col" style="padding-left: 60px;">
        <div class="row py-2">
            <div class="col d-flex justify-content-start">
                <h3>Индивидуальные ответы</h3>
            </div>
        </div>
        <div class="row py-2">
            <div class="col d-flex justify-content-start">
                <h5>[${questionnaireTitle}]</h5>
            </div>
        </div>
    </div>
</div>
<div class="row py-2 d-flex justify-content-around px-4" style="padding-left: 60px !important;">
    <div class="col border" style="border-radius: 10px; width: 450px;">
        <div>
            <div id="indieAnswersListTableId" style="height: 300px; width:100%;" class="ag-theme-alpine"></div>
        </div>
    </div>
</div>
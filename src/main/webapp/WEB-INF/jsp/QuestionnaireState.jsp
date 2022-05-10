<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/QuestionnaireState.js"></script>

<div class="row py-2">
    <div class="col" style="padding-left: 60px;">
        <div class="row py-2">
            <div class="col d-flex justify-content-start">
                <h3>Состояния ответов</h3>
            </div>
        </div>
        <div class="row py-2">
            <div class="col d-flex justify-content-start">
                <h5>[${questionnaireTitle}]</h5>
            </div>
        </div>
    </div>
</div>
<div class="row py-2 d-flex justify-content-around px-4" id="stateChartContainerId" style="padding-left: 60px !important;">
</div>

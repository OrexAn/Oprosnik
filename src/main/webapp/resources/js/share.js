$(window).on('load',function(){
    $('#myTrigger').click(function (){
        $('#myModal').modal('show');
    });
});
$(document).ready(function(){
    var questionnaireId = $("[name='questionnaireId']").first().val();
    $('#generatedLinkFieldId').val(window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/questionnaire/" + questionnaireId);
});

function goToEditor(){
    var questionnaireId = $("[name='questionnaireId']").first().val();
    window.location.replace("questionnaire/builder/" + questionnaireId);
}

function toSharePage(){
    var questionnaireId = $("[name='questionnaireId']").first().val();
    window.location.replace("questionnaire/share/" + questionnaireId);
}

function toResultsPage(){
    var questionnaireId = $("[name='questionnaireId']").first().val();
    window.location.replace("/questionnaire/" + "results/" + questionnaireId);
}

function toPreferencesPage(){
    var questionnaireId = $("[name='questionnaireId']").first().val();
    window.location.replace("/questionnaire/preferences/" + questionnaireId);
}

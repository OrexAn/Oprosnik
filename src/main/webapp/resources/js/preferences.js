$(document).ready(function(){
    checkQuestionnaire();
});

function goToEditor(){
    var questionnaireId = $("[name='questionnaireId']").first().val();
    window.location.href = "/" + "questionnaire/builder/" + questionnaireId;
}

function toSharePage(){
    var questionnaireId = $("[name='questionnaireId']").first().val();
    window.location.href = "/" + "questionnaire/share/" + questionnaireId;
}

function toResultsPage(){
    var questionnaireId = $("[name='questionnaireId']").first().val();
    window.location.href = "/" + "questionnaire/" + "results/" + questionnaireId;
}

function toPreferencesPage(){
    var questionnaireId = $("[name='questionnaireId']").first().val();
    window.location.href = "/" + "questionnaire/preferences/" + questionnaireId;
}

function checkQuestionnaire(){
    var questionnaireId = $("[name='questionnaireId']").first().val();
    $.get("/questionnaire/load/" + questionnaireId, function(data, status){
        if(data.errorMessage){
            console.log(data.errorMessage);
        }else{
            if(data.status === "published"){
                $('#updateButtonId').parent().removeClass('d-none');
                $('#publishButtonId').parent().addClass('d-none');

                $('#sharePageBtnId').removeAttr("disabled");
                $('#resultsPageBtnId').removeAttr("disabled");
            }
        }
    });
}
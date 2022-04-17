$(document).ready(function(){
	initHome();
});

function initHome(){
	var isAuth = document.getElementById('auth').value;
	if(isAuth === 'true'){
		document.getElementById('hello-id').style.display = "block";
	}
}

function createQuestionnaire(){
	var newQuestionnaireName = $("[name='newQuestionnaireName']").val();
	var questionnaire = {
		"title" : newQuestionnaireName,
		"creatorID" : 1,
		"questionnaireType" : "QUESTION",
		"status" : "CREATED"
	};
	$.ajax({
		type: "POST",
		url: "/questionnaire/new",
		data: JSON.stringify(questionnaire),
		success: createCallback,
		contentType: "application/json"
	});
}

function createCallback(parameters){
	window.location.replace("/questionnaire/" + "builder/" + parameters.newQuestionnaireId);
}
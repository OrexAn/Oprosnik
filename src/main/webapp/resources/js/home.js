var titlesAndIds = [];
var modalGridOptions;
var staticGridOptions;
$(document).ready(function(){
	initHome();
});

function initHome(){
	var isAuth = document.getElementById('auth').value;
	if(isAuth === 'true'){
		$('#quickAccessButtonsContainerId').removeClass('d-none');
		getUserQuestionnaires();
	}
	setStaticHomeTable();
}
function createQuestionnaire(){
	var newQuestionnaireName = $("[name='newQuestionnaireName']").val();
	var userName = $("#user_name").val();
	var userId = $("#user_id").val();
	var questionnaire = {
		"creatorName": userName,
		"title" : newQuestionnaireName,
		"creatorID" : userId,
		"questionnaireType" : "QUESTION",
		"status" : "CREATED"
	};
	$.ajax({
		type: "POST",
		url: "/questionnaire/new/question",
		data: JSON.stringify(questionnaire),
		success: createCallback,
		contentType: "application/json"
	});
}

function createCallback(parameters){
	window.location.href = "/" + "questionnaire/" + "builder/" + parameters.newQuestionnaireId;
}

function getUserQuestionnaires(){
	var username = $("#user_name").val();
	$.get("/questionnaire/links/" + username, function(data, status){
		titlesAndIds = data;
		if(data && data.length > 0){
			setLastEdit();
		}
	});
}

function setLastEdit(){
	switch(titlesAndIds.length) {
		case 1:
			$('#firstQuestionnaireTriggerContainerId').removeClass('d-none');
			var titlesAndId = titlesAndIds[titlesAndIds.length-1];
			$('#firstQuestionnaireTriggerContainerId').find('small').text(titlesAndId[0])
			$('#firstQuestionnaireTriggerId').attr('qLink', "/questionnaire/builder/" + titlesAndId[1]);

			break;
		case 2:
			$('#firstQuestionnaireTriggerContainerId').removeClass('d-none');
			$('#secondQuestionnaireTriggerContainerId').removeClass('d-none');
			var titlesAndId = titlesAndIds[titlesAndIds.length-1];
			$('#firstQuestionnaireTriggerContainerId').find('small').text(titlesAndId[0])
			$('#firstQuestionnaireTriggerId').attr('qLink', "/questionnaire/builder/" + titlesAndId[1]);

			titlesAndId = titlesAndIds[titlesAndIds.length-2];
			$('#secondQuestionnaireTriggerContainerId').find('small').text(titlesAndId[0])
			$('#secondQuestionnaireTriggerId').attr('qLink', "/questionnaire/builder/" + titlesAndId[1]);
			break;
		case 3:
			$('#firstQuestionnaireTriggerContainerId').removeClass('d-none');
			$('#secondQuestionnaireTriggerContainerId').removeClass('d-none');
			$('#thirdQuestionnaireTriggerContainerId').removeClass('d-none');

			var titlesAndId = titlesAndIds[titlesAndIds.length-1];
			$('#firstQuestionnaireTriggerContainerId').find('small').text(titlesAndId[0])
			$('#firstQuestionnaireTriggerId').attr('qLink', "/questionnaire/builder/" + titlesAndId[1]);

			titlesAndId = titlesAndIds[titlesAndIds.length-2];
			$('#secondQuestionnaireTriggerContainerId').find('small').text(titlesAndId[0])
			$('#secondQuestionnaireTriggerId').attr('qLink', "/questionnaire/builder/" + titlesAndId[1]);

			titlesAndId = titlesAndIds[titlesAndIds.length-3];
			$('#thirdQuestionnaireTriggerContainerId').find('small').text(titlesAndId[0])
			$('#thirdQuestionnaireTriggerId').attr('qLink', "/questionnaire/builder/" + titlesAndId[1]);
			break;
		default:
		// code block
	}
	if(titlesAndIds.length > 3){
		$('#firstQuestionnaireTriggerContainerId').removeClass('d-none');
		$('#secondQuestionnaireTriggerContainerId').removeClass('d-none');
		$('#thirdQuestionnaireTriggerContainerId').removeClass('d-none');
		$('#moreQuestionnairesTriggerContainerId').removeClass('d-none');

		var titlesAndId = titlesAndIds[titlesAndIds.length-1];
		$('#firstQuestionnaireTriggerContainerId').find('small').text(titlesAndId[0])
		$('#firstQuestionnaireTriggerId').attr('qLink', "/questionnaire/builder/" + titlesAndId[1]);

		titlesAndId = titlesAndIds[titlesAndIds.length-2];
		$('#secondQuestionnaireTriggerContainerId').find('small').text(titlesAndId[0])
		$('#secondQuestionnaireTriggerId').attr('qLink', "/questionnaire/builder/" + titlesAndId[1]);

		titlesAndId = titlesAndIds[titlesAndIds.length-3];
		$('#thirdQuestionnaireTriggerContainerId').find('small').text(titlesAndId[0])
		$('#thirdQuestionnaireTriggerId').attr('qLink', "/questionnaire/builder/" + titlesAndId[1]);


		setModalTableData();
	}
}

function toQuestionnaire(element){
	var qLink = $(element).attr("qLink");
	window.location.href = qLink;
}
function toQuestionnaireFromGrid(qLink){
	window.location.href = qLink;
}

function setModalTableData(){
	const columnDefs = [
		{ field: "id", width: 60, sortable: true, resizable: true, suppressSizeToFit: true },
		{ field: "name", width: 387, sortable: true, resizable: true, cellStyle: { 'text-align': 'left' } }
	];

	// specify the data
	const rowData = [];

	for (var i=0; i < titlesAndIds.length; i++ ){
		var data = { name: titlesAndIds[i][0], id: titlesAndIds[i][1] };
		rowData.push(data);
	}


	// let the grid know which columns and what data to use
	modalGridOptions = {
		columnDefs: columnDefs,
		rowData: rowData,
		onRowClicked: rowClicked
	};

	const gridDiv = document.querySelector('#questionnaireListTableId');
	new agGrid.Grid(gridDiv, modalGridOptions);
}

function fitGridCols() {
	modalGridOptions.api.sizeColumnsToFit();
}

function setStaticHomeTable(){
	const columnDefs = [
		{ field: "Название", width: 588, sortable: true, resizable: true, cellStyle: { 'text-align': 'left' }, suppressSizeToFit: true },
		{ field: "Ответило", width: 400, sortable: true, resizable: true, cellStyle: { 'text-align': 'left' } },
		{ field: "Вопросов", width: 400, sortable: true, resizable: true, cellStyle: { 'text-align': 'left' } }
	];

	// specify the data
	const rowData = [
		{"Название" : "О социалках", "Ответило" : "755", "Вопросов" : "10"},
		{"Название" : "О макулатуре", "Ответило" : "755", "Вопросов" : "10"},
		{"Название" : "Как же обходиться без этих нужных вещей", "Ответило" : "1020", "Вопросов" : "10"}
	];

	// let the grid know which columns and what data to use
	staticGridOptions = {
		columnDefs: columnDefs,
		rowData: rowData,
		onGridReady: fitStaticHomeGridCols
	};

	const gridDiv = document.querySelector('#staticHomeTableId');
	new agGrid.Grid(gridDiv, staticGridOptions);
}

function fitStaticHomeGridCols() {
	staticGridOptions.api.sizeColumnsToFit();
}


function rowClicked(parameters){

	var data = parameters.data;
	var qLink = "/questionnaire/builder/" + data.id;
	toQuestionnaireFromGrid(qLink);
}
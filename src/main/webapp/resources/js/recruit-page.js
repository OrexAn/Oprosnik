$(document).ready(function(){
	innerInitRecruitPage();
});

var targetDocId = -1;

function innerInitRecruitPage(){
	$('#close-active-project-info-id').click(function(){
		$('#active-project-info-container-id').hide();
	});
	$('#close-history-project-info-id').click(function(){
		$('#history-project-info-container-id').hide();
	});
}

$(document).click(function(event) {
	var target = $(event.target);
	if(target.text() === "Info" && target.attr('name') === 'active-project-info'){
		var descriptionText = $('#description-' + target.val()).val();
		$('#description-info-id').html(descriptionText);
		$('#active-project-info-container-id').show();
	}
	if(target.text() === "Fill report" && target.attr('name') === 'report-form-name'){
		targetDocId = $('#report-doc-id-id-' + target.val()).val();
		$('#active-project-report-form-container-id').show();
	}
	if(target.text() === "Remove" && target.attr('name') === 'remove-project-name'){
		targetDocId = $('#report-doc-id-id-' + target.val()).val();
		removeProject();
	}
	if(target.text() === "Info" && target.attr('name') === 'history-project-info'){
		var descriptionText = $('#description-history-' + target.val()).val();
		$('#description-history-info-id').html(descriptionText);
		$('#history-project-info-container-id').show();
	}
});

function submitReport(){
	var descriptionNickElements = document.getElementsByName('description-report-nick');
	var descriptionLinksElements = document.getElementsByName('description-report-link');
	var descriptionTimeElements = document.getElementsByName('description-report-time');
	var fullDescription = "";
	for(var i = 0; i < descriptionNickElements.length; i++){
		fullDescription += descriptionLinksElements[i].value + "|" + " Nick name: " + descriptionNickElements[i].value + "; " + descriptionTimeElements[i].value;
		if(i < descriptionNickElements.length - 1){
			fullDescription += "\n";
		}
	}
	var currentdate = new Date();
	var datetime = currentdate.getUTCFullYear() + "-"
		+ ("0" + (currentdate.getUTCMonth()+1)).slice(-2)  + "-"
		+ ("0" + currentdate.getUTCDate()).slice(-2) + "T"
		+ ("0" + currentdate.getUTCHours()).slice(-2) + ":"
		+ ("0" + currentdate.getUTCMinutes()).slice(-2) + ":"
		+ ("0" + currentdate.getUTCSeconds()).slice(-2);
	var username = $("#user-name-report-id").val();
	var userId = $("#user-id-report-id").val();
	var status = $("#status-report-id").val();
	var docType = $("#doc-type-report-id").val();
	var data = {
		"date": datetime,
		"username": username,
		"userID": userId,
		"status": status,
		"docType": docType,
		"description": fullDescription,
		"targetDocId" : targetDocId
	};
	$.ajax({
		type: "POST",
		url: "/mp/doc",
		data: JSON.stringify(data),
		success: function() {
			$("#active-project-report-form-container-id").hide();
			location.reload();
		},
		contentType: "application/json"
	});
}

function removeProject(){
	var currentdate = new Date();
	var datetime = currentdate.getUTCFullYear() + "-"
		+ ("0" + (currentdate.getUTCMonth()+1)).slice(-2)  + "-"
		+ ("0" + currentdate.getUTCDate()).slice(-2) + "T"
		+ ("0" + currentdate.getUTCHours()).slice(-2) + ":"
		+ ("0" + currentdate.getUTCMinutes()).slice(-2) + ":"
		+ ("0" + currentdate.getUTCSeconds()).slice(-2);
	var data = {
		"date": datetime,
		"targetDocId" : targetDocId
	};
	$.ajax({
		type: "PUT",
		url: "/mp/doc/remove/" + targetDocId,
		data: JSON.stringify(data),
		success: function() {
			location.reload();
		},
		contentType: "application/json"
	});
}
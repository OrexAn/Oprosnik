$(document).ready(function(){

});

var assignReceiver;

$(document).click(function(event) {
	var target = $(event.target);
	if(target.text() === "Assign a project"){
		showAssignResponseForm(target.val());
	}
});

function showAssignResponseForm(receiverUsername){
	$("#assign-response-form-container-id").show();
	assignReceiver = receiverUsername;
}

function submitAssignResponse(){
	var descriptionTextElement = document.getElementsByName('assign-description-text');
	var descriptionLinksElements = document.getElementsByName('assign-description-link');
	var descriptionCostElements = document.getElementsByName('assign-description-cost');
	var fullDescription = "";
	for(var i = 0; i < descriptionTextElement.length; i++){
		fullDescription += descriptionLinksElements[i].value + "|" + " Cost: " + descriptionCostElements[i].value + "; " + descriptionTextElement[i].value;
		if(i < descriptionTextElement.length - 1){
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
	var username = $("#user-name-assign-response-id").val();
	var userId = $("#user-id-assign-response-id").val();
	var status = $("#status-assign-response-id").val();
	var docType = $("#doc-type-assign-response-id").val();
	var data = {
		"date": datetime,
		"username": username,
		"userID": userId,
		"status": status,
		"docType": docType,
		"receiver": assignReceiver,
		"description": fullDescription
	};
	$.ajax({
		type: "POST",
		url: "/mp/doc",
		data: JSON.stringify(data),
		success: function() {
			$("#assign-response-form-container-id").hide();
			location.reload();
		},
		contentType: "application/json"
	});
}
$(document).ready(function(){
	initPoolRequests();
});
var receiver;
function initPoolRequests() {

}
$(document).click(function(event) {
	var target = $(event.target);
	if(target.text() === "Info" && target.attr('name') === 'request-info'){
		console.log("asdasdasd", event.target.id);
		showResponseForm(event.target.id);
	}
});

function showResponseForm(receiverUsername){
	$("#response-form-container-id").show();
	receiver = receiverUsername;
}

function submitResponse(){
	var descriptionTextElement = document.getElementsByName('description-text');
	var descriptionLinksElements = document.getElementsByName('description-link');
	var descriptionCostElements = document.getElementsByName('description-cost');
	var fullDescription = "";
	for(var i = 0; i < descriptionTextElement.length; i++){
		fullDescription += descriptionLinksElements[i].value + "|" + " Cost: " + descriptionCostElements[i].value + "; " + descriptionTextElement[i].value;
		if(i < descriptionTextElement.length - 1){
			fullDescription += '\n'+'<br>';
		}
	}
	var currentdate = new Date();
	var datetime = currentdate.getUTCFullYear() + "-"
		+ ("0" + (currentdate.getUTCMonth()+1)).slice(-2)  + "-"
		+ ("0" + currentdate.getUTCDate()).slice(-2) + "T"
		+ ("0" + currentdate.getUTCHours()).slice(-2) + ":"
		+ ("0" + currentdate.getUTCMinutes()).slice(-2) + ":"
		+ ("0" + currentdate.getUTCSeconds()).slice(-2);
	var username = $("#user-name-response-id").val();
	var userId = $("#user-id-response-id").val();
	var status = $("#status-response-id").val();
	var docType = $("#doc-type-response-id").val();
	var data = {
		"date": datetime,
		"username": username,
		"userID": userId,
		"status": status,
		"docType": docType,
		"receiver": receiver,
		"description": fullDescription
	};
	$.ajax({
		type: "POST",
		url: "/mp/doc",
		data: JSON.stringify(data),
		success: function() {
			$("#response-form-container-id").hide();
			location.reload();
		},
		contentType: "application/json"
	});
}
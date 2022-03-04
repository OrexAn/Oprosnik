$(document).ready(function(){

});
var targetDocId, reportId;
$(document).click(function(event) {
	var target = $(event.target);
	if(target.text() === "View" && target.attr('name') === 'report-view'){
		var descriptionText = $('#description-' + target.val()).val();
		reportId = target.val();
		$('#description-report-view-id').text(descriptionText);
		showReportViewForm(event.target.id);
	}
	if(event.target.id === 'accept-report-view-id'){
		submitDecision('accept');
	}
	if(event.target.id === 'reject-report-view-id'){
		submitDecision('reject');
	}
});

function showReportViewForm(docId){
	targetDocId = docId;
	$("#report-view-form-container-id").show();
}

function submitDecision(decision){
	var id = reportId;
	var status;
	if(decision === 'accept'){
		status = 'DONE';
	}else if(decision === 'reject'){
		status = 'REJECTED';
	}
	var data = {
		"id" : id,
		"status": status,
		"targetDocId" : targetDocId
	};
	$.ajax({
		type: "POST",
		url: "/mp/doc/accept-report",
		data: JSON.stringify(data),
		success: function() {
			$("#report-view-form-container-id").hide();
			location.reload();
		},
		contentType: "application/json"
	});
}
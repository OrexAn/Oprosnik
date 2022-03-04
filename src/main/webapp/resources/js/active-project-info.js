$(document).click(function(event) {
	if(event.target.id === "act-project-info-table-box-background-id"){
		$('#active-project-info-container-id').hide();
	}
	if(event.target.id === "report-table-box-background-id"){
		$('#active-project-report-form-container-id').hide();
	}
});
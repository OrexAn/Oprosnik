$(document).ready(function(){
	initReportForm();
});

function initReportForm() {
	$(".add-row").click(function(){
		var markupDescriptionUnderline = "<td colspan='4'>------------------------------------------------</td>";
		var markupDescriptionLink = "<td colspan='2'>Nick name on site</td><td colspan='2'><input type='text' name='description-report-nick' value=''></td>";
		var markupDescriptionNick = "<td>Link</td><td><input type='text' name='description-report-link' value=''></td><td>Time</td><td><input type='text' name='description-report-time' value=''></td>";

		var rowCount = document.getElementById("report-form-table-id").rows.length;
		var table = document.getElementById("report-form-table-id");

		if(rowCount < 15){
			var row = table.insertRow(rowCount-1);
			row.innerHTML = markupDescriptionUnderline;

			rowCount = document.getElementById("report-form-table-id").rows.length;
			row = table.insertRow(rowCount-1);
			row.innerHTML = markupDescriptionLink;

			rowCount = document.getElementById("report-form-table-id").rows.length;
			row = table.insertRow(rowCount-1);
			row.innerHTML = markupDescriptionNick;

		}
	});

	// Find and remove selected table rows
	$(".delete-row").click(function(){
		var rowCount;
		let table = document.getElementById('report-form-table-id');

		for(var i = 0; i < 3; i++){
			rowCount = $('#report-form-table-id tr').length;
			if(rowCount <= 4){
				alert('last is the only two');
				break;
			}else{
				table.deleteRow(rowCount-2);
			}
		}
	});
}

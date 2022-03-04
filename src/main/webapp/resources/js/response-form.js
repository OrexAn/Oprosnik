$(document).ready(function(){
	initResponseForm();
});

$(document).click(function(event) {
	if(event.target.id === "response-table-box-background-id"){
		$('#response-form-container-id').hide();
	}
});

function initResponseForm() {
	$(".add-row").click(function(){
		var markupDescriptionUnderline = "<td colspan='4'>------------------------------------------------</td>";
		var markupDescriptionText = "<td colspan='4'><input type='text' name='description-text' placeholder='Write here description of response' value=''></td>";
		var markupDescriptionLink = "<td>Link</td><td><input type='text' name='description-link' value=''></td><td>Cost</td><td><input type='text' name='description-cost' value=''></td>";

		var rowCount = document.getElementById("response-form-table-id").rows.length;
		var table = document.getElementById("response-form-table-id");

		if(rowCount < 15){
			var row = table.insertRow(rowCount-1);
			row.innerHTML = markupDescriptionUnderline;

			rowCount = document.getElementById("response-form-table-id").rows.length;
			row = table.insertRow(rowCount-1);
			row.innerHTML = markupDescriptionText;

			rowCount = document.getElementById("response-form-table-id").rows.length;
			row = table.insertRow(rowCount-1);
			row.innerHTML = markupDescriptionLink;

		}
	});

	// Find and remove selected table rows
	$(".delete-row").click(function(){
		var rowCount;
		let table = document.getElementById('response-form-table-id');

		for(var i = 0; i < 3; i++){
			rowCount = $('#response-form-table-id tr').length;
			if(rowCount <= 3){
				alert('last is the only two');
				break;
			}else{
				table.deleteRow(rowCount-2);
			}
		}
	});
}

$(document).ready(function(){
	initPreference();
});

function initPreference() {
	$("#selectImageButton").click(function(){
		document.getElementById("selectImage-id").style.display = "block";
	});
}

$(document).click(function(event) {
	if(event.target.id === "img-tbl-box-background-id"){
		$('#selectImage-id').hide();
	}
});

function selectAvatar(avatarName){
	$("#avatar-preview-id").attr("src", $("#contextPath").val() + "/resources/img/" + avatarName + ".png");
	var user_id = localStorage.getItem("user_id");
	var URL = "/mp/person/" + user_id;

	var dataObject = { 'avatar': avatarName };

	$.ajax({
		url: URL,
		type: 'PUT',
		data: JSON.stringify(dataObject),
		contentType: "application/json",
		success: function(result) {
			document.getElementById("selectImage-id").style.display = "none";
			location.reload();
		}
	});
}
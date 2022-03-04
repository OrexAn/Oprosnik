$(document).ready(function(){
	initProfile();
});

function initProfile(){
	var authority = $("#user-authority-id").val();
	if(authority === "RECRUIT"){
		$("#recruit-page-id").show();
		checkRequest();
		initRecruitPage();
	}else if(authority === "MANAGER" || authority === "ADMIN"){
		$("#manager-page-id").show();
	}
}

function requestProject(){
	var currentdate = new Date();
	var datetime = currentdate.getUTCFullYear() + "-"
		+ ("0" + (currentdate.getUTCMonth()+1)).slice(-2)  + "-"
		+ ("0" + currentdate.getUTCDate()).slice(-2) + "T"
		+ ("0" + currentdate.getUTCHours()).slice(-2) + ":"
		+ ("0" + currentdate.getUTCMinutes()).slice(-2) + ":"
		+ ("0" + currentdate.getUTCSeconds()).slice(-2);
	var username = $("#user-name-request-id").val();
	var userId = $("#user-id-request-id").val();
	var status = $("#status-request-id").val();
	var docType = $("#doc-type-request-id").val();
	var data = {
		"date": datetime,
		"username": username,
		"userID": userId,
		"status": status,
		"docType": docType
	};
	$.ajax({
		type: "POST",
		url: "/mp/doc",
		data: JSON.stringify(data),
		success: function() {
			$("#request-button-id").prop('disabled', true);
		},
		contentType: "application/json"
	});
}

function checkRequest(){
	var username = $("#user-name-request-id").val();
	$.get("/mp/doc/request/" + username, function(data, status){
		if(data.id !== -1){
			$("#request-button-id").prop('disabled', true);
		}
	});
}

function initRecruitPage(){
	$("#to-active-projects").click(function() {
		document.getElementById("active-projects-id").style.display = "block";
		document.getElementById("project-history-id").style.display = "none";
		document.getElementById("recruit-preferences-id").style.display = "none";
		document.getElementById("tech-supp-id").style.display = "none";
	});
	$("#to-projects-history").click(function() {
		$.get("/mp/doc/projectsHistory/" + $('#user-name-request-id').val(), function(data, status){
			var projectsHistoryContainer = document.getElementById('projects-history-container-id');
			projectsHistoryContainer.innerHTML = '';
			for(var i = 0; i < length(data.documents); i++){
				var outerDiv = document.createElement('div');
				outerDiv.className = 'btn-toolbar justify-content-between mb-3';
				outerDiv.style.width = '100%';
				outerDiv.style.backgroundColor = '#ffb7b7';
				projectsHistoryContainer.appendChild(outerDiv);

				var innerDiv = document.createElement('div');
				innerDiv.className = 'btn-group mr-2';
				outerDiv.appendChild(innerDiv);

				var button1 = document.createElement("button");
				button1.type = 'button';
				button1.innerText = "ID: " + data.documents[i].id + ", Manager: " + data.documents[i].username + ", Status: " + data.documents[i].status;
				button1.className = 'btn btn-sm btn-outline-secondary';
				innerDiv.appendChild(button1);

				var button2 = document.createElement('button');
				button2.type = 'button';
				button2.innerText = 'Info';
				button2.className = 'btn btn-sm btn-outline-secondary';
				button2.id = data.documents[i].id + '-history';
				button2.name = 'history-project-info';
				button2.value = data.documents[i].id;
				innerDiv.appendChild(button2);

				var hiddenDescription = document.createElement('input');
				hiddenDescription.type = 'hidden';
				hiddenDescription.id = 'description-history-' + data.documents[i].id;
				hiddenDescription.value = data.documents[i].description;
				innerDiv.appendChild(hiddenDescription);
			}
		});
		document.getElementById("active-projects-id").style.display = "none";
		document.getElementById("project-history-id").style.display = "block";
		document.getElementById("recruit-preferences-id").style.display = "none";
		document.getElementById("tech-supp-id").style.display = "none";
	});
	$("#to-recruit-preferences-id").click(function() {
		document.getElementById("active-projects-id").style.display = "none";
		document.getElementById("project-history-id").style.display = "none";
		document.getElementById("recruit-preferences-id").style.display = "block";
		document.getElementById("tech-supp-id").style.display = "none";
	});
	$("#to-technical-support-id").click(function() {
		document.getElementById("active-projects-id").style.display = "none";
		document.getElementById("project-history-id").style.display = "none";
		document.getElementById("recruit-preferences-id").style.display = "none";
		document.getElementById("tech-supp-id").style.display = "block";
	});
}

function length(obj) {
	return Object.keys(obj).length;
}
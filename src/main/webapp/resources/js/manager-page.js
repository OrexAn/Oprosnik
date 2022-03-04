$(document).ready(function(){
	initManagerPage();
});

function initManagerPage(){
	//manager page
	$("#to-pool-requests-id").click(function() {
		document.getElementById("pool-of-requests-id").style.display = "block";
		document.getElementById("pool-of-recruits-id").style.display = "none";
		document.getElementById("pool-of-reports-id").style.display = "none";
		document.getElementById("manager-preferences-id").style.display = "none";
	});
	$("#to-pool-recruits-id").click(function() {
		$.get("/mp/person/recruits", function(data, status){
			var recruitsContainer = document.getElementById('recruits-container-id');
			recruitsContainer.innerHTML = '';
			for(var i = 0; i < length(data.persons); i++){
				var outerDiv = document.createElement('div');
				outerDiv.className = 'btn-toolbar justify-content-between mb-3';
				outerDiv.style.width = '100%';
				outerDiv.style.backgroundColor = '#a1ffe6';
				recruitsContainer.appendChild(outerDiv);

				var innerDiv = document.createElement('div');
				innerDiv.className = 'btn-group mr-2';
				outerDiv.appendChild(innerDiv);

				var button1 = document.createElement("button");
				button1.type = 'button';
				button1.innerText = "ID: " + data.persons[i].id + ", Name: " + data.persons[i].name + ", UserName: " + data.persons[i].username;
				button1.className = 'btn btn-sm btn-outline-secondary';
				innerDiv.appendChild(button1);

				/*var button2 = document.createElement('button');
				button2.type = 'button';
				button2.innerText = 'Info';
				button2.className = 'btn btn-sm btn-outline-secondary';
				button2.id = data.persons[i].username + '-recruit';
				innerDiv.appendChild(button2);*/

				var button3 = document.createElement('button');
				button3.type = 'button';
				button3.innerText = 'Assign a project';
				button3.className = 'btn btn-sm btn-outline-success';
				button3.id = data.persons[i].username + '-assign-project';
				button3.value = data.persons[i].username;
				outerDiv.appendChild(button3);
			}
		});
		document.getElementById("pool-of-requests-id").style.display = "none";
		document.getElementById("pool-of-recruits-id").style.display = "block";
		document.getElementById("pool-of-reports-id").style.display = "none";
		document.getElementById("manager-preferences-id").style.display = "none";
	});
	$("#to-pool-reports-id").click(function() {
		$.get("/mp/doc/reports", function(data, status){
			var reportsContainer = document.getElementById('reports-container-id');
			reportsContainer.innerHTML = '';
			for(var i = 0; i < length(data.documents); i++){
				var outerDiv = document.createElement('div');
				outerDiv.className = 'btn-toolbar justify-content-between mb-3';
				outerDiv.style.width = '100%';
				outerDiv.style.backgroundColor = '#a1ffe6';
				reportsContainer.appendChild(outerDiv);

				var innerDiv = document.createElement('div');
				innerDiv.className = 'btn-group mr-2';
				outerDiv.appendChild(innerDiv);

				var button1 = document.createElement("button");
				button1.type = 'button';
				button1.innerText = "ID: " + data.documents[i].id + ", User name: " + data.documents[i].username + ", Status: " + data.documents[i].status;
				button1.className = 'btn btn-sm btn-outline-secondary';
				innerDiv.appendChild(button1);

				var button2 = document.createElement('button');
				button2.type = 'button';
				button2.innerText = 'View';
				button2.name = 'report-view';
				button2.className = 'btn btn-sm btn-outline-secondary';
				button2.id = data.documents[i].targetDocId; //response id
				button2.value = data.documents[i].id; //report id
				innerDiv.appendChild(button2);

				var hiddenInput = document.createElement('input');
				hiddenInput.type = 'hidden';
				hiddenInput.id = 'description-' + button2.value;
				hiddenInput.value = data.documents[i].description;
				innerDiv.appendChild(hiddenInput);
			}
		});
		document.getElementById("pool-of-requests-id").style.display = "none";
		document.getElementById("pool-of-recruits-id").style.display = "none";
		document.getElementById("pool-of-reports-id").style.display = "block";
		document.getElementById("manager-preferences-id").style.display = "none";
	});
	$("#to-manager-preferences-id").click(function() {
		document.getElementById("pool-of-requests-id").style.display = "none";
		document.getElementById("pool-of-recruits-id").style.display = "none";
		document.getElementById("pool-of-reports-id").style.display = "none";
		document.getElementById("manager-preferences-id").style.display = "block";
	});
}

function length(obj) {
	return Object.keys(obj).length;
}
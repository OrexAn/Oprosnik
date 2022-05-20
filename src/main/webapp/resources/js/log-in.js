$(document).ready(function(){
	initLog(); //Нельзя чтобы названия методов js файлов пересекались на одной странице!
	//Т.к. вызовется версия только первого подключённого js файла
});

function initLog(){


	if(window.location.pathname === '/login'){
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		var type = performance.getEntries()[0].redirectCount;
		console.log(type);

		if(type > 0 && urlParams.has('error')){
			$('#inputUserName').addClass('is-invalid');
			$('#inputPassword').addClass('is-invalid');
		}else{
			window.history.replaceState({}, document.title, "/" + "login");
			urlParams.delete('error');
		}
	}

	/*document.getElementById("inputUserName").style.display = "block";
	document.getElementById("inputPassword").style.display = "block";*/
	console.log("bbbbbbbbbbbb");
}

function loginUser(){
	const myTimeout = setTimeout(myGreeting, 1000);
	$.ajax({
		type: "POST",
		url: "/submit_login",
		data: $('#loginForm').serialize(),
		cache: false,
		success: function(data){
			alert(data);
		},
		error: function (data) {
			console.error("Login failure");
		},
		dataType: "json"
	});
}

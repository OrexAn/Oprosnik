$(document).ready(function(){
	initLog(); //Нельзя чтобы названия методов js файлов пересекались на одной странице!
	//Т.к. вызовется версия только первого подключённого js файла
});

function initLog(){
	/*document.getElementById("inputUserName").style.display = "block";
	document.getElementById("inputPassword").style.display = "block";*/
	console.log("bbbbbbbbbbbb");
}

function loginUser(){
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

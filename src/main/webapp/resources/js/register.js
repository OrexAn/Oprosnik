$(document).ready(function(){
	initRegister(); //Нельзя чтобы названия методов js файлов пересекались на одной странице!
	//Т.к. вызовется версия только первого подключённого js файла
});

function initRegister(){

}

function registerPerson(){
	var name = $("#name-id").val();
	var email = $("#email-id").val();
	var number = $("#number-id").val();
	var username = $("#username-id").val();
	var password = $("#password-id").val();
	var data = {
		"name": name,
		"email": email,
		"number": number,
		"userName": username,
		"password": password
	};
	$.ajax({
		type: "POST",
		url: "person/submit_register",
		data: JSON.stringify(data),
		success: function(){
			window.location.replace("http://localhost:8080/registered");
		},
		contentType : "application/json"
	});
}

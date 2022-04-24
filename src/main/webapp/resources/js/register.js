$(document).ready(function(){
	initRegister(); //Нельзя чтобы названия методов js файлов пересекались на одной странице!
	//Т.к. вызовется версия только первого подключённого js файла
});

function initRegister(){

}

function registerUser(){
	var email = $("#emailId").val();
	var username = $("#userNameId").val();
	var password = $("#passwordId").val();
	var data = {
		"email": email,
		"userName": username,
		"password": password
	};
	$.ajax({
		type: "POST",
		url: "user/submit_register",
		data: JSON.stringify(data),
		success: function(data){
			if(!data.errorMessage){
				window.location.href = "/" + "registered";
			}else{
				alert(data.errorMessage);
			}
		},
		contentType : "application/json"
	});
}

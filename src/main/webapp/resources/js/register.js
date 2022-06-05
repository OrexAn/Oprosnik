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
	document.getElementById('emailId').reportValidity();
	document.getElementById('userNameId').reportValidity();
	document.getElementById('passwordId').reportValidity();
	if(email.includes('@') && email !== '' && username !== '' && password !== ''){
		$.ajax({
			type: "POST",
			url: "user/submit_register",
			data: JSON.stringify(data),
			cache: false,
			success: function(data){
				if(!data.errorMessage){
					window.location.href = "/" + "registered";
				}else{
					failRegister(data.errorMessage);
				}
			},
			contentType : "application/json"
		});
	}
}

function failRegister(text){
	if(text){
		$('#errorAlertSpanId').text(text);
		$('#errorAlertModal').modal('show');
	}else{
		$('#errorAlertSpanId').text("Не удалось.");
		$('#errorAlertModal').modal('show');
	}
}

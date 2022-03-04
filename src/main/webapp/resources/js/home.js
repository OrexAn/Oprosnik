$(document).ready(function(){
	initHome();
});

function initHome(){
	var isAuth = document.getElementById('auth').value;
	if(isAuth === 'true'){
		document.getElementById('hello-id').style.display = "block";
	}
}

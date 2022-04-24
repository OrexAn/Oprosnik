$(document).ready(function(){
	initHead();
});
var user_id;
function initHead(){
	var sOutBtn = document.getElementById("sign-out");
	var sInBtn = document.getElementById("loginTrigger");
	var isAuth = document.getElementById("auth");
	var prof = document.getElementById("profile-link");
	user_id = localStorage.getItem("user_id");


	if(isAuth.value === "true"){
		sInBtn.style.display = "none";
		sOutBtn.style.display = "block";

		//Store login parameters
		user_id = document.getElementById("user_id").value;
		localStorage.setItem("user_id", user_id);
	}else{
		sInBtn.style.display = "block";
		sOutBtn.style.display = "none";
	}

	$("#loginTrigger").click(function() {
		var logForm = document.getElementById("login-container");
		if(logForm !== null){
			logForm.style.display = "block";
			$("#page-url").val(window.location.pathname);
		}else{
			window.location.href = "/" + "login";
		}
	});

	$("#sign-out").click(function(){
		$.post("submit_logout",function(){
			location.reload()
		});
	});

	reloadNav(isAuth);
}

function reloadNav(isAuth){

	$("#contacts").hide();
	$("#partner").hide();
	$("#support").hide();
	$("#profile-link").hide();

	if(isAuth.value === "true"){
		/*$("#profile-link").show();*/
	}
	$("#support").show();
	$("#partner").show();
	$("#contacts").show();
}

function goToHomePage(){
	window.location.href = "/" + "home";
}
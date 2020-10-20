let passedCalculus = null;

let passedCalculus_field = document.getElementById('passedCalculus');
if(passedCalculus){
	passedCalculus_field.textContent = "JA!";
} else if(passedCalculus == null){
	passedCalculus_field.textContent = "MAYBE";
} else {
	passedCalculus_field.textContent = "NEE";
}
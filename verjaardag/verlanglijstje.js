function over(event){
	const iterables = document.getElementsByClassName(event.target.className);
	for (let i = 0; i < iterables.length; i++) {
		iterables[i].style.animation = 'glow-same 1s ease-in-out infinite alternate';
	}
}
function leave(event){
	const iterables = document.getElementsByClassName(event.target.className);
	for (let i = 0; i < iterables.length; i++) {
		iterables[i].style.animation = '';
	}
}

let lightsOn = false;

function lights(event) {
	const switchElement = document.getElementById("switch");
	
	if (lightsOn) {
		switchElement.style.transform = "rotate(0deg)";
		
		document.documentElement.style.background = "linear-gradient(90deg, rgba(2,57,164,1) 0%, rgba(0,212,255,1) 100%)";
		document.documentElement.style.color = "#000";
		document.documentElement.style.text_shadow = "0 0 2px #405eb1";
		
	} else {
		switchElement.style.transform = "rotate(180deg)";
		
		document.documentElement.style.background = "white";
		document.documentElement.style.color = "#e7e7e7";
		document.documentElement.style.text_shadow = "0 0 2px yellow";
	}
	
	lightsOn = !lightsOn;
}

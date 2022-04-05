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
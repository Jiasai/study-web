// slider.js 键盘控制
const keyboard={
	bindEvent(slider){
		document.addEventListener('keyup', ev => {
		  // console.log(ev.keyCode);
		  if (ev.keyCode === 37) {
		    // ←
		    slider.prev();
		  } else if (ev.keyCode === 39) {
		    // →
		    slider.next();
		  }
		});
	}

}
export {keyboard};

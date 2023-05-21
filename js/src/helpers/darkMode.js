var dark = 0;
	const root = document.documentElement;
	function toggle(){
		if(dark==0){
			dark = 1;
			
			root.style.setProperty('--border', '1px solid rgba(255, 255, 255, 0.7');
			root.style.setProperty('--bgColorOfCards', 'black');
			root.style.setProperty('--bgColorOfBody', 'rgba(0, 0, 0, 0.85)');
			root.style.setProperty('--colorOfBody', 'white');
			root.style.setProperty('--fontSize17Color', 'lightgreen');
			root.style.setProperty('--fontSize20Color', 'yellow');
			root.style.setProperty('--divBackground', 'rgba(255, 255, 255, 0.2');
			root.style.setProperty('--boxShadow', '0px 10px 20px rgba(255, 255, 255, 0.3)');


		}
		else{
			dark = 0;
	
			root.style.setProperty('--border', '1px solid rgba(0, 0, 0, 0.2');
			root.style.setProperty('--bgColorOfCards', 'white');
			root.style.setProperty('--bgColorOfBody', '#f2f2f2');
			root.style.setProperty('--colorOfBody', 'black');
			root.style.setProperty('--fontSize17Color', 'green');
			root.style.setProperty('--fontSize20Color', 'green');
			root.style.setProperty('--divBackground', 'rgba(0, 0, 0, 0.05');
			root.style.setProperty('--boxShadow', '0px 10px 20px rgba(0, 0, 0, 0.3)');

		}
	}
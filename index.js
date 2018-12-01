window.onError = function() {
	Error("Error");
};

playerInput.addEventListener('keydown', function(event) {
    console.log('Pressed Key');
	switch(event.keyCode || event.which) {
		case keys.enter: {
			let text = playerInput.value;
			if(text.length) {
				playerInputHistory.push(text);
				
				/*
				let t = document.createElement('p');
				t.style.fontFamily = 'monospace';
				t.textContent = '# ' + text;
				playerLog.append(t);
				*/
				player.announce('[You: ' + text + ']');
				player.act(text);
				scroll();
				playerInput.value = '';
				playerInputHistoryIndex = null;
			}
			break;
		} case keys.up: {
			if(playerInputHistoryIndex === 0) {
				playerInputHistoryIndex = null;
			} else if(playerInputHistoryIndex > 0) {
				playerInputHistoryIndex--;
			} else {
				playerInputHistoryIndex = playerInputHistory.length-1;
			}
			playerInput.value = playerInputHistory[playerInputHistoryIndex] ||  '';
			break;
		} case keys.down: {
			if(playerInputHistoryIndex != null) {
				console.log("b");
				playerInputHistoryIndex++;
				if(playerInputHistoryIndex === playerInputHistory.length) {
					playerInputHistoryIndex = null;
				}
			} else {
				console.log("c");
				playerInputHistoryIndex = 0;
			}
			playerInput.value = playerInputHistory[playerInputHistoryIndex] ||  '';
			break;
		}
	}
});
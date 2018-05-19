const keys = {
	enter:13,
	up:38,
	down:40,
};

const playerInputRender = document.getElementById('playerInputRender');
const playerInput = document.getElementById('playerInput');
const playerInputHistory = [];
let playerInputHistoryIndex = null;
const playerLog = document.getElementById('playerLog');

const markdown = function(text) {
	const converter = new showdown.Converter({
		strikethrough: true,
		tables: true,
		tasklists: true,
		emoji: true,
		underline: true,
	});
	return converter.makeHtml(text);
};
const Hook = function(intercept, done) {
	this.intercept = intercept;
	this.done = done;
};
const Room = function(name, desc) {
	this.name = name;
	this.desc = desc;
	let me = this;
	this.describe = function(player) {
		player.announce(`**${name}**<br/>${desc}`);
	};
	this.update = function() {
		
	};
};
const world = {
	start: new Room('INeedAUniqueUsername Industries Headquarters', 'a'),
};
/*
setInterval(function() {
	player.announce('a');
	scroll();
}, 100);
*/
const player = {
	location: world.start,
	hooks: [],
	act: function(input) {
		let hooks = player.hooks;
		for(let i = 0; i < hooks.length; i++) {
			let hook = hooks[i];
			let intercepted = hook.intercept(input);
			if(hook.done()) {
				hooks.splice(i, 1);
			}
			if(intercepted) {
				return;
			}
		}
		
		input = input.trim().toLowerCase().split();
		let actionType = input.shift();
		input = input.join(' ');
		
		let action = player.actions[actionType];
		if(action) {
			action(input);
		} else {
			player.announce('I don\'t understand what you are trying to do.');
		}
	},
	announce: function(text) {
		let message = document.createElement('p');
		/*
		message.textContent = text;
		playerLog.append(message);
		*/
		let t = document.createElement('template');
		t.innerHTML = markdown(text);
		playerLog.append(t.content.firstChild);
	},
	actions: {
		look: function(input) {
			player.location.describe(player);
		},
		think: function(input) {
			player.announce('You try to think but you end up staring into space.');
		},
		sleep: function(input) {
			let asleep = true;
			player.hooks.push(new Hook((input) => {
				if(input === 'wake') {
					player.announce('You wake up.');
					asleep = false;
				} else {
					player.announce('You are asleep.');
				}
				return true;
			}, () => {
				return !asleep;
			}));
		}
	},
};

const scroll = function() {
	window.scrollTo(0,document.body.scrollHeight);
}
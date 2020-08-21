var skuurt = (function() {
	'use strict';

	var constructor = function (selector) {
		if (!selector) return;
		if (selector === 'document') {
			this.elems = [document];
		} else if (selector === 'window') {
			this.elems = [window]
		} else {
			this.elems = document.querySelectorAll(selector);			
		}

	};

	constructor.prototype.each = function (callback) {
		if (!callback || typeof callback !== 'function') return;
		for (var i = 0; i < this.elems.length; i++) {
			callback(this.elems[i], i);
		}
	};

	constructor.prototype.addClass = function (className) {
		this.each(function (item) {
			item.classList.add(className);
		});
		return this;
	};

	constructor.prototype.removeClass = function (className) {
		this.each(function (item) {
			item.classList.remove(className);
		});
		return this;
	};

	constructor.prototype.addStyle = function (property, value) {
		this.each(function (item) {
			item.style[property] = value;
			console.log(property, value)
		});
		return this;
	};

	constructor.prototype.rotate = function (degrees, speed) {
		this.each(function (item) {
			item.style.transform = `rotate(${degrees})`;
			item.style.transition = `transform ${speed}`;
		});
		return this;
	};

	constructor.prototype.createBtn = function () {
		this.each(function (item) {
			var style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML = `.btn {
				display: inline-block;
				color: white;
				background-color: #5252fd;
				padding: 20px 40px;
				border-radius: 20px;
			}`;
			document.querySelector("head").appendChild(style);
			item.classList.add("btn");
		});
		return this;
	};

	constructor.prototype.click = function (action) {
		this.each(function (item) {
			item.addEventListener('click', action);
		});
		return this;
	};

	constructor.prototype.goFullscreen = function () {
		this.each(function (item) {
			if(item.requestFullscreen) {
			item.requestFullscreen();
			} else if(item.mozRequestFullScreen) {
			item.mozRequestFullScreen();
			} else if(item.webkitRequestFullscreen) {
			item.webkitRequestFullscreen();
			} else if(item.msRequestFullscreen) {
			item.msRequestFullscreen();
			}
		});
		return this;
	}

	var instantiate = function (selector) {
		return new constructor(selector);
	};

	return instantiate;
})();
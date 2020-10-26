/* Typewrite animation on homepage */
var TxtType = function (el, toRotate, period) {
	this.toRotate = toRotate;
	this.el = el;
	this.loopNum = 0;
	this.period = parseInt(period, 10) || 2000;
	this.txt = '';
	this.tick();
	this.isDeleting = false;
};

TxtType.prototype.tick = function () {
	var i = this.loopNum % this.toRotate.length;
	var fullTxt = this.toRotate[i];

	if (this.isDeleting) {
		this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
		this.txt = fullTxt.substring(0, this.txt.length + 1);
	}

	this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

	var that = this;
	var delta = 200 - Math.random() * 100;

	if (this.isDeleting) {
		delta /= 2;
	}

	if (!this.isDeleting && this.txt === fullTxt) {
		delta = this.period;
		this.isDeleting = true;
	} else if (this.isDeleting && this.txt === '') {
		this.isDeleting = false;
		this.loopNum++;
		delta = 500;
	}

	setTimeout(function () {
		that.tick();
	}, delta);
};

window.onload = function () {
	var elements = document.getElementsByClassName('typewrite');
	for (var i = 0; i < elements.length; i++) {
		var toRotate = elements[i].getAttribute('data-type');
		var period = elements[i].getAttribute('data-period');
		if (toRotate) {
			new TxtType(elements[i], JSON.parse(toRotate), period);
		}
	}
	// INJECT CSS
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
	document.body.appendChild(css);
};

const counter = document.querySelector(".number-increment");
const speed = 1000;

window.onscroll = function() {updateCount()};

function updateCount() {
	if (window.pageYOffset > (counter.offsetTop - 800)) {
		const target = +counter.dataset.count;
		
		const count = +counter.innerText;

		const increment = target / speed;

		if (count < target) {
			counter.innerText = count + increment;
			setTimeout(updateCount, 1);
		} else {
			count.innerText = target;
		}		
	}	
}

/*const projectsData = [
{
	titel: "Ecologisch verfbedrijf",
	imgPaths: ["img/verfbedrijf2.jpg", "img/verfbedrijf3.jpg"]
},
{
	titel: "Klusbedrijf",
	imgPaths: []
},
{
	titel: "KingStyle",
	imgPaths: []
}];

const allProjects = document.querySelectorAll(".modalProject");
const modal = document.querySelector(".outer-modal");
const closeModalBtn = document.querySelector(".close");

allProjects.forEach((projectHTML) => {
	projectHTML.addEventListener("click", () => {
		event.stopPropagation();
		let title = projectHTML.dataset.title;
		let projectObj = projectsData.find(obj => obj.titel === title);
		let imgPaths = projectObj.imgPaths;
		let modalHtml = `<span class="close">&times;</span><p>${projectHTML.querySelector("h4").innerText}</p>`;
		imgPaths.forEach((image) => {
			modalHtml += `<img src="${image}" alt="">`;
		});
		console.log(modalHtml)
		modal.style.display = "block";
		modal.querySelector(".modal-content").innerHTML = "";
		modal.querySelector(".modal-content").insertAdjacentHTML("beforeend", modalHtml);
		document.querySelector("body").style.overflow = "hidden";
	})
});

function closeModal() {
	modal.style.display = "none";
	document.querySelector("body").style.overflow = "auto";
};

closeModalBtn.addEventListener("click", closeModal);

window.onclick = () => {
	closeModal();	
}*/
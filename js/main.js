const ui={
	init: function(){
		this.navigation();
		this.parallax();
		this.etc();
	},
	navigation(){
		let header=document.getElementById("header");

		let desktopFlag;

		function checkWindowSize(){
			let winw=window.innerWidth;

			if(winw > 1240){
				desktopFlag=true;
			}
			else{
				desktopFlag = false;
			}

			if(header.classList.contains("menu-open")){
				header.classList.remove("menu-open");
			}
		}

		checkWindowSize();

		window.addEventListener("resize", checkWindowSize);

		let menuTab=document.querySelector(".hd-allmenu-open");
		let dimmed=document.querySelector(".hd-menu .hd-mak");
		let gnb=document.querySelector(".gnb");
		let gnbList=gnb.children;

		menuTab.addEventListener("click", function(){
			header.classList.toggle("menu-open");
		});

		dimmed.addEventListener("click", function(){
			document.getElementById("header").classList.remove("menu-open");
		});

		for(let i=0; i<gnbList.length; i++){
			gnbList[i].addEventListener("click", function(e){
				e.preventDefault();

				if(desktopFlag) return;

				if(e.currentTarget.classList.contains("no-depth")) return;

				if(!e.currentTarget.classList.contains("open")){
					for(let j=0; j<gnbList.length; j++){
						if(j == i){
							gnbList[j].classList.add("open");
						}
						else{
							gnbList[j].classList.remove("open");
						}
					}
				}
				else{
					e.currentTarget.classList.remove("open");
				}
			});
		}
	},
	parallax(){
		if(window.matchMedia("(max-width: 768px)").matches){
			gsap.utils.toArray(".main-typo").forEach(function(mainTypo){
				const tl=gsap.timeline({
					scrollTrigger: {
						trigger: mainTypo,
						scrub: true,
						start: "top bottom"
					}
				});

				tl.to(mainTypo.querySelector("div:nth-child(1)"), {
					x: "-7%",
					duration: 1
				});

				tl.to(mainTypo.querySelector("div:nth-child(2)"), {
					x: "7%",
					duration: 1,
					delay: -1
				});
			});
		}
		else{
			gsap.utils.toArray(".main-typo").forEach(function(mainTypo){
				const tl=gsap.timeline({
					scrollTrigger: {
						trigger: mainTypo,
						scrub: true,
						start: "top bottom"
					}
				});

				tl.to(mainTypo.querySelector("div:nth-child(1)"), {
					x: "-20%",
					duration: 1
				});

				tl.to(mainTypo.querySelector("div:nth-child(2)"), {
					x: "20%",
					duration: 1,
					delay: -1
				});
			});
		}
	},
	etc(){
		let pageTop=document.querySelector("#page-top");
		let btnTop=pageTop.querySelector(".btn-top");

		window.addEventListener("scroll", function(){
			let winH=window.innerHeight;

			if(window.scrollY > winH){
				if(!pageTop.classList.contains("show")){
					pageTop.classList.add("show");
				}
			}
			else{
				if(pageTop.classList.contains("show")){
					pageTop.classList.remove("show");
				}
			}
		});

		btnTop.addEventListener("click", function(e){
			e.preventDefault();

			gsap.to(window, {scrollTo: 0, duration: 0.3, ease: Power3.easeOut});
		});
	}
};

window.addEventListener("load", function(){
	lenisAnimation();
	ui.init();

	// gsap.registerPlugin(ScrollTrigger);
	
	this.setTimeout(function(){
		gsap.to(window, {scrollTo: 0, duration: 0.5});
	}, 100);
	

	// header page controll
	let gnb=document.querySelector(".gnb");
	let gnbControll=document.querySelectorAll(".gnb li");
	let pageList=document.querySelectorAll(".contents > div");
	let header=document.querySelector("#header");
	let topPos=0;

	pageList.forEach((list, i) => {
		gsap.timeline({
			scrollTrigger: {
				trigger: list,
				start: "top 80%",
				end: "bottom 20%",
				onEnter: () => {
					controllMenu(i);
				},
				onEnterBack: () => {
					controllMenu(i);
				}
			}
		});
	});

	function controllMenu(i){
		gnbControll.forEach((list2, j) => {
			if(j == i){
				gnbControll[j].classList.add("active")
			}
			else{
				gnbControll[j].classList.remove("active");
			}
		});

		if(i != 0){
			header.classList.add("fixed");
		}
		else{
			header.classList.remove("fixed");
		}

		if (i === 1 || i === 2) {
			gnb.classList.add("textblack");
		} 
		else {
			gnb.classList.remove("textblack");
		}
	}

	gnbControll.forEach(function(item, i){
		gnbControll[i].addEventListener("click", function(e){
			e.preventDefault();

			topPos=pageList[i].offsetTop;
			gsap.to(window, {scrollTo: topPos, duration: 1});
			document.getElementById("header").classList.remove("menu-open");
		});
	});


	// intro frontend developer text effect
	const tl = gsap.timeline();

	function typeFn(element, timer){
		tl.fromTo(element, {
			filter: "blur(20px)",
		}, {
			opacity: 1,
			duration: 1,
			filter: "blur(0px)"
		}, timer);
	}
	
	for (let i = 1; i <= 9; i++) {
		const randomTime = Math.random() * 3 + 0.3;
	  
		typeFn(`.main-intro .middle .one span:nth-of-type(${i})`, randomTime);
	}
	for (let i = 1; i <= 9; i++) {
		const randomTime = Math.random() * 3 + 0.3;
	  
		typeFn(`.main-intro .middle .two span:nth-of-type(${i})`, randomTime);
	}


	// intro text skills
	let textArea=document.querySelector(".main-intro .title .bottom ul");

	let dataN=0;

	let textData=[
		["HTML", "CSS", "JavaScript"],
		["axios", "React", "Redux", "Vue.js"],
		["Figma", "Prototype"],
		["PWA", "Git", "GitHub"]
	];

	function animationText(n){
		textData[n].forEach(function(item){
			let newLi=document.createElement("li");
			newLi.innerText=item;
			textArea.appendChild(newLi);
		});

		gsap.fromTo(".main-intro .title .bottom ul li", { width: 0 }, { width: "auto", duration: 0.4, stagger: 0.8, onComplete: function(){
			setTimeout(function(){
				let existLi=document.querySelectorAll(".main-intro .title .bottom ul li");

				existLi.forEach(function(item){
					item.remove();
				});

				if(dataN < textData.length-1){
					dataN+=1;
				}
				else{
					dataN=0;
				}

				animationText(dataN);
			}, 5000);
		}});
	}

	animationText(dataN);

	
	// intro video
	let mainVideo=document.getElementById("main_video");

	mainVideo.muted=true;

	mainVideo.setAttribute("src", "images/background.mp4");

	mainVideo.addEventListener("loadeddata", function(){
		mainVideo.play();
	});

	mainVideo.addEventListener("ended", function(){
		mainVideo.play();
	});


	// main-about text effect1
	new TypeIt(".txtEffect", {
		strings: ["복잡한 것은 명료하게,", "명료한 것은 깊이 있게,", "깊이 있는 것은 유연하게!"],
		speed: 50,
		waitUntilVisible: true
	}).go();


	// main-about text effect2
	let aboutText = document.querySelector(".main-about .txt");

	gsap.fromTo(aboutText, 
		{opacity: 0, y: 100},
		{
			opacity: 1,
			y: 0,
			duration: 0.8,
			delay: 0.3,
			scrollTrigger: {
				trigger: ".main-about .flex-cont",
				start: "top 80%"
			}
		}
	);

	
	// main-skills title
	let skillsTitle = document.querySelector(".main-skills .main-tit");

	gsap.fromTo(skillsTitle,
		{opacity: 0, y: 50},
		{
			opacity: 1,
			y: 1,
			duration: 1,
			delay: 0.5,
			scrub: true,
			scrollTrigger:{
				trigger: ".main-skills",
				start: "top 80%"
			}
		}
	)


	// main-skills swiper
    const skillsSwiper = new Swiper(".skillsSwiper", {		
		slidesPerView: 1.5,
		spaceBetween: 30,
		autoplay: {
			delay: 2000,
			disableOnInteraction: false
		},
		speed: 1000,
		scrollbar: {
			el: '.swiper-scrollbar',
			draggeable: true,
			hide: false
		},
		breakpoints: {
			920:{
				slidesPerView: 2.5
			},
			1240:{
				slidesPerView: 3
			}
		}
	});

	// swiper play entries
	const swiperContainer = document.querySelector('.skillsSwiper');

	const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
		if (entry.isIntersecting) {
			skillsSwiper.autoplay.start();
		} else {
			skillsSwiper.autoplay.stop();
		}
		});
	},
	{
		threshold: 0.5,
	}
	);

	observer.observe(swiperContainer);


	// main-projects title
	let projectsTitle = document.querySelector(".main-projects .main-tit");

	gsap.fromTo(projectsTitle,
		{opacity: 0, y: 50},
		{
			opacity: 1,
			y: 1,
			duration: 0.8,
			delay: 0.5,
			scrub: true,
			scrollTrigger:{
				trigger: ".main-projects",
				start: "top 90%"
			}
		}
	)

	// projects show menu
	let projectList=document.querySelectorAll(".main-projects .con .wrapper > ul > li");
	let projectDesc=document.querySelectorAll(".main-projects .con .desc");
	let projectOpen=document.querySelectorAll(".main-projects .con .wrapper ul li .toggle-button");

	projectList.forEach((item, i) => {
		gsap.fromTo(item, {opacity: 0, y: 200}, {opacity: 1, y: 0, duration: 0.3, stagger: 0.3,
			scrollTrigger: {
                trigger: item,
                start: "top bottom",
                toggleActions: "play none none reverse",
            }
		});

		item.addEventListener("click", () => {
			if(item.classList.contains("showmenu") == false){
				projectList.forEach(function(list, j){
					if(j == i){
						projectList[j].classList.add("showmenu");

						gsap.to(projectList[j], { height: 250, duration: 0.4, onComplete: function(){
							projectDesc[j].classList.add("showmenu");
							projectOpen[j].classList.add("active");
						}});
					}
					else{
						projectList[j].classList.remove("showmenu");
						projectDesc[j].classList.remove("showmenu");
						projectOpen[j].classList.remove("active");

						if(projectList[j].clientHeight === 310){
							gsap.to(projectList[j], { height: 100, duration: 0.4 });
						}
					}
				});
			}
			else{
				gsap.to(projectList[i], { height: 100, duration: 0.4 });

				projectList[i].classList.remove("showmenu");
				projectDesc[i].classList.remove("showmenu");
				projectOpen[i].classList.remove("active");
			}
		});
	});


	// main-opensource title
	let sourceTitle = document.querySelector(".main-source .main-tit");

	gsap.fromTo(sourceTitle,
		{opacity: 0, y: 50},
		{
			opacity: 1,
			y: 1,
			duration: 0.8,
			delay: 0.3,
			scrub: true,
			scrollTrigger:{
				trigger: ".main-source",
				start: "top 90%"
			}
		}
	)

	// main-opensource con effect
	let opensourceList=document.querySelectorAll(".main-source .con > ul > li");

	opensourceList.forEach(function(list, i){
		gsap.fromTo(list,
			{y: 200, opacity: 0},
			{
				y: 0,
				opacity: 1,
				duration: 0.3,
				delay: 0.3,
				scrollTrigger: {
					trigger: list,
					scrub: true,
					start: "top 90%"
				}
			});
	});


	// main-contact message
	let contactMessage=document.querySelector(".main-contact .info");
	gsap.fromTo(contactMessage,
		{opacity: 0},
		{
			opacity: 1,
			duration: 5,
			delay: 0.5,
			scrollTrigger:{
				trigger: ".main-contact .main-tit",
				start: "top 80%",
				scrub: true
			}
		}
	);


	// body background color change
	document.body.classList.add("black");

	const tlpageAbout=gsap.timeline({
		scrollTrigger: {
			trigger: ".main-about",
			start: "top 30%",
			onEnter: () =>{
				document.body.classList.remove("black");
			},
			onLeaveBack: () => {
				document.body.classList.add("black");
			}
		}
	});

	const tlpageProject=gsap.timeline({
		scrollTrigger: {
			trigger: ".main-projects",
			start: "top 60%",
			onEnter: () =>{
				document.body.classList.add("dark");
			},
			onLeaveBack: () =>{
				document.body.classList.remove("dark");
			}
		}
	});

	const tlpageContact=gsap.timeline({
		scrollTrigger: {
			trigger: ".main-contact",
			start: "top 70%",
			onEnter: () =>{
				document.body.classList.add("blue");
			},
			onLeaveBack: () =>{
				document.body.classList.remove("blue");
			}
		}
	});
});
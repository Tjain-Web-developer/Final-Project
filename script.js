(function(){
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
      el: document.querySelector('#main'),
      smooth: true
  });
  
  locoScroll.on("scroll", ScrollTrigger.update);
  
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
  
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();
})();

// -----------------------^^^^----ONLY FOR LocomotiveScroll WITH ScrollTrigger----^^^^^----------------------

// -----------------Image scaling and rotating on scroll-------------------
gsap.to(".rtt",{
    scrollTrigger: {
        trigger: "#secondScreen",
        start: "top top",
        end: "bottom 10%",
        scroller: "#main",
        scrub: 2,
        pin: true,
        onUpdate : function(){
          var img = document.querySelector("#rotating1");
          var img2 = document.querySelector("#rotating2");
          var img3 = document.querySelector("#rotating3");
          
          imgRect = img.getBoundingClientRect().top;
          imgRect2 = img2.getBoundingClientRect().top;
          imgRect3 = img3.getBoundingClientRect().top;

          // console.log(gsap.utils.mapRange(10,-10,.6,2,(Math.floor(imgRect*0.009))));
          if(imgRect > -701){
            var floor = Math.floor(imgRect*0.02);
            var scl = gsap.utils.mapRange(10,-10,.98,2,(floor));
            img.style.transform = `translate(-50%,0) scale(${scl}) rotate3d(1,1,0,${imgRect*0.09}deg)`
          }
          if(imgRect2 > -701){
            var floor2 = Math.floor(imgRect2*0.02);
            var scl2 = gsap.utils.mapRange(10,-10,.98,2,(floor2));
            img2.style.transform = `translate(-50%,0) scale(${scl2}) rotate3d(1,1,0,${imgRect2*0.09}deg)`
          }
          if(imgRect3 > -701){
            var floor3 = Math.floor(imgRect3*0.02);
            var scl3 = gsap.utils.mapRange(10,-10,.98,2,(floor3));
            img3.style.transform = `translate(-50%,0) scale(${scl3}) rotate3d(1,1,0,${imgRect3*.09}deg)`
          }
        }
    },
    top: "-90%",
    duration: 20,
    stagger: 8,
    // ease: "slow(0.7, 0.7, false)"
    ease: "Power2.easeInOut",
})

// -----------------To push nav on scrolling-------------------
gsap.to("#nav",{
    scrollTrigger: {
        trigger: "#secondScreen",
        start: "top 20%",
        end: "bottom 100%",
        scroller: "#main",
        scrub: 2,
        // pin: true
    },
    top: "-48px",
    duration: 1,
    ease: "power2.out",
    opacity: 0
})

// -----------------infinite scroll text-------------------
gsap.to(".bold",{
  repeat: -1,
  x: "-100%",
  duration: 5,
  ease: "linear"
})
gsap.from("#textm2 h1",{
  repeat: -1,
  x: "-100%",
  duration: 5,
  ease: "linear"
})

// -----------------Images rotate and move along mouse-------------------
const alt = document.querySelectorAll(".elem");
alt.forEach(function(elem){
  elem.addEventListener("mouseover",function(){
    this.children[1].style.opacity = 1;
  })
  elem.addEventListener("mousemove",function(elem){
    this.children[1].style.opacity = 1;
    this.children[1].style.transform = `translate(0%,-50%) translate(${elem.screenX*.50}px, -${elem.screenX*0.05}px) rotate(${elem.screenX*.04}deg)`
  })
  elem.addEventListener("mouseout",function(elem){
    this.children[1].style.opacity = 0;
    this.children[1].style.transform = `translate(0%,-50%) translate(${elem.screenX*.50}px, -${elem.screenX*0.05}px) rotate(${elem.screenX*.04}deg)`
  })
})

// -----------------text animation-------------------
var animt = document.querySelectorAll(".texta");
gsap.set(animt,{opacity:0,})
animt.forEach(function(t){
  gsap.to(t,{
    scrollTrigger: {
      trigger: t,
      scroller: "#main",
      start: "top 80%",
    },
    opacity: 1,
    onStart: function(elem){
      $(t).textillate({in: {effect: 'fadeInUp'}});
    }
  })
})

var ani_flip = document.querySelectorAll(".textb");
gsap.set(ani_flip,{opacity:0,})
ani_flip.forEach(function(tx){
  gsap.to(tx,{
    scrollTrigger: {
      trigger: tx,
      scroller: "#main",
      start: "top 100%"
    },
    opacity: 1,
    onStart: function(elem){
      $(tx).textillate({in: {effect: 'fadeIn'}});
    }
  })
})

var ani_fade_sync = document.querySelectorAll(".textc");
gsap.set(ani_fade_sync,{opacity:0,})
ani_fade_sync.forEach(function(t_fade){
  gsap.to(t_fade,{
    scrollTrigger: {
      trigger: t_fade,
      scroller: "#main",
      start: "top 100%"
    },
    opacity: 1,
    onStart: function(elem){
      $(t_fade).textillate({in: {effect: 'fadeInRight',sync: true, delay: 50}});
    }
  })
})

// -----------------image skew-------------------
let val = document.querySelector(".screen").getBoundingClientRect().left;
let first = document.querySelector("#firstscreen");
function swing(){
  first.addEventListener("scroll",function(){
    var newval = document.querySelector(".screen").getBoundingClientRect().left*.3;
    var val_we_need = Math.floor(val - newval);
    document.querySelectorAll(".imagediv").forEach(photo=>{
      photo.style.transform = `translate(-25%,-35%) skew(${val_we_need}deg)`
    })
    val = newval;
  })
}
swing();

// ------------for making dragging screen with cursor-----------
const slider = document.querySelector("#firstscreen");
let isDown = false;
let startX;
let startR;
let scrollLeft;
let scrollRight;

slider.addEventListener("mousedown",function(e){
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
})

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;  // stop the fn from running
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;

  // console.log(slider.scrollLeft)
});

// --------------Gsap for nav text-----------
var navtxt = gsap.from("#fullnavtxt h1",{
    opacity: 0,
    x: "20px",
    duration: .7,
    ease: "linear",
    paused: true,
    delay: 1
});

var atag = gsap.from("#quicklinks a",{
  opacity: 0,
  y: "15px",
  duration: .7,
  ease: "linear",
  paused: true,
  delay: 1.3
});

// ----------------To Move Menu Slider---------------
var fullnav = document.querySelector("#fullernav");
var cross = document.querySelector("#cross");
cross.addEventListener("click",function(){
  fullnav.style.transform = "translate(0)";
});

var navOpen = document.querySelector("#open");
navOpen.addEventListener("click",function(){
  fullnav.style.transform = "translateX(100%)";
  navtxt.play();
  atag.play();
});

// ------------to make ball follow mouse-------------
var ball = document.querySelector("#ball");

window.addEventListener("mousemove",function(e){
  var x = e.clientX-(ball.offsetWidth/2);
  var y = e.clientY-(ball.offsetHeight/2);

  ball.style.left = `${x}px`
  ball.style.top = `${y}px`
})
// ------------to make cursor grow on hover-------------
var clip = document.querySelectorAll(".imagediv");

clip.forEach(function(ele){
    ele.addEventListener("mouseover",function(){
      ball.style.width = "100px"
      ball.style.height = "100px"
    });

    ele.addEventListener("mouseout",function(){
      ball.style.width = "12px"
      ball.style.height = "12px"
    });
})

// You can change global variables here:
var radius; // how big of the radius
var imgWidth; // width of images (unit: px)
var imgHeight;
var threeDimenCarousel = document.getElementById('three-d-carousel');
var odrag = document.getElementById('drag-container');
var ospin = document.getElementById('spin-container');
var aImg = ospin.getElementsByTagName('img');
var aVid = ospin.getElementsByTagName('video');
var ground = document.getElementById('ground');
var aEle = [...aImg, ...aVid]; // combine 2 arrays
checkResize();
window.addEventListener('resize', checkResize);

function checkResize(){
  console.log('screen size changed');
  if(window.matchMedia("(max-width: 768px)").matches){
    radius = 250; // how big of the radius
    imgWidth = 200; // width of images (unit: px)
    imgHeight = 140; // height of images (unit: px)
    console.log('variable got redefined for small screen');
  } else {
    radius = 360; // how big of the radius
    imgWidth = 300; // width of images (unit: px)
    imgHeight = 200; // height of images (unit: px)
    console.log('variables got redefined for large screen');
}
sizeImage();

}
var autoRotate = true; // auto rotate or not
var rotateSpeed = -120; // unit: seconds/360 degrees



// ===================== start =======================
// animation start after 1000 miliseconds
setTimeout(init, 1000);


// Size of images
function sizeImage(){
  ospin.style.width = imgWidth + "px";
  ospin.style.height = imgHeight + "px";
  ground.style.width = radius * 3 + "px";
  ground.style.height = radius * 3 + "px";
}

// Size of ground - depend on radius

function init(delayTime) {
  for (var i = 0; i < aEle.length; i++) {
    // aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
    aEle[i].style.transform = `rotateY(${i * (360 / aEle.length)}deg) translate3d(0, 0, ${radius}px)`;
    aEle[i].style.transition = "transform 1s";
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
  }
}

function applyTranform(obj) {
  // Constrain the angle of camera (between 0 and 180)
  if(tY > 180) tY = 180;
  if(tY < 0) tY = 0;

  // Apply the angle
  obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}

function playSpin(yes) {
  ospin.style.animationPlayState = (yes?'running':'paused');
}

var sX, sY, nX, nY, desX = 0,
    desY = 0,
    tX = 0,
    tY = 0;

// auto spin
if (autoRotate) {
  var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
  ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}


// setup events
threeDimenCarousel.onpointerdown = function (e) {
  clearInterval(odrag.timer);
  e = e || window.event;
  var sX = e.clientX,
      sY = e.clientY;

  this.onpointermove = function (e) {
    e = e || window.event;
    var nX = e.clientX,
        nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1;
    tY += desY * 0.1;
    applyTranform(odrag);
    sX = nX;
    sY = nY;
  };

  this.onpointerup = function (e) {
    odrag.timer = setInterval(function () {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.1;
      tY += desY * 0.1;
      applyTranform(odrag);
      playSpin(false);
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(odrag.timer);
        playSpin(true);
      }
        // desX *= 0.95;
        // desY *= 0.95;
        // tX += desX * 0.1;
        // tY += desY * 0.1;
        // applyTranform(odrag);
        // playSpin(false);
        // if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) return;
        // requestAnimationFrame(smoothAnimation);
    }, 17);
    this.onpointermove = this.onpointerup = null;
  };

  return false;
};

// document.onmousewheel = function(e) {
//   e = e || window.event;
//   var d = e.wheelDelta / 20 || -e.detail;
//   radius += d;
//   init(1);
// };

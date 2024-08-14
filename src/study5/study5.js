const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let w;
let h;
let balls = [];
let rgb = ['#8C030E', '#260104', '#8C031C', '#40010D', '#0D0D0D', '#F21616', '#D91414']

let mouse = {
  x:undefined,
  y:undefined,
}

function easeOutQuart(x){
  return 1 - Math.pow(1 - x, 4);
}

function init(){
  resizeReset();
  animationLoop();
}

function resizeReset(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  w = canvas.width;
  h = canvas.height;
}

//애니메이션 그리는 파트
function animationLoop(){
  requestAnimationFrame(animationLoop);
  ctx.clearRect(0,0,w,h);
  ctx.globalCompositeOperation='lighter';
  drawBalls();

  let temp = [];
  for (let i=0; i<balls.length; i++){
    if (balls[i].time<=balls[i].ttl){ //이미 시간을 다한 건 버리는 과정.
      temp.push(balls[i])
    }
  }

  balls = temp;
}

function drawBalls(){
  for (let i=0; i<balls.length; i++){
    balls[i].draw();
  }
}

function mousemove(e){
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  console.log(mouse.x, mouse.y);
  console.log("볼 개수", balls.length);

  for (let i=0; i<5; i++){
    balls.push(new Ball());    
  }

}

function mouseout(){
  mouse.x = undefined;
  mouse.y = undefined;
}

function getRandomInt(min, max){
  return Math.round(Math.random()*(max-min+1)+min)
}

class Ball {
  constructor(){
    this.start = {
      x : mouse.x + getRandomInt(-20, 20),
      y : mouse.y + getRandomInt(-20, 20),
      size : getRandomInt(10, 20)
    }

    this.end ={
      x : this.start.x + getRandomInt(-50, 50),
      y : this.start.y + getRandomInt(-50,50)
    }

    this.x = this.start.x;
    this.y = this.start.y;
    this.size = this.start.size;
    this.color = rgb[getRandomInt(0, rgb.length-1)];
    
    this.time = 0;
    this.ttl = 60;
  }
  draw(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.closePath();

    ctx.fillStyle = this.color;
    ctx.fill();

    this.update();
  }
  update(){
    if (this.time <= this.ttl){
      let progress = this.time / this.ttl;
      this.size = this.start.size*(1-easeOutQuart(progress));
     
      this.x = this.x + (this.end.x-this.x)*0.3;
      this.y = this.y + (this.end.y-this.y)*0.3;
    }
    this.time++;
  }

}

window.addEventListener('DOMContentLoaded', init);
window.addEventListener("resize", resizeReset);
window.addEventListener("mousemove", mousemove);
window.addEventListener("mouseout", mouseout);


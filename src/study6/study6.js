const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');
let spots = [];
let hue = 0;

const mouse = {
  x : undefined,
  y : undefined
}


class Particle{
  constructor(){
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random()*2 + 0.1;
    this.speedX = Math.random()*2 - 1; //이동 방향X
    this.speedY = Math.random()*2 - 1; //이동 방향Y
    this.color = 'hsl('+hue+', 100%, 50%)';
  }

  update(){
    this.x += this.speedX*0.7;
    this.y += this.speedY*0.7;
    if (this.size> 0.1) this.size-=0.01;
  }

  draw(){    
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();

    this.update();
  }
}

function init(){
  resize();
  handleParticle()
}

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function mousemove(e){
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  for (let i=0; i<3; i++){
    spots.push(new Particle());
  }
}


function handleParticle(){
  ctx.clearRect(0,0,canvas.width, canvas.height);
  for (let i=0; i<spots.length; i++){
    spots[i].draw();
    for (let j=i; j<spots.length; j++){
      const dx = spots[i].x - spots[j].x;
      const dy = spots[i].y - spots[j].y;
      const distance = Math.sqrt(dx*dx + dy*dy);
      if (distance<50){
        ctx.beginPath();
        ctx.strokeStyle = spots[i].color;
        ctx.lineWidth = spots[i].size/10;
        ctx.moveTo(spots[i].x, spots[i].y);
        ctx.lineTo(spots[j].x, spots[j].y);
        ctx.stroke();
      }

    }
 
    if (spots[i].size<=0.1){
      spots.splice(i,1);
      i--;
    }
  }  
  //if (hue===10) hue=0;
  hue++;
  requestAnimationFrame(handleParticle);
}

canvas.addEventListener("mousemove", mousemove);
document.addEventListener('DOMContentLoaded', init);

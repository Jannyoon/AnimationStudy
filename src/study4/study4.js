const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");
let colorArray = ['#D90D1E','#BF0426','#8C031C','#F20F38','#D9ADAD'];
let mouse = {
  x : undefined,
  y : undefined
}

let maxRadius = 40;

let circleArray = [];

class Circle {
  constructor(x,y,dx,dy){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = 30;
    this.minRadius = getRandom(1, 5);
    this.color = colorArray[getRandom(1, colorArray.length)];
  }
  draw(){
    c.beginPath();
    
    c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    c.strokeStyle = this.color;
    c.stroke();
    c.fillStyle = this.color;
    c.fill();
  
    this.update();
  }
  update(){
    if (this.x+this.radius>=innerWidth || this.x<=this.radius){
      this.dx = -this.dx;
    }
    if (this.y+this.radius>=innerHeight|| this.y<=this.radius){
      this.dy = -this.dy;
    }
    this.x+=this.dx;
    this.y+=this.dy;


    //interactivity
    //마우스 좌표와 객체 사이의 거리가 50보다 작을 때 원을 키움
    if (Math.abs(mouse.x-this.x)<50 && Math.abs(mouse.y-this.y)<50){
      if (this.radius<maxRadius) this.radius += 1;
     
    }
    else {
      if (this.radius>this.minRadius) this.radius-=0.4;
    }
  }
}


//객체 생성
function init(){
  for (let i=0; i<800; i++){
    let radius = getRandom(10,30);
    let x = Math.random()*(innerWidth-2*radius) + radius;
    let y = Math.random()*(innerHeight-2*radius) + radius;
    let dx = (Math.random()-0.5);
    let dy = (Math.random()-0.5);
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

init();


window.addEventListener('mousemove',(e)=>{
  console.log("움직인다~");
  //onsole.log(e);
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  console.log(mouse.x, mouse.y);
})

function animate(){
  requestAnimationFrame(animate);

  c.clearRect(0, 0, canvas.width, canvas.height);
  circleArray.forEach(v=> v.draw());
}

animate();



function getRandom(min, max)
{
	return Math.floor(Math.random() * (max - min + 1) + min);
}

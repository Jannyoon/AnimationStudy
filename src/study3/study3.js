const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');


class Circle {
  constructor (x, y, dx, dy, radius){
    this.x = x;
    this.y = y;

    this.radius = radius;
    this.dx = dx; //속도 조절
    this.dy = dy;
  }
  draw (){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    c.strokeStyle = 'black';
    c.stroke();
    c.fillStyle = 'black';
    c.fill();

    this.update();
  }
  update (){
    if (this.x+this.radius>=innerWidth || this.x<=this.radius) {
      this.dx = -this.dx;
    }
    if (this.y+this.radius>=innerHeight || this.y<=this.radius) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;    
  }
}
/*
let x = Math.random()*innerWidth;
let y = Math.random()*innerHeight;
let dx = (Math.random() - 0.5)*8; //속도 조절
let dy = (Math.random() - 0.5)*8; 
let radius = 30;
*/
let circleArray = [];
for (let i=0; i<100; i++){ 
  let radius = 30;
  let x = Math.random()*(innerWidth-2*radius)+radius;
  let y = Math.random()*(innerHeight-2*radius)+radius;
  let dx = (Math.random() - 0.5); //속도 조절
  let dy = (Math.random() - 0.5); 
 

  let circle = new Circle(x, y, dx, dy, radius);
  circleArray.push(circle);
}

console.log(circleArray);


function animate(){
  //재귀 함수 방식으로 동작
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  circleArray.forEach(v => v.draw());
}

animate();

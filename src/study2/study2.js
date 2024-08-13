const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');

c.fillStyle = "yellow";
c.fillRect(100,100, 100,100);

c.fillStyle = "blue";
c.fillRect(400,100,100,100)

// Line
c.beginPath();
c.moveTo(50,300);
c.lineTo(300, 100);
c.lineTo(400,300);
c.strokeStyle = "blue" //#fa34a
c.stroke();

/*
// Arc / Circle
c.beginPath();
c.arc(300, 300, 30, 0, Math.PI*2, false);
c.strokeStyle = "black"
c.stroke();
*/


// 여러 개의 Circle을 생성하는 방법
for (let i=0; i<3; i++){
  // Arc / Circle
  let x = Math.random() * window.innerWidth;
  let y = Math.random() * window.innerHeight;

  c.beginPath();
  c.arc(x, y, 30, 0, Math.PI*2, false);
  c.strokeStyle = "black"
  c.stroke();
}

console.log(canvas);
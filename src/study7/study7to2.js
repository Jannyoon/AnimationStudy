const btn = document.querySelector(".rotateBtn");
const slider = document.querySelector(".slider");

console.log(btn);

/*
선택 변수를 기준으로 rotate(변수+1deg가 되도록.)
*/
const handleClick = (e)=>{
  console.log("!click");
  console.log(slider);
  slider.style.webkitTransform = 'rotateX(-40deg)'; 
}

document.addEventListener('click', handleClick);
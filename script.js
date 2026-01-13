const btn   = document.getElementById("btn");
const card  = document.getElementById("card");
const wish  = document.getElementById("wish");
const song  = document.getElementById("song");
const photos = document.querySelectorAll(".gallery img");

/* fly photos in */
window.onload = () => {
  document.body.classList.add("loaded");
};

/* carousel highlight */
let index = 0;
setInterval(()=>{
  photos.forEach(p => p.classList.remove("active"));
  photos[index].classList.add("active");
  index = (index + 1) % photos.length;
},2500);

/* SURPRISE click — this is where music is GUARANTEED */
btn.onclick = () => {
  // browser allows audio here
  song.currentTime = 0;
  song.play();

  btn.style.display="none";
  document.body.classList.add("open");

  setTimeout(()=>{
    card.style.display="block";
    typeWish();
  },800);
};

function typeWish(){
  const text = `तुमच्या कीर्तीचा लख्ख उजेड व्हावा
तुमचा आनंद गगनात न समावा
असंच सुख समाधान तुमच्या पदरात पडत राहो
तुमचा हा वाढदिवस जल्लोषात साजरा व्हावा
वाढदिवसाच्या हार्दिक शुभेच्छा शिवा भाई 😊🎉🎂💐❤️`;

  let i=0;
  wish.textContent="";
  const t=setInterval(()=>{
    wish.textContent+=text.charAt(i);
    i++;
    if(i>=text.length) clearInterval(t);
  },35);
}

/* ===== REAL FIREWORKS ===== */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.onresize = resize;

let fireworks = [];

setInterval(()=>{
  fireworks.push({
    x: Math.random()*canvas.width,
    y: canvas.height,
    vy: 6 + Math.random()*4,
    exploded:false,
    parts:[]
  });
},700);

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  fireworks.forEach((f,i)=>{
    if(!f.exploded){
      f.y -= f.vy;
      f.vy -= 0.05;
      ctx.fillStyle="white";
      ctx.fillRect(f.x,f.y,3,3);
      if(f.vy<=0){
        f.exploded=true;
        for(let j=0;j<50;j++){
          f.parts.push({
            x:f.x,y:f.y,
            vx:Math.random()*6-3,
            vy:Math.random()*6-3,
            life:60,
            color:`hsl(${Math.random()*360},100%,60%)`
          });
        }
      }
    } else {
      f.parts.forEach(p=>{
        p.x+=p.vx;
        p.y+=p.vy;
        p.vy+=0.05;
        p.life--;
        ctx.fillStyle=p.color;
        ctx.fillRect(p.x,p.y,3,3);
      });
      f.parts = f.parts.filter(p=>p.life>0);
      if(f.parts.length===0) fireworks.splice(i,1);
    }
  });

  requestAnimationFrame(animate);
}
animate();
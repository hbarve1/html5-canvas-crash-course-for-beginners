import "./style.css";

const canvas = document.createElement("canvas");

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const particlesArray: Particle[] = [];

canvas.width = windowWidth;
canvas.height = windowHeight;
canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";
// canvas.style.width = `${windowWidth}px`;
// canvas.style.height = `${windowHeight}px`;

document.body.appendChild(canvas);

const ctx = canvas.getContext("2d")!;

// ctx.fillStyle = "white";
// ctx.fillRect(0, 0, 800, 600);

window.addEventListener("resize", () => {
  // canvas.style.width = `${window.innerWidth}px`;
  // canvas.style.height = `${window.innerHeight}px`;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ctx.strokeStyle = "red";
// ctx.beginPath();
// ctx.lineWidth = 5;
// ctx.arc(100, 100, 50, 0, Math.PI * 2);
// ctx.stroke();

const mouse: {
  x: undefined | number;
  y: undefined | number;
} = {
  x: undefined,
  y: undefined,
};

canvas.addEventListener("click", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;

  // ctx.beginPath();
  // ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
  // ctx.stroke();
  // drawCircle();
  // console.log(mouse);

  for (let i = 0; i < 10; i++) {
    particlesArray.push(new Particle());
  }
});

canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  // console.log(mouse);
  // drawCircle();

  for (let i = 0; i < 10; i++) {
    particlesArray.push(new Particle());
  }
});

function drawCircle() {
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(mouse.x!, mouse.y!, 50, 0, Math.PI * 2);
  // ctx.arc(130, 100, 50, 0, Math.PI * 2);
  // ctx.stroke();
  ctx.fill();
}

class Particle {
  x: number | undefined;
  y: number | undefined;
  size: number;
  speedX: number;
  speedY: number;

  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    // this.x = Math.random() * canvas.width;
    // this.y = Math.random() * canvas.height;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }

  update() {
    this.x = this.x! + this.speedX;
    this.y = this.y! + this.speedY;
    if (this.x! > canvas.width || this.x! < 0) {
      this.speedX = -this.speedX;
    }
    if (this.y! > canvas.height || this.y! < 0) {
      this.speedY = -this.speedY;
    }
    if (this.size > 0.2) this.size -= 0.05;
  }

  draw() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x!, this.y!, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particle());
  }
}
// init();

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();

    if (particlesArray[i].size <= 0.2) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
}

// drawCircle();
function animate() {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.fillStyle = "black";
  ctx.fillStyle = "rgba(0, 0, 0, 0.01)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  // console.log(particlesArray.length);
  requestAnimationFrame(animate);
  // drawCircle();
}
animate();

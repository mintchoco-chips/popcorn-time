let bucketImg, grapeImg, kernelImg;
let grapes = [];
let popcorns = [];
let gravity = 0.6;
let lift = -10;
let velocity = 0;
let score = 0;
let bucketY;
let bucketSize, grapeSize, popcornSize;

function preload() {
  bucketImg = loadImage(
    "assets/bucket2.png",
    () => console.log("Bucket loaded"),
    () => console.error("Failed to load bucket")
  );
  grapeImg = loadImage(
    "assets/grape2.png",
    () => console.log("Grape loaded"),
    () => console.error("Failed to load grape")
  );
  kernelImg = loadImage(
    "assets/kernel2.png",
    () => console.log("Kernel loaded"),
    () => console.error("Failed to load kernel")
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);

  bucketSize = width * 0.15;    
  grapeSize = width * 0.1;      
  popcornSize = width * 0.08;   

  bucketY = height / 2;
}

function draw() {
  background(255, 240, 200);

  // Gravity & movement
  velocity += gravity;
  velocity *= 0.9; 
  bucketY += velocity;
  bucketY = constrain(bucketY, 0, height - bucketSize);

  // Draw player
  image(bucketImg, 50, bucketY, bucketSize, bucketSize);

  // Spawn grapes
  if (frameCount % 90 === 0) {
    grapes.push({ x: width, y: random(100, height - 100), size: grapeSize });
  }

  // Spawn popcorns
  if (frameCount % 150 === 0) {
    popcorns.push({ x: width, y: random(50, height - 50), size: popcornSize });
  }

  // Move and draw grapes
  for (let i = grapes.length - 1; i >= 0; i--) {
    let g = grapes[i];
    g.x -= width * 0.01; 
    image(grapeImg, g.x, g.y, g.size, g.size);

    if (dist(50, bucketY, g.x, g.y) < bucketSize * 0.6) {
      noLoop();
      textSize(width * 0.08);
      fill(0);
      text("Game Over! Score: " + score, width / 2, height / 2);
    }

    if (g.x < -g.size) grapes.splice(i, 1);
  }

  // Move and draw popcorns
  for (let i = popcorns.length - 1; i >= 0; i--) {
    let p = popcorns[i];
    p.x -= width * 0.008;
    image(kernelImg, p.x, p.y, p.size, p.size);

    if (dist(50, bucketY, p.x, p.y) < bucketSize * 0.55) {
      score++;
      popcorns.splice(i, 1);
    }

    if (p.x < -p.size) popcorns.splice(i, 1);
  }

  // Score
  fill(0);
  textSize(width * 0.05);
  text("Score: " + score, width - 100, 40);
}

function mousePressed() {
  velocity += lift;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  bucketSize = width * 0.15;
  grapeSize = width * 0.1;
  popcornSize = width * 0.08;
}

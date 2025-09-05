let bucket, grapeImg, kernelImg;
let grapes = [];
let popcorns = [];
let gravity = 0.6;
let lift = -10;
let velocity = 0;
let score = 0;
let bucketY = 300;

function preload() {
  bucket = loadImage("assets/bucket2.png");
  grapeImg = loadImage("assets/grape.png");
  kernelImg = loadImage("assets/kernel2.png");
}

function setup() {
  createCanvas(400, 600);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(255, 240, 200);

  // Gravity & movement
  velocity += gravity;
  velocity *= 0.9; // damping
  bucketY += velocity;
  bucketY = constrain(bucketY, 0, height - 50);

  // Draw player
  image(bucket, 50, bucketY, 60, 60);

  // Spawn grapes
  if (frameCount % 90 === 0) {
    grapes.push({ x: width, y: random(100, height - 100), size: 50 });
  }

  // Spawn popcorns
  if (frameCount % 150 === 0) {
    popcorns.push({ x: width, y: random(50, height - 50), size: 30 });
  }

  // Move and draw grapes
  for (let i = grapes.length - 1; i >= 0; i--) {
    let g = grapes[i];
    g.x -= 3;
    image(grapeImg, g.x, g.y, g.size, g.size);

    if (dist(50, bucketY, g.x, g.y) < 40) {
      noLoop();
      textSize(32);
      fill(0);
      text("Game Over! Score: " + score, width/2, height/2);
    }

    if (g.x < -50) grapes.splice(i, 1);
  }

  // Move and draw popcorns
  for (let i = popcorns.length - 1; i >= 0; i--) {
    let p = popcorns[i];
    p.x -= 2;
    image(kernelImg, p.x, p.y, p.size, p.size);

    if (dist(50, bucketY, p.x, p.y) < 35) {
      score++;
      popcorns.splice(i, 1);
    }

    if (p.x < -30) popcorns.splice(i, 1);
  }

  // Score
  fill(0);
  textSize(20);
  text("Score: " + score, width - 80, 30);
}

function mousePressed() {
  velocity += lift;
}

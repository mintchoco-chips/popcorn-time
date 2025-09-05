let bucketImg, grapeImg, kernelImg;
let grapes = [];
let popcorns = [];
let gravity = 0.6;
let lift = -10;
let velocity = 0;
let score = 0;
let bucketY = 200;

function preload() {
  bucketImg = loadImage("bucket2.png");
  grapeImg = loadImage("grape2.png");
  kernelImg = loadImage("kernel2.png");
}

function setup() {
  createCanvas(300, 400);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(255, 240, 200);
  scale(1.5); // zoom in 150%
  translate(-50, -100); // shift so bucket stays visible
  // Gravity & movement
  velocity += gravity;
  velocity *= 0.9; // damping
  bucketY += velocity;
  bucketY = constrain(bucketY, 0, height - 100);

  // Draw player (bigger bucket)
  image(bucketImg, 50, bucketY, 100, 100);

  // Spawn grapes
  if (frameCount % 90 === 0) {
    grapes.push({ x: width, y: random(100, height - 100), size: 60 });
  }

  // Spawn popcorns
  if (frameCount % 150 === 0) {
    popcorns.push({ x: width, y: random(50, height - 50), size: 40 });
  }

  // Move and draw grapes (faster + bigger)
  for (let i = grapes.length - 1; i >= 0; i--) {
    let g = grapes[i];
    g.x -= 5; 
    image(grapeImg, g.x, g.y, g.size, g.size);

    if (dist(50, bucketY, g.x, g.y) < 60) {
      noLoop();
      textSize(28);
      fill(0);
      text("Game Over! Score: " + score, width / 2, height / 2);
    }

    if (g.x < -60) grapes.splice(i, 1);
  }

  // Move and draw popcorns (faster + bigger)
  for (let i = popcorns.length - 1; i >= 0; i--) {
    let p = popcorns[i];
    p.x -= 4;
    image(kernelImg, p.x, p.y, p.size, p.size);

    if (dist(50, bucketY, p.x, p.y) < 55) {
      score++;
      popcorns.splice(i, 1);
    }

    if (p.x < -40) popcorns.splice(i, 1);
  }

  // Score
  fill(0);
  textSize(18);
  text("Score: " + score, width - 80, 30);
}

function mousePressed() {
  velocity += lift;
}

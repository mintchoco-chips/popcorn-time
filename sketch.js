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
    () => console.log("✅ bucket2.png loaded!"),
    () => console.error("❌ bucket2.png NOT FOUND")
  );
  grapeImg = loadImage(
    "assets/grape2.png",
    () => console.log("✅ grape2.png loaded!"),
    () => console.error("❌ grape2.png NOT FOUND")
  );
  kernelImg = loadImage(
    "assets/kernel2.png",
    () => console.log("✅ kernel2.png loaded!"),
    () => console.error("❌ kernel2.png NOT FOUND")
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  calculateSizes();
  bucketY = height / 2;
}

function draw() {
  background(255, 240, 200);

  // Gravity & movement
  velocity += gravity;
  velocity *= 0.9;
  bucketY += velocity;
  bucketY = constrain(bucketY, 0, height - bucketSize);

  let bucketCenterX = 50 + bucketSize / 2;
  let bucketCenterY = bucketY + bucketSize / 2;

  // Draw bucket
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
    g.x -= width * 0.008; // speed proportional to width
    image(grapeImg, g.x, g.y, g.size, g.size);

    if (dist(bucketCenterX, bucketCenterY, g.x, g.y) < bucketSize * 0.6) {
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
    p.x -= width * 0.006;
    image(kernelImg, p.x, p.y, p.size, p.size);

    if (dist(bucketCenterX, bucketCenterY, p.x, p.y) < bucketSize * 0.55) {
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

// Jump on click or tap
function mousePressed() {
  velocity += lift;
}

function touchStarted() {
  velocity += lift;
  return false; // prevent scrolling on mobile
}

// Handle window resizing
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateSizes();

  // Update existing objects
  for (let g of grapes) g.size = grapeSize;
  for (let p of popcorns) p.size = popcornSize;
  bucketY = constrain(bucketY, 0, height - bucketSize);
}

// Calculate sizes based on canvas width
function calculateSizes() {
  bucketSize = width * 0.45;
  grapeSize = width * 0.2;
  popcornSize = width * 0.1;
}
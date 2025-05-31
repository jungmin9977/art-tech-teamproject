// ========== 전역 변수 ==========
let clouds = [];

// ========== Cloud 함수형 ==========
function createCloud(x, y, w, speed) {
  return {
    x: x,
    y: y,
    w: w,
    h: w * 0.6,
    speed: speed
  };
}

function moveCloud(cloud) {
  cloud.x += cloud.speed;
  if (cloud.x - cloud.w / 2 > width) {
    cloud.x = -cloud.w / 2;
  }
}

function displayCloud(cloud) {
  noStroke();
  fill(255, 255, 255, 230);
  ellipse(cloud.x, cloud.y, cloud.w, cloud.h);
  ellipse(cloud.x + cloud.w * 0.3, cloud.y + cloud.h * 0.1, cloud.w * 0.7, cloud.h * 0.7);
  ellipse(cloud.x - cloud.w * 0.3, cloud.y + cloud.h * 0.2, cloud.w * 0.6, cloud.h * 0.6);
}

function initNewStartClouds() {
  clouds = [];
  for (let i = 0; i < 4; i++) {
    clouds.push(createCloud(random(width), random(50, 200), random(100, 180), random(0.3, 1.0)));
  }
}

function drawClouds() {
  for (let cloud of clouds) {
    moveCloud(cloud);
    displayCloud(cloud);
  }
}

// ========== 배경 및 텍스트 ==========
function drawGradientSky() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color('#BEE3F7'), color('#FFF6C3'), inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function drawGround() {
  noStroke();
  fill(198, 229, 177);
  beginShape();
  vertex(0, height - 80);
  bezierVertex(width * 0.2, height - 120, width * 0.8, height - 40, width, height - 100);
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

function drawPromptText() {
  noStroke();
  fill('#7C5E3C');
  textAlign(CENTER, CENTER);
  textSize(30);
  text('새로운 시작을 위한\n첫 걸음을 내딛어보세요.', width/2, 100);
  textSize(20);
  text('앞으로의 목표와 계획을 생각하며 입력해보세요.', width/2, 150);
}

// ========== 메인 함수 ==========
function drawNewStartStage() {
  drawGradientSky();
  drawClouds();
  drawPromptText();
  drawGround();
}

// 초기화
initNewStartClouds();
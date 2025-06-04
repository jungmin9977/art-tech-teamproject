// ========== 전역 변수 ==========
let inputBox, submitButton;
let rains = [];
let sprouts = [];
let clouds = [];
let fillNextButton;
let fillLoadingState = 0;
let fillLoadingStartTime = 0;
let promptText = '';

// ========== Sprout 함수형 ==========
function createSprout(x, y) {
  return {
    x: x,
    y: y,
    scaleVal: 0.1,
    maxScale: random(0.8, 1.2),
    angle: random(-PI / 10, PI / 10),
    leafColor: color(random(90, 140), random(180, 230), random(90, 140)),
    leafSize: random(20, 35),
    stemLength: random(25, 45)
  };
}
function growSprout(sprout) {
  if (sprout.scaleVal < sprout.maxScale) {
    sprout.scaleVal += 0.02;
  }
}
function displaySprout(sprout) {
  push();
  translate(sprout.x, sprout.y);
  scale(sprout.scaleVal);
  rotate(sprout.angle);
  stroke(80, 150, 80);
  strokeWeight(5);
  line(0, 0, 0, -sprout.stemLength);
  noStroke();
  fill(sprout.leafColor);
  ellipse(-sprout.leafSize / 2, -sprout.stemLength - 5, sprout.leafSize, sprout.leafSize / 1.5);
  ellipse(sprout.leafSize / 2, -sprout.stemLength - 5, sprout.leafSize, sprout.leafSize / 1.5);
  pop();
}
function addSprout(x, y) {
  sprouts.push(createSprout(x, y));
}
function drawSprouts() {
  for (let s of sprouts) {
    growSprout(s);
    displaySprout(s);
  }
}

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
function initFillStageClouds() {
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

// ========== Rain ==========
function spawnRain(text) {
  for (let i = 0; i < 25; i++) {
    rains.push({
      text: text,
      x: random(width),
      y: random(-100, 0),
      size: random(16, 28),
      speed: random(1.5, 3)
    });
  }
}
function updateRain() {
  for (let i = rains.length - 1; i >= 0; i--) {
    let drop = rains[i];
    fill(60, 100, 200);
    textSize(drop.size);
    text(drop.text, drop.x, drop.y);
    drop.y += drop.speed;

    if (drop.y > height - 80) {
      addSprout(drop.x, height - 80);
      rains.splice(i, 1);
    }
  }
}

// ========== UI/데이터 초기화 ==========
function setupFillStage() {
  setupFillStageUI();
  initFillStageClouds();
}

// ========== UI 생성 ==========
function setupFillStageUI() {
  inputBox = createInput('');
  inputBox.size(300);
  inputBox.position(width / 2 - 170, height / 2);
  inputBox.attribute('placeholder', '');
  styleInput(inputBox);
  inputBox.input(() => {});

  submitButton = createButton('채우기');
  submitButton.size(80, 48);
  submitButton.position(width / 2 + 130, height / 2);
  styleButton(submitButton);
  submitButton.mousePressed(() => {
    spawnRain(inputBox.value() || '감사');
    inputBox.value('');
  });

  fillNextButton = createButton('다음');
  fillNextButton.position(width - 180, height - 100);
  fillNextButton.style('background', '#0080FF');
  fillNextButton.style('color', 'white');
  fillNextButton.style('border', 'none');
  fillNextButton.style('border-radius', '10px');
  fillNextButton.style('font-size', '20px');
  fillNextButton.style('padding', '11px 15px');
  fillNextButton.style('margin-left', '10px');
  fillNextButton.style('cursor', 'pointer');
  fillNextButton.style('font-family', 'inherit');
  fillNextButton.style('box-shadow', 'none');
  fillNextButton.hide();

  fillNextButton.mousePressed(() => {
    hideFillStageUI();
    loadingStartTime = millis(); // 로딩 시작 시간 기록
    currentScene = 'loadingNewStart'; // 새로운 로딩 씬으로 이동
    // showNewStartStageUI(); // 새로운 스테이지 UI 표시는 로딩 완료 후 main.js에서 처리
  });
}

// ========== 스타일 함수 ==========
function styleInput(inp) {
  inp.style('background', '#fdf3df');
  inp.style('border', '2px solid #f3e0b7');
  inp.style('border-radius', '10px 0 0 10px');
  inp.style('padding', '14px 10px');
  inp.style('font-size', '20px');
  inp.style('color', '#a67c52');
  inp.style('outline', 'none');
  inp.style('box-shadow', 'none');
  inp.style('box-sizing', 'border-box');
}
function styleButton(btn) {
  btn.style('background', 'linear-gradient(90deg, #ffb347 0%, #ff9900 100%)');
  btn.style('color', 'white');
  btn.style('border', '2px solid #f3e0b7');
  btn.style('border-radius', '0 10px 10px 0');
  btn.style('font-size', '15px');
  btn.style('padding', '10px 16px 41px 16px');
  btn.style('margin-left', '-4px');
  btn.style('cursor', 'pointer');
  btn.style('font-family', 'inherit');
  btn.style('box-shadow', 'none');
  btn.style('box-sizing', 'border-box');
}

// ========== UI 표시/숨김 ==========
function showFillStageUI() {
  inputBox.show();
  submitButton.show();
  fillNextButton.show();
}
function hideFillStageUI() {
  inputBox.hide();
  submitButton.hide();
  fillNextButton.hide();
}
function onResizeFillStage() {
  if (inputBox && submitButton) {
    inputBox.position(width / 2 - 170, 180);
    submitButton.position(inputBox.x + inputBox.width, 180);
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
  text('이제 비워진 마음에\n새롭게 채우고 싶은 것들을 적어보세요.', width/2, 100);
  textSize(20);
  text('감사한 일, 행복했던 순간, 앞으로의 다짐 등을 떠올려 입력해보세요.', width/2, 150);
}
function drawFillStage() {
  drawGradientSky();
  drawClouds();
  drawPromptText();
  updateRain();
  drawSprouts();
  drawGround();
}
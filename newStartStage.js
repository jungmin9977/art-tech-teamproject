// =================== 전역 변수 ===================
// 다음 단계로 넘어가기 위한 버튼
let newStartNextButton;
// 구름의 x좌표를 저장하는 변수들 (왼쪽에서 오른쪽으로 이동하기 위한 초기값)
let cloudX1 = -200;
let cloudX2 = -400;
// 무지개 투명도 변수
let rainbowOpacity = 0;
let rainbowFadeIn = true;

// =================== New Start Stage UI ===================
// New Start Stage의 UI 요소들을 초기화하는 함수
function setupNewStartStageUI() {
  // 다음 버튼 생성 및 스타일 설정
  newStartNextButton = createButton('end');
  newStartNextButton.position(width - 180, height - 100);
  newStartNextButton.style('background', 'rgba(255, 255, 255, 0.2)');
  newStartNextButton.style('color', 'white');
  newStartNextButton.style('border', '2px solid white');
  newStartNextButton.style('border-radius', '25px');
  newStartNextButton.style('font-size', '18px');
  newStartNextButton.style('padding', '12px 30px');
  newStartNextButton.style('cursor', 'pointer');
  newStartNextButton.style('font-family', 'inherit');
  newStartNextButton.style('backdrop-filter', 'blur(5px)');
  newStartNextButton.style('transition', 'all 0.3s ease');
  newStartNextButton.hide();
  // 버튼 클릭 시 ending 씬으로 전환
  newStartNextButton.mousePressed(() => {
    hideNewStartStageUI();
    currentScene = 'ending';
    showEndingCreditStageUI();
  });
}

// UI 요소들을 보여주는 함수
function showNewStartStageUI() {
  if (newStartNextButton) newStartNextButton.show();
}

// UI 요소들을 숨기는 함수
function hideNewStartStageUI() {
  if (newStartNextButton) newStartNextButton.hide();
}

// 화면 크기가 변경될 때 UI 요소들의 위치를 조정하는 함수
function onResizeNewStartStage() {
  if (newStartNextButton) {
    newStartNextButton.position(width - 180, height - 100);
  }
}

// =================== New Start Stage 그리기 함수 ===================
// New Start Stage의 모든 요소들을 그리는 메인 함수
function drawNewStartStage() {
  drawNewStartBackground();
  drawSun();
  drawNewStartClouds();
  drawRainbow();
  drawNewStartGround();
  drawNewStartSprouts();
 
  drawNewStartText();
}

// 배경 하늘을 그리는 함수 (그라데이션 효과)
function drawNewStartBackground() {
  // 그라데이션 하늘 배경
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color('#FEF5D4'), color('#FFD6AA'), inter);
    stroke(c);
    line(0, y, width, y);
  }
}

// 햇빛과 태양을 그리는 함수
function drawSun() {
  push();
  translate(width * 0.85, height * 0.2);
  
  // 햇빛 광선 그리기 (회전하는 16개의 광선)
  noStroke();
  fill(255, 255, 200, 120);
  for (let i = 0; i < 16; i++) {
    let angle = (PI / 8) * i + frameCount * 0.01;
    let length = 120 + sin(frameCount * 0.02 + i) * 20;
    push();
    rotate(angle);
    rect(0, -5, length, 10, 10);
    pop();
  }
  
  // 태양 그리기 (중앙 원과 빛나는 효과)
  fill(255, 255, 220, 255);
  ellipse(0, 0, 80, 80);
  fill(255, 255, 220, 80);
  ellipse(0, 0, 120, 120);
  pop();
}

// 구름을 그리는 함수 (움직이는 효과)
function drawNewStartClouds() {
  noStroke();
  fill(255, 255, 255, 230);
  
  // 구름 이동 업데이트
  cloudX1 += 0.5;
  cloudX2 += 0.3;
  
  // 구름이 화면을 벗어나면 다시 왼쪽으로 이동
  if (cloudX1 > width + 200) cloudX1 = -200;
  if (cloudX2 > width + 200) cloudX2 = -400;
  
  // 첫 번째 구름 그리기 (위아래로 살짝 움직임)
  let y1 = height * 0.2 + sin(frameCount * 0.02) * 5;
  ellipse(cloudX1, y1, 120, 70);
  ellipse(cloudX1 + 30, y1, 100, 60);
  ellipse(cloudX1 - 30, y1, 100, 60);
  
  // 두 번째 구름 그리기 (위아래로 살짝 움직임)
  let y2 = height * 0.3 + sin(frameCount * 0.02 + PI) * 5;
  ellipse(cloudX2, y2, 100, 60);
  ellipse(cloudX2 + 25, y2, 80, 50);
  ellipse(cloudX2 - 25, y2, 80, 50);
}

// 언덕을 그리는 함수
function drawNewStartGround() {
  noStroke();
  // 여러 층의 언덕
  fill(120, 200, 120); // 진한 녹색
  beginShape();
  vertex(0, height * 0.6);
  for (let x = 0; x <= width; x += 10) {
    let y = height * 0.6 + sin(x * 0.01) * 20;
    vertex(x, y);
  }
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);

  fill(160, 220, 140); // 중간 녹색
  beginShape();
  vertex(0, height * 0.65);
  for (let x = 0; x <= width; x += 10) {
    let y = height * 0.65 + sin(x * 0.015) * 15;
    vertex(x, y);
  }
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

// 새싹들을 그리는 함수
function drawNewStartSprouts() {
  // 여러 위치에 새싹 배치
  drawSingleSprout(width * 0.1, height * 0.65);
  drawSingleSprout(width * 0.3, height * 0.68);
  drawSingleSprout(width * 0.5, height * 0.64);
  drawSingleSprout(width * 0.7, height * 0.67);
  drawSingleSprout(width * 0.9, height * 0.63);
}

// 개별 새싹을 그리는 함수 (바람에 흔들리는 효과 포함)
function drawSingleSprout(x, y) {
  push();
  translate(x, y);
  
  // 바람에 흔들리는 효과
  let sway = sin(frameCount * 0.05 + x * 0.01) * 0.2;
  rotate(sway);
  
  // 줄기 그리기
  stroke(80, 150, 80);
  strokeWeight(3);
  line(0, 0, 0, -35);
  
  // 잎 그리기
  noStroke();
  fill(90, 180, 90, 200);
  
  // 왼쪽 잎 (독립적으로 흔들림)
  push();
  translate(-15, -35);
  rotate(sin(frameCount * 0.08 + x * 0.01) * 0.3);
  ellipse(0, 0, 30, 25);
  pop();
  
  // 오른쪽 잎 (독립적으로 흔들림)
  push();
  translate(15, -35);
  rotate(sin(frameCount * 0.08 + x * 0.01 + PI) * 0.3);
  ellipse(0, 0, 30, 25);
  pop();
  
  // 추가 디테일
  stroke(100, 200, 100, 100);
  strokeWeight(1);
  line(0, -35, 0, -40);
  
  pop();
}

// 무지개를 그리는 함수
function drawRainbow() {
  // 무지개 투명도 업데이트
  if (rainbowFadeIn) {
    rainbowOpacity = min(rainbowOpacity + 2, 255);
    if (rainbowOpacity >= 255) {
      rainbowFadeIn = false;
    }
  } else {
    rainbowOpacity = max(rainbowOpacity - 2, 0);
    if (rainbowOpacity <= 0) {
      rainbowFadeIn = true;
    }
  }

  // 무지개 색상 정의
  let rainbowColors = [
    color(255, 0, 0, rainbowOpacity),    // 빨강
    color(255, 165, 0, rainbowOpacity),  // 주황
    color(255, 255, 0, rainbowOpacity),  // 노랑
    color(0, 128, 0, rainbowOpacity),    // 초록
    color(0, 0, 255, rainbowOpacity),    // 파랑
    color(75, 0, 130, rainbowOpacity),   // 남색
    color(148, 0, 211, rainbowOpacity)   // 보라
  ];
  
  let arcRadius = width * 0.8;
  let arcX = width / 2;
  let arcY = height * 0.7;
  let thickness = 25;
  
  // 무지개 그리기
  noFill();
  strokeWeight(thickness);
  strokeCap(PROJECT);
  
  for (let i = 0; i < rainbowColors.length; i++) {
    stroke(rainbowColors[i]);
    arc(arcX, arcY, arcRadius - i * thickness, arcRadius - i * thickness, PI, 0);
  }
}

// 텍스트를 그리는 함수
function drawNewStartText() {
  noStroke();
  fill(50, 120, 50);
  textSize(32);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text('당신의 마음에도 새로운 시작이 찾아왔어요.', width / 2, height * 0.4);
  
  textSize(24);
  text('오늘의 마음을 기억하며, 힘찬 하루를 시작해보세요 🌱', width / 2, height * 0.4 + 50);
  textStyle(NORMAL);
}
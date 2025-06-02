// =================== 전역 변수 ===================
let newStartNextButton;

// =================== New Start Stage UI ===================
function setupNewStartStageUI() {
  // 다음 버튼 (필요하다면)
  newStartNextButton = createButton('end'); // 예시 버튼
  newStartNextButton.position(width - 180, height - 100);
  newStartNextButton.style('background', '#0080FF');
  newStartNextButton.style('color', 'white');
  newStartNextButton.style('border', 'none');
  newStartNextButton.style('border-radius', '10px');
  newStartNextButton.style('font-size', '20px');
  newStartNextButton.style('padding', '11px 15px');
  newStartNextButton.style('margin-left', '10px');
  newStartNextButton.style('cursor', 'pointer');
  newStartNextButton.style('font-family', 'inherit');
  newStartNextButton.style('box-shadow', 'none');
  newStartNextButton.hide();
  newStartNextButton.mousePressed(() => {
    // 다시 시작 로직 (예: empty 씬으로 이동)
    hideNewStartStageUI();
    currentScene = 'ending'; // ending 씬으로 이동
    showEndingCreditStageUI(); // main.js에 병합된 Ending Credit Stage UI 표시 함수 호출
  });
}

function showNewStartStageUI() {
  if (newStartNextButton) newStartNextButton.show();
}

function hideNewStartStageUI() {
  if (newStartNextButton) newStartNextButton.hide();
}

function onResizeNewStartStage() {
  if (newStartNextButton) {
    newStartNextButton.position(width - 180, height - 100);
  }
}

// =================== New Start Stage 그리기 함수 ===================
function drawNewStartStage() {
  drawNewStartBackground();
  drawNewStartClouds();
  drawNewStartGround();
  drawNewStartSprouts();
  drawRainbow();
  drawNewStartText();
}

// 배경 그리기 (하늘)
function drawNewStartBackground() {
  background('#FFFACD'); // 이미지와 유사한 밝은 노란색 배경
}

// 구름 그리기 (정적)
function drawNewStartClouds() {
  fill(255, 255, 255, 230);
  noStroke();
  // 이미지의 구름 위치 및 크기 대략적으로 표현
  ellipse(width * 0.2, height * 0.2, 100, 60);
  ellipse(width * 0.8, height * 0.3, 80, 50);
}

// 언덕 그리기
function drawNewStartGround() {
  noStroke();
  fill(150, 200, 100); // 녹색 언덕
  beginShape();
  vertex(0, height * 0.6);
  bezierVertex(width * 0.3, height * 0.5, width * 0.7, height * 0.7, width, height * 0.6);
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

// 새싹 그리기 (정적)
function drawNewStartSprouts() {
  // 이미지의 새싹 위치 및 크기 대략적으로 표현
  drawSingleSprout(width * 0.1, height * 0.65);
  drawSingleSprout(width * 0.3, height * 0.68);
  drawSingleSprout(width * 0.5, height * 0.64);
  drawSingleSprout(width * 0.7, height * 0.67);
  drawSingleSprout(width * 0.9, height * 0.63);
}

function drawSingleSprout(x, y) {
  push();
  translate(x, y);
  scale(0.8); // 적당한 크기

  stroke(80, 150, 80);
  strokeWeight(4);
  line(0, 0, 0, -30); // 줄기
  noStroke();
  fill(90, 180, 90); // 잎 색깔
  ellipse(-15, -35, 25, 20); // 왼쪽 잎
  ellipse(15, -35, 25, 20); // 오른쪽 잎
  pop();
}

// 무지개 그리기
function drawRainbow() {
  let rainbowColors = [
    color(255, 0, 0),    // 빨강
    color(255, 165, 0),  // 주황
    color(255, 255, 0),  // 노랑
    color(0, 128, 0),    // 초록
    color(0, 0, 255),    // 파랑
    color(75, 0, 130),   // 남색
    color(148, 0, 211)   // 보라
  ];
  
  let arcRadius = width * 0.8;
  let arcX = width / 2;
  let arcY = height * 0.7;
  let startAngle = PI;
  let endAngle = 0;
  let thickness = 25;
  
  noFill();
  strokeWeight(thickness);
  strokeCap(PROJECT);
  
  for (let i = 0; i < rainbowColors.length; i++) {
    stroke(rainbowColors[i]);
    arc(arcX, arcY, arcRadius - i * thickness, arcRadius - i * thickness, startAngle, endAngle);
  }
}

// 텍스트 그리기
function drawNewStartText() {
  noStroke();
  fill(50);
  textSize(32);
  textAlign(CENTER, CENTER);
  text('당신의 마음에도 새로운 시작이 찾아왔어요.', width / 2, height * 0.4);
  textSize(24);
  text('오늘의 마음을 기억하며, 힘찬 하루를 시작해보세요', width / 2, height * 0.4 + 50);
}

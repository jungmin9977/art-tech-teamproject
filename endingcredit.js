// =================== Ending Credit Stage 전역 변수 ===================
let returnButton;
let percentages = [
  {part: '비움 파트', value: 30},
  {part: '채움 파트', value: 50},
  {part: '시작 파트', value: 20}
];

// =================== Ending Credit Stage UI ===================
function setupEndingCreditStageUI() {
  // 버튼 제거
}

function showEndingCreditStageUI() {
  // 버튼 표시 함수 제거
}

function hideEndingCreditStageUI() {
  // 버튼 숨김 함수 제거
}

function onResizeEndingCreditStage() {
  // 버튼 위치 조정 함수 제거
}

// =================== Ending Credit Stage 그리기 함수 ===================
function drawEndingCreditStage() {
  drawGradientSkyEnding();
  drawGroundEnding();
  drawEndingCredits();
  drawAIPercentage();
}

// =================== Ending Credit Stage 배경 그리기 함수 ===================
function drawGradientSkyEnding() {
  let topColor = color(255, 255, 255);
  let bottomColor = color(174, 230, 249);
  
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(topColor, bottomColor, inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function drawGroundEnding() {
  noStroke();
  fill(255, 245, 220);
  beginShape();
  vertex(0, height * 0.6);
  for (let x = 0; x <= width; x += 20) {
    let y = height * 0.6 + sin(x * 0.004 + frameCount * 0.003) * 8 + cos(x * 0.008) * 6;
    curveVertex(x, y);
  }
  vertex(width, height * 0.6);
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

// =================== Ending Credit Stage 텍스트 그리기 함수 ===================
function drawEndingCredits() {
  textAlign(CENTER);
  textSize(32);
  fill(0);
  text('감사합니다', width/2, 200);
  
  textSize(24);
  text('이진우 전재민 황정민', width/2, 250);
  
  textSize(20);
  text('2024', width/2, 300);
}

function drawAIPercentage() {
  let yPos = 480;  // 380에서 480으로 변경하여 더 아래로 내림
  textSize(32);
  text(' AI 사용 현황', width/2, yPos - 40);
  
  yPos += 20; // AI 사용 현황 타이틀 아래 간격 조정
  percentages.forEach((item, index) => {
    fill(255);
    textSize(20);
    textAlign(LEFT);
    text(item.part, width/2 - 200, yPos + index*60);
    
    noFill();
    stroke(150);
    rect(width/2 - 200, yPos + index*60 + 15, 400, 25);
    
    fill('#FFB366');
    noStroke();
    rect(width/2 - 200, yPos + index*60 + 15, 400 * (item.value / 100), 25);
    
    fill(0);
    textAlign(CENTER);
    text(`${item.value}%`, width/2, yPos + index*60 + 30);
  });
} 
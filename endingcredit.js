// endingCredits.js

let returnButton;
let percentages = [
  {part: '비움 파트', value: 30},
  {part: '채움 파트', value: 50},
  {part: '시작 파트', value: 20}
];

// =================== Ending Credit Stage UI ===================
function setupEndingCreditStageUI() {
  returnButton = createButton('처음으로');
  returnButton.position(width / 2 - 50, height - 80);
  returnButton.style('background', '#0080FF');
  returnButton.style('color', 'white');
  returnButton.style('border', 'none');
  returnButton.style('border-radius', '10px');
  returnButton.style('font-size', '20px');
  returnButton.style('padding', '10px 20px');
  returnButton.style('cursor', 'pointer');
  returnButton.style('font-family', 'inherit');
  returnButton.style('box-shadow', 'none');
  returnButton.hide();
  returnButton.mousePressed(() => {
    hideEndingCreditStageUI();
    currentScene = 'empty';
    showEmptyStageUI();
  });
}

function showEndingCreditStageUI() {
  if (returnButton) returnButton.show();
}

function hideEndingCreditStageUI() {
  if (returnButton) returnButton.hide();
}

function onResizeEndingCreditStage() {
  if (returnButton) {
    returnButton.position(width / 2 - 50, height - 80);
  }
}

// =================== Ending Credit Stage 그리기 함수 ===================
function drawEndingCreditStage() {
  drawGradientSky();
  drawGround();
  drawEndingCredits();
  drawAIPercentage();
}

function drawEndingCredits() {
  fill('#2C3E50');
  textAlign(CENTER, CENTER);
  textSize(40);
  text(' 프로젝트 팀원 ', width/2, 120);

  textSize(28);
  text('개발: 이진우', width/2, 200);
  text('디자인: 전재민', width/2, 275);
  text('기획: 황정민', width/2, 350);
}

function drawAIPercentage() {
  let yPos = 380;
  textSize(32);
  text(' AI 사용 현황', width/2, yPos - 40);
  
  yPos += 40; // AI 사용 현황 타이틀 아래 간격 조정
  percentages.forEach((item, index) => {
    fill(255);
    textSize(20);
    textAlign(LEFT);
    text(item.part, width/2 - 200, yPos + index*60);
    
    noFill();
    stroke(150);
    rect(width/2 - 200, yPos + index*80 + 30, 400, 25);
    
    fill('#FFB366');
    noStroke();
    rect(width/2 - 200, yPos + index*80 + 30, 400 * (item.value / 100), 25);
    
    fill(0);
    textAlign(CENTER);
    text(`${item.value}%`, width/2, yPos + index*80 + 30);
  });
}

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
  bezierVertex(width * 0.2, height - 120, width * 0.8, height - 40, width, height * 0.6);
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}
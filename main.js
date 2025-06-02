// =================== 화면 전환 및 상태 ===================
let currentScene = 'empty'; // 'empty', 'loading', 'fill', 'loadingNewStart', 'newStart', 'ending'
let loadingStartTime = 0;

// =================== Ending Credit Stage 전역 변수 ===================
let returnButton;
let percentages = [
  {part: '비움 파트', value: 30},
  {part: '채움 파트', value: 50},
  {part: '시작 파트', value: 20}
];

// =================== p5.js setup ===================
function setup() {
  createCanvas(windowWidth, windowHeight);

  // Empty Stage 초기화
  setupEmptyStageUI();

  // Fill Stage 초기화
  setupFillStageUI();
  initFillStageClouds();

  // New Start Stage 초기화
  setupNewStartStageUI();

  // Ending Credit Stage 초기화
  setupEndingCreditStageUI(); // Ending Credit Stage 초기화 함수 호출

  // 처음엔 empty UI만 보이게
  showEmptyStageUI();
  hideFillStageUI();
  hideNewStartStageUI();
  hideEndingCreditStageUI(); // Ending Credit Stage UI 숨김
}

// =================== p5.js draw ===================
function draw() {
  if (currentScene === 'empty') {
    drawEmptyStage();
  } else if (currentScene === 'loading') {
    drawLoadingScreen();
    if (millis() - loadingStartTime > 3000) {
      currentScene = 'fill';
      showFillStageUI();
      hideEmptyStageUI();
    }
  } else if (currentScene === 'fill') {
    drawFillStage();
  } else if (currentScene === 'loadingNewStart') { // 새로운 로딩 씬 추가
    drawLoadingNewStartScreen();
    if (millis() - loadingStartTime > 3000) {
      currentScene = 'newStart';
      showNewStartStageUI();
      // 이전 씬 UI는 이미 hideFillStageUI()에 의해 숨겨짐
    }
  } else if (currentScene === 'newStart') {
    drawNewStartStage();
  } else if (currentScene === 'ending') { // ending 씬 추가
    drawEndingCreditStage();
  }
}

// =================== 로딩 화면 ===================
function drawLoadingScreen() {
  background('#f8e7c9');
  fill(90, 70, 40);
  textSize(32);
  textAlign(CENTER, CENTER);
  let dots = '.'.repeat(1 + floor((frameCount / 30) % 3));
  text('흘려보낸 걱정이 증발하는 중' + dots, width / 2, height / 2);
}

// =================== 새로운 로딩 화면 (Fill -> NewStart) ===================
function drawLoadingNewStartScreen() {
  background('#e0f7fa'); // 다른 배경색으로 구분
  fill(50, 100, 150);
  textSize(32);
  textAlign(CENTER, CENTER);
  let dots = '.'.repeat(1 + floor((frameCount / 30) % 3));
  text('새로운 시작을 준비하는 중' + dots, width / 2, height / 2);
}

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
  drawGradientSkyEnding(); // 함수 이름 충돌 방지를 위해 변경
  drawGroundEnding(); // 함수 이름 충돌 방지를 위해 변경
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
  text('디자인: 전재민', width/2, 250);
  text('기획: 황정민', width/2, 300);
}

function drawAIPercentage() {
  let yPos = 380;
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

// Ending Credit Stage 배경 그리기 (하늘)
function drawGradientSkyEnding() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color('#BEE3F7'), color('#FFF6C3'), inter);
    stroke(c);
    line(0, y, width, y);
  }
}

// Ending Credit Stage 땅 그리기
function drawGroundEnding() {
  noStroke();
  fill(198, 229, 177);
  beginShape();
  vertex(0, height - 80);
  bezierVertex(width * 0.2, height - 120, width * 0.8, height - 40, width, height * 0.6);
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

// =================== 반응형 (리사이즈) ===================
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // EmptyStage 위치 재설정
  if (input && button && nextButton) {
    input.position(width / 2 - 170, 180);
    button.position(input.x + input.width, 180);
    nextButton.position(width - 180, height - 100);
  }
  // FillStage 위치 재설정
  if (inputBox && submitButton) {
    inputBox.position(width / 2 - 260, height / 2 + 40);
    submitButton.position(width / 2 + 260, height / 2 + 40);
  }
  // New Start Stage 위치 재설정
  onResizeNewStartStage();

  // Ending Credit Stage 위치 재설정
  onResizeEndingCreditStage(); // Ending Credit Stage 리사이즈 함수 호출
}

// =================== UI show/hide ===================
function showEmptyStageUI() {
  input.show();
  button.show();
  nextButton.hide();
}

function hideEmptyStageUI() {
  input.hide();
  button.hide();
  nextButton.hide();
}

function showFillStageUI() {
  if (inputBox) inputBox.show();
  if (submitButton) submitButton.show();
  if (fillNextButton) fillNextButton.show();
}

function hideFillStageUI() {
  if (inputBox) inputBox.hide();
  if (submitButton) submitButton.hide();
  if (fillNextButton) fillNextButton.hide();
}

function showNewStartStageUI() {
  if (newStartNextButton) newStartNextButton.show();
}

function hideNewStartStageUI() {
  if (newStartNextButton) newStartNextButton.hide();
}

function showEndingCreditStageUI() {
  if (returnButton) returnButton.show();
}

function hideEndingCreditStageUI() {
  if (returnButton) returnButton.hide();
}
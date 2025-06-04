// =================== 화면 전환 및 상태 ===================
let currentScene = 'introduce'; // 'introduce', 'empty', 'loading', 'fill', 'loadingNewStart', 'newStart', 'ending'
let loadingStartTime = 0;

// =================== Ending Credit Stage 전역 변수 ===================
let returnButton;
let percentages = [
  {part: '비움 파트', value: 90},
  {part: '채움 파트', value: 90},
  {part: '시작 파트', value: 90}
];

// =================== p5.js setup ===================
function setup() {
  createCanvas(windowWidth, windowHeight);

  // Introduce Stage 초기화
  setupIntroduceStageUI();

  // Empty Stage 초기화
  setupEmptyStageUI();

  // Fill Stage 초기화
  setupFillStageUI();
  initFillStageClouds();

  // New Start Stage 초기화
  setupNewStartStageUI();

  // Ending Credit Stage 초기화
  setupEndingCreditStageUI();

  // 처음엔 introduce UI만 보이게
  showIntroduceStageUI();
  hideEmptyStageUI();
  hideFillStageUI();
  hideNewStartStageUI();
  hideEndingCreditStageUI();
}

// =================== p5.js draw ===================
function draw() {
  if (currentScene === 'introduce') {
    background(255);
  } else if (currentScene === 'empty') {
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
  } else if (currentScene === 'loadingNewStart') {
    drawLoadingNewStartScreen();
    if (millis() - loadingStartTime > 3000) {
      currentScene = 'newStart';
      showNewStartStageUI();
    }
  } else if (currentScene === 'newStart') {
    drawNewStartStage();
  } else if (currentScene === 'ending') {
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

function drawEndingCredits() {
  fill('#2C3E50');
  textAlign(CENTER, CENTER);
  textSize(40);
  text(' 프로젝트 팀원 ', width/2, 80);

  textSize(28);
  text('개발: 이진우', width/2, 180);
  text('디자인: 전재민', width/2, 260);
  text('기획: 황정민', width/2, 340);

  textSize(20); // 소감
  text('소감 : ANT수업을 통해 코딩과 디자인에 대해서 많은 것을 배울 수 있어서 정말 좋은 강의였다고 생각합니다. 감사합니다.', width/2, 215);
  text('소감 : ', width/2, 295);
  text('소감 : ', width/2, 375);
}

function drawAIPercentage() {
  let yPos = 500;  // 380에서 480으로 변경하여 더 아래로 내림
  textSize(32);
  text(' AI 사용 현황', width/2, yPos);
  
  yPos += 40; // AI 사용 현황 타이틀 아래 간격 조정
  percentages.forEach((item, index) => {
    fill(0);  // 텍스트 색상을 검정색으로 변경
    textSize(20);
    textAlign(LEFT);
    text(item.part, width/2 - 200, yPos + index*60);
    
    // 얇은 회색 테두리 추가
    noFill();
    stroke(150);  // 밝은 회색
    strokeWeight(1);  // 얇은 선
    rect(width/2 - 200, yPos + index*60 + 15, 400, 25);
    
    // 오렌지색 게이지
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

  // Introduce Stage 위치 재설정
  onResizeIntroduceStage();

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
  onResizeEndingCreditStage();
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
  // 버튼 표시 함수 제거
}

function hideEndingCreditStageUI() {
  // 버튼 숨김 함수 제거
}

// =================== 키 입력 처리 ===================
function keyPressed() {
  if (currentScene === 'introduce') {
    if (keyCode === RIGHT_ARROW) {  // RIGHT ARROW key
      hideIntroduceStageUI();
      currentScene = 'empty';
      showEmptyStageUI();
      return false;
    }
  } else if (currentScene === 'empty') {
    if (keyCode === ENTER) {  // ENTER key
      promptWorry();
      return false;
    } else if (keyCode === RIGHT_ARROW) {  // RIGHT ARROW key
      if (nextButton && nextButton.elt.style.display !== 'none') {
        hideEmptyStageUI();
        currentScene = 'loading';
        loadingStartTime = millis();
        return false;
      }
    }
  } else if (currentScene === 'fill') {
    if (keyCode === ENTER) {  // ENTER key
      spawnRain(inputBox.value() || '감사');
      inputBox.value('');
      return false;
    } else if (keyCode === RIGHT_ARROW) {  // RIGHT ARROW key
      if (fillNextButton && fillNextButton.elt.style.display !== 'none') {
        hideFillStageUI();
        loadingStartTime = millis();
        currentScene = 'loadingNewStart';
        return false;
      }
    }
  } else if (currentScene === 'newStart') {
    if (keyCode === RIGHT_ARROW) {  // RIGHT ARROW key
      if (newStartNextButton) {
        hideNewStartStageUI();
        currentScene = 'ending';
        showEndingCreditStageUI();
        return false;
      }
    }
  }
}
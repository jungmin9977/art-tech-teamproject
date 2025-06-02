// =================== 화면 전환 및 상태 ===================
let currentScene = 'empty'; // 'empty', 'loading', 'fill', 'loadingNewStart', 'newStart'
let loadingStartTime = 0;



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

  // 처음엔 empty UI만 보이게
  showEmptyStageUI();
  hideFillStageUI();
  hideNewStartStageUI();
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
  } else if (currentScene === 'loadingNewStart') {
    drawLoadingNewStartScreen();
    if (millis() - loadingStartTime > 3000) {
      currentScene = 'newStart';
      showNewStartStageUI();
    }
  } else if (currentScene === 'newStart') {
    drawNewStartStage();
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
  background('#e0f7fa');
  fill(50, 100, 150);
  textSize(32);
  textAlign(CENTER, CENTER);
  let dots = '.'.repeat(1 + floor((frameCount / 30) % 3));
  text('새로운 시작을 준비하는 중' + dots, width / 2, height / 2);
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

// New Start Stage UI show/hide 함수들은 newStartStage.js에 있습니다.
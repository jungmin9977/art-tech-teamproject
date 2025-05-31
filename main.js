// =================== 화면 전환 및 상태 ===================
let currentScene = 'empty'; // 'empty', 'loading', 'fill'
let loadingStartTime = 0;

// emptyStage용 변수들
let input, button, nextButton;
let waveState = 'idle';
let worryText = '';
let sandY, waveY, waveTargetY, waveStartY;

// =================== p5.js setup ===================
function setup() {
  createCanvas(windowWidth, windowHeight);

  // Empty Stage 초기화
  setupEmptyStageUI();

  // Fill Stage 초기화
  setupFillStageUI();
  initFillStageClouds();

  // 처음엔 empty UI만 보이게
  showEmptyStageUI();
  hideFillStageUI();
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

// =================== 반응형 (리사이즈) ===================
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // EmptyStage 위치 재설정
  if (input && button && nextButton) {
    input.position(width / 2 - 170, 180);
    button.position(input.x + input.width, 180);
    nextButton.position(width / 2 + 140, 180);
  }
  // FillStage 위치 재설정
  if (inputBox && submitButton) {
    inputBox.position(width / 2 - 260, height / 2 + 40);
    submitButton.position(width / 2 + 260, height / 2 + 40);
  }
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
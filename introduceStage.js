// =================== 전역 변수 ===================
let startButton;
let titleText;
let creatorsText;

// =================== 소개 화면 UI ===================
function setupIntroduceStageUI() {
  // 제목 텍스트
  titleText = createElement('h1', '비우고, 채우고, 시작하기');
  titleText.position(width / 2 - 312, height / 3);
  titleText.style('color', '#a67c52');
  titleText.style('font-size', '32px');
  titleText.style('font-family', 'inherit');
  titleText.style('text-align', 'center');
  titleText.style('width', '600px');
  titleText.hide();

  // 제작자 텍스트
  creatorsText = createElement('p', '이진우 전재민 황정민');
  creatorsText.position(width / 2 - 100, height / 2);
  creatorsText.style('color', '#a67c52');
  creatorsText.style('font-size', '20px');
  creatorsText.style('font-family', 'inherit');
  creatorsText.style('text-align', 'center');
  creatorsText.hide();

  // 시작 버튼
  startButton = createButton('시작');
  startButton.position(width - 180, height - 100);
  startButton.style('background', '#0080FF');
  startButton.style('color', 'white');
  startButton.style('border', 'none');
  startButton.style('border-radius', '10px');
  startButton.style('font-size', '20px');
  startButton.style('padding', '11px 15px');
  startButton.style('margin-left', '10px');
  startButton.style('cursor', 'pointer');
  startButton.style('font-family', 'inherit');
  startButton.style('box-shadow', 'none');
  startButton.hide();
  startButton.mousePressed(() => {
    hideIntroduceStageUI();
    currentScene = 'empty';
    showEmptyStageUI();
  });
}

// =================== UI 표시 ===================
function showIntroduceStageUI() {
  if (startButton) startButton.show();
  if (titleText) titleText.show();
  if (creatorsText) creatorsText.show();
}

// =================== UI 숨기기 ===================
function hideIntroduceStageUI() {
  if (startButton) startButton.hide();
  if (titleText) titleText.hide();
  if (creatorsText) creatorsText.hide();
}

// =================== 리사이즈 처리 ===================
function onResizeIntroduceStage() {
  if (startButton) {
    startButton.position(width - 180, height - 100);
  }
  if (titleText) {
    titleText.position(width / 2 - 300, height / 3);
  }
  if (creatorsText) {
    creatorsText.position(width / 2 - 100, height / 2);
  }
}

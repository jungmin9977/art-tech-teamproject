// main.js - 전체 흐름을 관리하는 메인 컨트롤 파일

let stage = "empty";               // 현재 파트: empty, fill, start
let transitioning = false;         // 전환 중인지 여부
let transitionText = "";           // 표시할 전환 텍스트
let transitionStartTime = 0;       // 전환 시작 시간 (ms)
let nextButtonEmpty, nextButtonFill;

function setup() {
  createCanvas(windowWidth, windowHeight);
  setupInputUI();        // fillStage 및 emptyStage에서 UI 생성
  initClouds();           // fillStage용 구름 초기화
  createNextButtons();    // 다음 버튼 생성
  if (stage === 'start') scene = new Scene(); // 시작 파트용 Scene 객체 생성
  sandY = height * 0.6;   // emptyStage용 변수 초기화
  waveStartY = sandY * 0.7;
  waveY = waveStartY;
  waveTargetY = sandY + 100;
}

function draw() {
  background(255);

  // 전환 텍스트 상태일 경우
  if (transitioning) {
    drawTransitionText();
    if (millis() - transitionStartTime > 2000) {
      nextStage();
      transitioning = false;
      if (stage === 'start') scene = new Scene(); // startStage에 진입 시 Scene 생성
    }
    return;
  }

  // 현재 스테이지 그리기
  if (stage === "empty") {
    drawEmptyStage();
    if (nextButtonEmpty) nextButtonEmpty.show();
    if (nextButtonFill) nextButtonFill.hide();
  } else if (stage === "fill") {
    drawFillStage();
    if (nextButtonEmpty) nextButtonEmpty.hide();
    if (nextButtonFill) nextButtonFill.show();
  } else if (stage === "start") {
    drawStartStage();
    if (nextButtonEmpty) nextButtonEmpty.hide();
    if (nextButtonFill) nextButtonFill.hide();
  }
}

// 전환 시작 함수
function startTransition(message) {
  transitionText = message;
  transitionStartTime = millis();
  transitioning = true;
}

// 다음 스테이지로 넘어가기
function nextStage() {
  if (stage === "empty") stage = "fill";
  else if (stage === "fill") stage = "start";
}

// 전환 텍스트 그리기
function drawTransitionText() {
  background(245, 240, 225);
  fill(80, 60, 40);
  textAlign(CENTER, CENTER);
  textSize(28);
  text(transitionText, width / 2, height / 2);
}

function createNextButtons() {
  nextButtonEmpty = createButton("다음");
  nextButtonEmpty.position(width - 200, height - 80);
  nextButtonEmpty.mousePressed(() => {
    startTransition("흘려보낸 걱정이 증발하는 중...");
    nextButtonEmpty.hide();
  });
  nextButtonEmpty.hide();

  nextButtonFill = createButton("다음");
  nextButtonFill.position(width - 200, height - 80);
  nextButtonFill.mousePressed(() => {
    startTransition("새로운 시작을 준비하는 중...");
    nextButtonFill.hide();
  });
  nextButtonFill.hide();
}

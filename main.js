// =================== 화면 전환 및 상태 ===================
let currentScene = 'introduce'; // 'introduce', 'empty', 'evaporation', 'loading', 'fill', 'loadingNewStart', 'newStart', 'ending'
let loadingStartTime = 0;

// =================== Ending Credit Stage 전역 변수 ===================
let returnButton;
let percentages = [
  {part: '비움 파트', value: 70},
  {part: '채움 파트', value: 60},
  {part: '시작 파트', value: 70}
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

  // Loading New Start Screen 초기화
  setupLoadingNewStartScreen();

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
  } 
    else if (currentScene === 'evaporation') {
    drawEvaporationStage();
  } else if (currentScene === 'loading') {
    drawLoadingScreen();
    if (millis() - loadingStartTime > 5000) {
      currentScene = 'fill';
      showFillStageUI();
      hideEmptyStageUI();
    }
  } else if (currentScene === 'fill') {
    drawFillStage();
  } else if (currentScene === 'loadingNewStart') {
    drawLoadingNewStartScreen();
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
let loadingFlowers = [];
const FLOWER_THRESHOLD = 60;  // 30에서 60으로 증가
let raindrops = [];

// 초기 새싹 위치 설정
const INITIAL_SPROUTS = 60;  // 30에서 60으로 증가
const SPROUT_POSITIONS = [];

class Raindrop {
  constructor(x) {
    this.x = x + random(-150, 150);
    this.y = 0;
    this.speed = random(5, 10);
    this.length = random(10, 20);
  }
  
  update() {
    this.y += this.speed;
  }
  
  display() {
    stroke(100, 150, 255, 150);
    strokeWeight(2);
    line(this.x, this.y, this.x, this.y + this.length);
  }
  
  isOffScreen() {
    return this.y > height;
  }
}

class LoadingFlower {
  constructor(x, y) {
    this.position = createVector(x, height);
    this.targetY = y;
    this.stemLength = 0;
    this.maxStemLength = this.position.y - this.targetY;
    this.stemGrowthRate = 0.3;
    this.bloomed = false;
    this.numPetals = int(random(5, 12));
    this.petalGrowth = 0;
    this.maxPetalGrowth = random(5, 10);
    this.petalColor = color(random(200, 255), random(100, 200), random(100, 200));
    this.leafSize = random(5, 10);
    this.leafAngle = random(-PI/4, PI/4);
    this.rainCount = 0;
    this.rainThreshold = 10;
    this.hasReceivedRain = false;
  }
  
  grow() {
    if (!this.hasReceivedRain) return;
    
    if (!this.bloomed) {
      // 줄기 성장
      this.stemLength += this.stemGrowthRate;
      if (this.stemLength >= this.maxStemLength) {
        this.bloomed = true;
      }
    } else {
      // 꽃이 피어남 - 성장 속도 감소
      if (this.petalGrowth < this.maxPetalGrowth) {
        this.petalGrowth += 0.02;
      }
    }
  }
  
  checkRain(raindrops) {
    for (let drop of raindrops) {
      if (abs(drop.x - this.position.x) < 50 && 
          drop.y > this.position.y - 100 && 
          drop.y < this.position.y) {
        this.rainCount++;
        this.hasReceivedRain = true;
        
        if (this.rainCount >= this.rainThreshold) {
          // 비를 충분히 맞으면 꽃이 더 빨리 피어남 - 성장 속도 감소
          if (this.bloomed && this.petalGrowth < this.maxPetalGrowth) {
            this.petalGrowth += 0.05;
          }
        }
      }
    }
  }
  
  display() {
    push();
    translate(this.position.x, this.position.y);
    
    // 줄기
    stroke(34, 139, 34);
    strokeWeight(2);
    line(0, 0, 0, -this.stemLength);
    
    // 잎
    if (this.stemLength > 20) {
      noStroke();
      fill(34, 139, 34);
      push();
      translate(0, -this.stemLength * 0.6);
      rotate(this.leafAngle);
      ellipse(0, 0, this.leafSize, this.leafSize * 0.6);
      pop();
    }
    
    if (this.bloomed) {
      translate(0, -this.stemLength);
      noStroke();
      fill(this.petalColor);
      for (let i = 0; i < this.numPetals; i++) {
        let angle = map(i, 0, this.numPetals, 0, TWO_PI);
        push();
        rotate(angle + frameCount * 0.01);
        ellipse(0, this.petalGrowth / 2, this.petalGrowth, this.petalGrowth * 1.2);
        pop();
      }
      fill(255, 204, 0);
      ellipse(0, 0, this.maxPetalGrowth / 2);
    } else {
      // 새싹 표시
      translate(0, -this.stemLength);
      noStroke();
      fill(34, 139, 34);
      ellipse(0, 0, 10, 15);
    }
    pop();
  }
  
  isFullyBloomed() {
    return this.petalGrowth >= this.maxPetalGrowth;
  }
}

function setupLoadingNewStartScreen() {
  // 초기 새싹 위치 설정
  for (let i = 0; i < INITIAL_SPROUTS; i++) {
    let x = random(width * 0.05, width * 0.95);
    // 땅 위에만 랜덤하게 배치 (height - 80에서 height - 20 사이)
    let y = random(height - 80, height - 20);
    SPROUT_POSITIONS.push({x, y});
    loadingFlowers.push(new LoadingFlower(x, y));
  }
}

function drawLoadingNewStartScreen() {
  // fillStage와 동일한 배경
  drawGradientSky();
  drawGround();
  
  // 비 생성 (마우스 포인터를 따라)
  if (mouseIsPressed && frameCount % 2 === 0) {
    for (let i = 0; i < 5; i++) {
      raindrops.push(new Raindrop(mouseX));
    }
  }
  
  // 비 업데이트 및 그리기
  for (let i = raindrops.length - 1; i >= 0; i--) {
    raindrops[i].update();
    raindrops[i].display();
    if (raindrops[i].isOffScreen()) {
      raindrops.splice(i, 1);
    }
  }
  
  // 꽃 업데이트 및 그리기
  for (let i = loadingFlowers.length - 1; i >= 0; i--) {
    loadingFlowers[i].grow();
    loadingFlowers[i].checkRain(raindrops);
    loadingFlowers[i].display();
  }
  
  // 안내 텍스트
  fill(50, 100, 150);
  textSize(32);
  textAlign(CENTER, CENTER);
  let dots = '.'.repeat(1 + floor((frameCount / 30) % 3));
  text('나만의 정원을 가꾸는 중' + dots, width / 2, height / 2);
  
  // 마우스 클릭 안내 텍스트
  textSize(20);
  fill(34, 139, 34);  // 녹색으로 변경
  text('마우스를 클릭하면 비가 내려 꽃이 자랍니다', width / 2, height / 2 + 40);
  
  // 모든 꽃이 완전히 피었을 때만 다음 화면으로 전환
  let allFlowersBloomed = loadingFlowers.every(flower => flower.isFullyBloomed());
  if (allFlowersBloomed) {
    currentScene = 'newStart';
    showNewStartStageUI();
  }
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
  text('이진우 : ', width/2, 180);
  text('전재민', width/2, 260);
  text('황정민', width/2, 340);

  textSize(20); // 소감
  text('소감 : ANT수업을 통해 코딩과 디자인에 대해서 많은 것을 배울 수 있어서 정말 좋은 강의였다고 생각합니다. 감사합니다.', width/2, 215);
  text('소감 :  단순히 코딩을 하는것이 아닌 무언가를 직접 만들어본다는 느낌이 들어 더욱 능동적이게 수업에 참여하게 되고 많은 것을 배워가게 되는거 같습니다.', width/2, 295);
  text('소감 : 개발자들의 협업과정을 조금이나마 경험해보면서 협업의 중요성을 느낄 수 있는 시간이였습니다.', width/2, 375);
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
    // ... existing code ...
  } else if (currentScene === 'empty') {
    if (keyCode === ENTER) {  // ENTER key
      promptWorry();
      return false;
    }
  } else if (currentScene === 'fill') {
    if (keyCode === ENTER) {  // ENTER key
      spawnSeed(inputBox.value() || '감사');
      inputBox.value('');
      return false;
    }
  } else if (currentScene === 'newStart') {
    // ... existing code ...
  }
}

// evaporation.js

let evaporationTexts = [];
let evaporationNextButton;
let evaporationStageActive = false;
let evaporationDraggingIdx = -1;
let evaporationClouds = [];
let cloudY = Math.min(...evaporationClouds.map(c => c.y));
let evaporationY = cloudY + 120;


function showEvaporationStageUI() {
  evaporationStageActive = true;
  evaporationTexts = [];
  initEvaporationClouds(); // 구름 초기화
  let startY = height - 120;
  let gap = 36;
  for (let i = 0; i < enteredTexts.length; i++) {
    evaporationTexts.push({
      text: enteredTexts[i],
      x: 40,
      y: height - 120 + i * 36,
      targetY: height - 120 + i * 36, // 추가!
      isDragging: false,
      offsetX: 0,
      offsetY: 0,
      isEvaporating: false,
      alpha: 255,
      yOffset: 0
    });
  }
  
  if (!evaporationNextButton) {
    evaporationNextButton = createButton('다음');
    evaporationNextButton.position(width - 180, height - 100);
    evaporationNextButton.style('background', '#0080FF');
    evaporationNextButton.style('color', 'white');
    evaporationNextButton.style('border', 'none');
    evaporationNextButton.style('border-radius', '10px');
    evaporationNextButton.style('font-size', '20px');
    evaporationNextButton.style('padding', '11px 15px');
    evaporationNextButton.style('margin-left', '10px');
    evaporationNextButton.style('cursor', 'pointer');
    evaporationNextButton.style('font-family', 'inherit');
    evaporationNextButton.style('box-shadow', 'none');
    evaporationNextButton.hide();
    evaporationNextButton.mousePressed(() => {
      hideEvaporationStageUI();
      currentScene = 'loading';
      loadingStartTime = millis();
    });
  }
  evaporationNextButton.hide();
}

function hideEvaporationStageUI() {
  evaporationStageActive = false;
  if (evaporationNextButton) evaporationNextButton.hide();
}

function drawEvaporationStage() {
    background('#aee6f9');
    drawEvaporationClouds();
    let cloudY = Math.min(...evaporationClouds.map(c => c.y));
    let evaporationY = cloudY + 120;     // <<<< 여기서 오프셋 크게!
    drawEvaporationBoundary(evaporationY);
    drawSandEvaporation();
    drawEvaporationGuideText();
    drawEvaporationTexts();
    updateEvaporationAnimations();
    if (evaporationTexts.length === 0) {
      evaporationNextButton.show();
    } else {
      evaporationNextButton.hide();
    }
  }
  

  function drawEvaporationTexts() {
    textSize(24);
    textAlign(LEFT, CENTER);
    for (let t of evaporationTexts) {
      if (!t.isDragging && !t.isEvaporating) {
        t.y += (t.targetY - t.y) * 0.25;
        if (abs(t.targetY - t.y) < 1) t.y = t.targetY; // 스냅
      }
      if (!t.isEvaporating) {
        fill(90, 70, 40, 255);
        text(t.text, t.x, t.y);
      }
    }
    for (let t of evaporationTexts) {
      if (t.isEvaporating) {
        fill(90, 70, 40, t.alpha);
        text(t.text, t.x, t.y + t.yOffset);
      }
    }
  }
  
  function updateEvaporationAnimations() {
    for (let i = evaporationTexts.length - 1; i >= 0; i--) {
      let t = evaporationTexts[i];
      if (t.isEvaporating) {
        t.alpha -= 8;
        t.yOffset -= 2;
        if (t.alpha <= 0) {
          // 증발한 텍스트의 y위치 저장
          let removedY = t.targetY;
          evaporationTexts.splice(i, 1);
          // 아래에 있는 텍스트들의 targetY를 한 칸씩 위로 올림
          for (let j = i; j < evaporationTexts.length; j++) {
            evaporationTexts[j].targetY -= 36;
          }
        }
      }
    }
  }

function drawEvaporationGuideText() {
  fill(90, 70, 40);
  textSize(24);
  textAlign(CENTER, CENTER);
  text('아래의 고민을 하늘로 드래그해서 증발시켜 보세요!', width/2, 80);
}

function drawSandEvaporation() {
  noStroke();
  fill(255, 245, 220);
  beginShape();
  vertex(0, sandY);
  for (let x = 0; x <= width; x += 20) {
    let y = sandY + sin(x * 0.004 + frameCount * 0.003) * 8 + cos(x * 0.008) * 6;
    curveVertex(x, y);
  }
  vertex(width, sandY);
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

// 구름 객체 생성 함수
function createCloud(x, y, w, speed) {
    return {
      x: x,
      y: y,
      w: w,
      h: w * 0.6,
      speed: speed
    };
  }
  
  // 구름 이동 함수
  function moveCloud(cloud) {
    cloud.x += cloud.speed;
    if (cloud.x - cloud.w / 2 > width) {
      cloud.x = -cloud.w / 2;
    }
  }
  
  // 구름 표시 함수
  function displayCloud(cloud) {
    noStroke();
    fill(255, 255, 255, 230);
    ellipse(cloud.x, cloud.y, cloud.w, cloud.h);
    ellipse(cloud.x + cloud.w * 0.3, cloud.y + cloud.h * 0.1, cloud.w * 0.7, cloud.h * 0.7);
    ellipse(cloud.x - cloud.w * 0.3, cloud.y + cloud.h * 0.2, cloud.w * 0.6, cloud.h * 0.6);
  }
  
  // 구름 초기화 함수
  function initEvaporationClouds() {
    evaporationClouds = [];
    for (let i = 0; i < 4; i++) {
      evaporationClouds.push(createCloud(random(width), random(50, 150), random(100, 180), random(0.3, 1.0)));
    }
  }
  
  // 구름 그리기 함수
  function drawEvaporationClouds() {
    for (let cloud of evaporationClouds) {
      moveCloud(cloud);
      displayCloud(cloud);
    }
  }

  function drawEvaporationBoundary(y) {
    stroke('#7ec6e3');    // 하늘색 계열, 구분되는 색
    strokeWeight(3);
    line(0, y, width, y);
    noStroke();
  }
  

// 드래그 이벤트
function mousePressed() {
  if (!evaporationStageActive) return;
  for (let i = 0; i < evaporationTexts.length; i++) {
    let t = evaporationTexts[i];
    if (t.isEvaporating) continue;
    let w = textWidth(t.text) + 20;
    let h = 32;
    if (mouseX > t.x && mouseX < t.x + w && mouseY > t.y - h/2 && mouseY < t.y + h/2) {
      evaporationDraggingIdx = i;
      t.isDragging = true;
      t.offsetX = mouseX - t.x;
      t.offsetY = mouseY - t.y;
      return;
    }
  }
}

function mouseDragged() {
  if (!evaporationStageActive) return;
  if (evaporationDraggingIdx !== -1) {
    let t = evaporationTexts[evaporationDraggingIdx];
    t.x = mouseX - t.offsetX;
    t.y = mouseY - t.offsetY;
  }
}

function mouseReleased() {
  if (!evaporationStageActive) return;
  if (evaporationDraggingIdx !== -1) {
    let t = evaporationTexts[evaporationDraggingIdx];
    t.isDragging = false;
    let cloudY = Math.min(...evaporationClouds.map(c => c.y));
    let evaporationY = cloudY + 120;
    if (t.y < evaporationY) {
      t.isEvaporating = true;
    } else {
      t.x = 40;
      t.targetY = height - 120 + evaporationDraggingIdx * 36; // targetY로 복귀
    }
    evaporationDraggingIdx = -1;
  }
}

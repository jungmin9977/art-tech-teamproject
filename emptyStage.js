// =================== Empty Stage UI/모래사장 ===================
function setupEmptyStageUI() {
  sandY = height * 0.6;
  waveStartY = sandY * 0.7;
  waveY = waveStartY;
  waveTargetY = sandY + 100;

  // 입력창
  input = createInput('');
  input.position(width / 2 - 170, 180);
  input.size(300);
  input.attribute('placeholder', '');
  input.style('background', '#fdf3df');
  input.style('border', '2px solid #f3e0b7');
  input.style('border-top-left-radius', '10px');
  input.style('border-bottom-left-radius', '10px');
  input.style('border-top-right-radius', '0px');
  input.style('border-bottom-right-radius', '0px');
  input.style('padding', '14px 10px');
  input.style('font-size', '20px');
  input.style('color', '#a67c52');
  input.style('outline', 'none');
  input.style('box-shadow', 'none');
  input.style('box-sizing', 'border-box');
  input.input(() => updateNextButton());
  input.hide();

  // 비우기 버튼
  button = createButton('비우기');
  button.position(input.x + input.width, 180);
  button.style('background', 'linear-gradient(90deg, #ffb347 0%, #ff9900 100%)');
  button.style('color', 'white');
  button.style('border', '2px solid #f3e0b7');
  button.style('border-top-right-radius', '10px');
  button.style('border-bottom-right-radius', '10px');
  button.style('border-top-left-radius', '0px');
  button.style('border-bottom-left-radius', '0px');
  button.style('font-size', '20px');
  button.style('padding', '11px 15px');
  button.style('margin-left', '-4px');
  button.style('cursor', 'pointer');
  button.style('font-family', 'inherit');
  button.style('box-shadow', 'none');
  button.style('box-sizing', 'border-box');
  button.mousePressed(promptWorry);
  button.hide();

  // 다음 버튼
  nextButton = createButton('다음');
  nextButton.position(width - 180 , height - 100);
  nextButton.style('background', '#0080FF');
  nextButton.style('color', 'white');
  nextButton.style('border', 'none');
  nextButton.style('border-radius', '10px');
  nextButton.style('font-size', '20px');
  nextButton.style('padding', '11px 15px');
  nextButton.style('margin-left', '10px');
  nextButton.style('cursor', 'pointer');
  nextButton.style('font-family', 'inherit');
  nextButton.style('box-shadow', 'none');
  nextButton.hide();
  nextButton.mousePressed(() => {
    hideEmptyStageUI();
    currentScene = 'loading';
    loadingStartTime = millis();
  });
}

function updateNextButton() {
  if (waveState === 'idle' && worryText === '' && input.value().trim().length === 0) {
    nextButton.show();
  } else {
    nextButton.hide();
  }
}

function promptWorry() {
  if (waveState !== 'idle') return;
  let txt = input.value();
  if (txt.trim().length > 0) {
    worryText = txt;
    input.value('');
    waveState = 'down';
    updateNextButton();
  }
}

function handleWaveAnimation() {
  const speed = 4;
  if (waveState === 'down') {
    if (waveY < waveTargetY) {
      waveY += speed;
      if (waveY >= waveTargetY) {
        waveY = waveTargetY;
        worryText = '';
        setTimeout(() => { waveState = 'up'; }, 600);
      }
    }
  } else if (waveState === 'up') {
    if (waveY > waveStartY) {
      waveY -= speed;
      if (waveY <= waveStartY) {
        waveY = waveStartY;
        waveState = 'idle';
        updateNextButton();
      }
    }
  }
}

function drawGuideText() {
  fill(90, 70, 40);
  textSize(24);
  textAlign(CENTER, CENTER);
  text(
    '마음에 남아있는 고민이나 걱정, 불안, 슬픔 등 \n 비우고 싶은 감정을 솔직하게 적어보세요.',
    width / 2, 120
  );
}

function drawWave(yBase) {
  noStroke();
  for (let i = 0; i < 3; i++) {
    let amp = 30 - i * 8;
    let col = color(173 - i * 30, 216 - i * 30, 230 - i * 60, 120 - i * 30);
    drawWaveLayer(yBase + i * 18, col, amp, 0.008 + i * 0.002, 0.01 + i * 0.002);
  }
}

function drawWaveLayer(yBase, col, amp, freq, speed) {
  fill(col);
  beginShape();
  vertex(0, 0);
  for (let x = 0; x <= width; x += 8) {
    let y = yBase + sin((x * freq) + frameCount * speed) * amp;
    curveVertex(x, y);
  }
  vertex(width, 0);
  endShape(CLOSE);
}

function drawSand() {
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

  fill(238, 214, 175, 180);
  beginShape();
  vertex(0, sandY + 18);
  for (let x = 0; x <= width; x += 20) {
    let y = sandY + 18 + sin(x * 0.004 + frameCount * 0.003) * 8 + cos(x * 0.008) * 6;
    curveVertex(x, y);
  }
  vertex(width, sandY + 18);
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);

  fill(250, 224, 180);
  rect(0, sandY + 18, width, height - sandY - 18);
}

function drawWorryText() {
  fill(90, 70, 40, 220);
  textSize(28);
  textAlign(CENTER, CENTER);
  text(worryText, width / 2, sandY + 100);
}

// empty 화면 전체 그리기
function drawEmptyStage() {
  background('#aee6f9');
  drawSand();
  drawWave(waveY);
  drawGuideText();
  if (worryText && waveState !== 'idle') drawWorryText();
  handleWaveAnimation();
  updateNextButton();
}
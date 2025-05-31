// emptyStage.js - 비움: 고민을 파도에 흘려보내기

let sandY;
let waveY;
let waveTargetY;
let waveStartY;
let waveState = 'idle'; // 'idle', 'down', 'up'
let worryText = '';
let input, button;

function drawEmptyStage() {
  background('#aee6f9');
  drawSand();
  drawWave(waveY);
  drawGuideText();

  if (worryText && waveState !== 'idle') {
    drawWorryText();
  }
  handleWaveAnimation();
}

function drawGuideText() {
  fill(90, 70, 40);
  textSize(24);
  textAlign(CENTER, CENTER);
  text(
    '마음에 남아있는 고민이나 걱정, 불안, 슬픔 등\n비우고 싶은 것을 솔직하게 적어주세요.',
    width / 2,
    120
  );
}

function setupInputUI() {
  input = createInput('');
  input.position(width / 2 - 170, 180);
  input.size(300);
  input.style('background', '#fdf3df');
  input.style('border', '2px solid #f3e0b7');
  input.style('border-radius', '10px 0 0 10px');
  input.style('padding', '14px 10px');
  input.style('font-size', '20px');
  input.style('color', '#a67c52');
  input.style('outline', 'none');
  input.style('box-sizing', 'border-box');

  button = createButton('비우기');
  button.position(input.x + input.width, 180);
  button.style('background', 'linear-gradient(90deg, #ffb347 0%, #ff9900 100%)');
  button.style('color', 'white');
  button.style('border', '2px solid #f3e0b7');
  button.style('border-radius', '0 10px 10px 0');
  button.style('font-size', '20px');
  button.style('padding', '11px 15px');
  button.style('margin-left', '-4px');
  button.style('cursor', 'pointer');
  button.mousePressed(promptWorry);
}

function keyPressed() {
  if (keyCode === ENTER) promptWorry();
}

function promptWorry() {
  if (waveState !== 'idle') return;
  let txt = input.value();
  if (txt.trim().length > 0) {
    worryText = txt;
    input.value('');
    waveState = 'down';
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
        setTimeout(() => {
          waveState = 'up';
        }, 600);
      }
    }
  } else if (waveState === 'up') {
    if (waveY > waveStartY) {
      waveY -= speed;
      if (waveY <= waveStartY) {
        waveY = waveStartY;
        waveState = 'idle';
      }
    }
  }
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
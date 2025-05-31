// fillStage.js - 채움: 텍스트 비와 새싹 피우기

let inputBox, submitButton;
let rains = [];
let sprouts = [];
let clouds = [];

function drawFillStage() {
  drawGradientSky();
  drawClouds();
  drawPromptText();
  updateRain();
  drawSprouts();
  drawGround();
}

function setupInputUI() {
  inputBox = createInput('');
  inputBox.size(500, 50);
  inputBox.position(width / 2 - 260, height / 2 + 40);
  inputBox.style('font-size', '24px');
  inputBox.style('border-radius', '12px');
  inputBox.style('border', '2px solid #F6E2B3');
  inputBox.style('background', '#FFF6C3');
  inputBox.style('padding', '0 16px');

  submitButton = createButton('채우기');
  submitButton.size(140, 50);
  submitButton.position(width / 2 + 260, height / 2 + 40);
  submitButton.style('font-size', '28px');
  submitButton.style('background', '#FFB366');
  submitButton.style('color', '#fff');
  submitButton.style('border', 'none');
  submitButton.style('border-radius', '14px');
  submitButton.style('box-shadow', '2px 2px 0 #e6a04c');

  submitButton.mousePressed(() => {
    spawnRain(inputBox.value() || '감사');
  });
}

function spawnRain(text) {
  for (let i = 0; i < 25; i++) {
    rains.push({
      text: text,
      x: random(width),
      y: random(-100, 0),
      size: random(16, 28),
      speed: random(1.5, 3)
    });
  }
}

function updateRain() {
  for (let i = rains.length - 1; i >= 0; i--) {
    let drop = rains[i];
    fill(60, 100, 200);
    textSize(drop.size);
    text(drop.text, drop.x, drop.y);
    drop.y += drop.speed;

    if (drop.y > height - 80) {
      addSprout(drop.x, height - 80);
      rains.splice(i, 1);
    }
  }
}

function addSprout(x, y) {
  sprouts.push(new Sprout(x, y));
}

function drawSprouts() {
  for (let s of sprouts) {
    s.grow();
    s.display();
  }
}

function drawPromptText() {
  noStroke();
  fill('#7C5E3C');
  textAlign(CENTER, CENTER);
  textSize(30);
  text('이제 비워진 마음에\n새롭게 채우고 싶은 것들을 적어보세요.', width / 2, 100);
  textSize(20);
  text('감사한 일, 행복했던 순간, 앞으로의 다짐 등을 떠올려 입력해보세요.', width / 2, 150);
}

class Sprout {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.scaleVal = 0.1;
    this.maxScale = random(0.8, 1.2);
    this.angle = random(-PI / 10, PI / 10);
    this.leafColor = color(random(90, 140), random(180, 230), random(90, 140));
    this.leafSize = random(20, 35);
    this.stemLength = random(25, 45);
  }

  grow() {
    if (this.scaleVal < this.maxScale) {
      this.scaleVal += 0.02;
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    scale(this.scaleVal);
    rotate(this.angle);
    stroke(80, 150, 80);
    strokeWeight(5);
    line(0, 0, 0, -this.stemLength);
    noStroke();
    fill(this.leafColor);
    ellipse(-this.leafSize / 2, -this.stemLength - 5, this.leafSize, this.leafSize / 1.5);
    ellipse(this.leafSize / 2, -this.stemLength - 5, this.leafSize, this.leafSize / 1.5);
    pop();
  }
}

function initClouds() {
  for (let i = 0; i < 4; i++) {
    clouds.push(new Cloud(random(width), random(50, 200), random(100, 180), random(0.3, 1.0)));
  }
}

function drawClouds() {
  for (let cloud of clouds) {
    cloud.move();
    cloud.display();
  }
}

class Cloud {
  constructor(x, y, w, speed) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = w * 0.6;
    this.speed = speed;
  }

  move() {
    this.x += this.speed;
    if (this.x - this.w / 2 > width) {
      this.x = -this.w / 2;
    }
  }

  display() {
    noStroke();
    fill(255, 255, 255, 230);
    ellipse(this.x, this.y, this.w, this.h);
    ellipse(this.x + this.w * 0.3, this.y + this.h * 0.1, this.w * 0.7, this.h * 0.7);
    ellipse(this.x - this.w * 0.3, this.y + this.h * 0.2, this.w * 0.6, this.h * 0.6);
  }
}

function drawGradientSky() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color('#BEE3F7'), color('#FFF6C3'), inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function drawGround() {
  noStroke();
  fill(198, 229, 177);
  beginShape();
  vertex(0, height - 80);
  bezierVertex(width * 0.2, height - 120, width * 0.8, height - 40, width, height - 100);
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

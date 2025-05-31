// newStartStage.js - 시작: 무지개와 햇살로 마무리 감성 연출

let scene;

function drawStartStage() {
  scene.draw();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  scene = new Scene();
}

class Scene {
  constructor() {
    this.sky = new Sky();
    this.sun = new Sun();
    this.clouds = new Clouds();
    this.rainbow = new Rainbow();
    this.hills = new Hills();
    this.bushes = new Bushes();
    this.grasses = new Grasses();
    this.text = new Text();
  }

  draw() {
    this.sky.draw();
    this.sun.draw();
    this.clouds.draw();
    this.rainbow.draw();
    this.hills.draw();
    this.bushes.draw();
    this.grasses.draw();
    this.text.draw();
  }
}

// 아래 클래스들(Sky, Sun, Clouds, Rainbow, Hills, Bushes, Grasses, Text)은 위와 동일하게 구현
// 필요 시 별도 분할 가능 (현재 구조에서는 모두 포함됨)

// 예: Sky 클래스
class Sky {
  constructor() {
    this.colors = {
      top: color(90, 180, 255),
      middle: color(180, 230, 255),
      bottom: color(255, 255, 255)
    };
  }

  draw() {
    for (let y = 0; y < height; y++) {
      let c;
      if (y < height * 0.5) {
        c = lerpColor(this.colors.top, this.colors.middle, y / (height * 0.5));
      } else {
        c = lerpColor(this.colors.middle, this.colors.bottom, (y - height * 0.5) / (height * 0.5));
      }
      stroke(c);
      line(0, y, width, y);
    }
  }
}

// 나머지 클래스(Sun, Clouds, Rainbow, Hills, Bushes, Grasses, Text)도 원본 그대로 포함하여 완성 가능
// =================== 전역 변수 ===================
let skyColors, sun, clouds, rainbow, hills, bushes, grasses, textState;

// =================== p5.js setup ===================
function setup() {
  createCanvas(windowWidth, windowHeight);
  initSky();
  initSun();
  initClouds();
  initRainbow();
  initHills();
  initBushes();
  initGrasses();
  initTextState();
}

// =================== p5.js draw ===================
function draw() {
  drawSky();
  drawSun();
  drawClouds();
  drawRainbow();
  drawHills();
  drawBushes();
  drawGrasses();
  drawTextState();
}

// =================== Sky ===================
function initSky() {
  skyColors = {
    top: color(90, 180, 255),
    middle: color(180, 230, 255),
    bottom: color(255, 255, 255)
  };
}
function drawSky() {
  for (let y = 0; y < height; y++) {
    let c;
    if (y < height * 0.5) {
      c = lerpColor(skyColors.top, skyColors.middle, y / (height * 0.5));
    } else {
      c = lerpColor(skyColors.middle, skyColors.bottom, (y - height * 0.5) / (height * 0.5));
    }
    stroke(c);
    line(0, y, width, y);
  }
}

// =================== Sun ===================
function initSun() {
  sun = {
    x: width * 0.85,
    y: height * 0.2,
    rays: Array.from({length: 16}, (_, i) => ({
      angle: (PI / 8) * i,
      length: random(120, 180),
      speed: random(0.001, 0.002)
    }))
  };
}
function drawSun() {
  push();
  translate(sun.x, sun.y);
  noStroke();
  // 햇살
  fill(255, 255, 200, 120);
  for (let ray of sun.rays) {
    ray.angle += ray.speed * 2;
    push();
    rotate(ray.angle);
    rect(0, -5, ray.length, 10, 10);
    pop();
  }
  // 태양
  fill(255, 255, 220, 255);
  ellipse(0, 0, 80, 80);
  fill(255, 255, 220, 80);
  ellipse(0, 0, 120, 120);
  pop();
}

// =================== Clouds ===================
function initClouds() {
  clouds = {
    clouds: Array.from({length: 4}, () => ({
      x: random(width),
      y: random(50, 150),
      size: random(70, 120),
      speed: random(0.1, 0.2)
    })),
    offset: 0
  };
}
function drawClouds() {
  noStroke();
  clouds.offset += 0.01;
  for (let cloud of clouds.clouds) {
    push();
    translate(
      cloud.x + sin(clouds.offset + cloud.x * 0.01) * 10,
      cloud.y + cos(clouds.offset + cloud.y * 0.01) * 5
    );
    fill(255, 255, 255, 230);
    ellipse(0, 0, cloud.size * 1.2, cloud.size * 0.6);
    ellipse(cloud.size * 0.3, cloud.size * 0.1, cloud.size, cloud.size * 0.5);
    ellipse(-cloud.size * 0.3, cloud.size * 0.1, cloud.size, cloud.size * 0.5);
    pop();
    cloud.x += cloud.speed;
    if (cloud.x > width + cloud.size) cloud.x = -cloud.size;
  }
}

// =================== Rainbow ===================
function initRainbow() {
  rainbow = {
    height: 0,
    colors: [
      color(255, 170, 170, 180),
      color(255, 210, 160, 180),
      color(255, 240, 150, 180),
      color(170, 230, 170, 180),
      color(170, 220, 230, 180),
      color(200, 180, 230, 180)
    ]
  };
}
function drawRainbow() {
  let centerX = width / 2;
  let bottomY = height * 0.75;
  let radius = 400;
  noFill();
  for (let i = 0; i < rainbow.colors.length; i++) {
    stroke(rainbow.colors[i]);
    strokeWeight(25);
    strokeCap(ROUND);
    arc(
      centerX,
      bottomY - rainbow.height,
      radius + i * 25,
      radius + i * 25,
      PI, TWO_PI
    );
  }
  if (rainbow.height < 30) rainbow.height += 0.15;
}

// =================== Hills ===================
function initHills() {
  hills = {
    colors: [
      color(120, 200, 120),
      color(160, 220, 140),
      color(200, 240, 170),
      color(230, 255, 200)
    ]
  };
}
function drawHills() {
  noStroke();
  for (let i = hills.colors.length - 1; i >= 0; i--) {
    fill(hills.colors[i]);
    beginShape();
    for (let x = 0; x <= width; x += 10) {
      let y = height * 0.55 + i * 25 + sin(x * 0.008 + i) * (18 + i * 4);
      vertex(x, y);
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
  }
}

// =================== Bushes ===================
function initBushes() {
  bushes = {
    sprouts: Array.from({length: 8}, () => ({
      x: random(width * 0.2, width * 0.8),
      y: random(height * 0.6, height * 0.7),
      size: random(15, 25),
      sway: random(0.02, 0.04),
      offset: random(TWO_PI),
      growth: random(0.5, 1.5),
      color: color(100, 200, 100, 200)
    }))
  };
}
function drawBushes() {
  for (let sprout of bushes.sprouts) {
    let sway = sin(frameCount * sprout.sway + sprout.offset) * 5;
    let growth = sin(frameCount * 0.02 + sprout.offset) * 2;
    push();
    translate(sprout.x + sway, sprout.y);
    rotate(sin(frameCount * 0.02 + sprout.offset) * 0.2);
    // 줄기
    stroke(100, 180, 100, 180);
    strokeWeight(2);
    line(0, 0, 0, -sprout.size - growth);
    // 잎
    noStroke();
    fill(sprout.color);
    ellipse(0, -sprout.size - growth, sprout.size + growth, sprout.size * 0.8 + growth);
    pop();
  }
}

// =================== Grasses ===================
function initGrasses() {
  grasses = {
    grasses: Array.from({length: 60}, () => ({
      x: random(width),
      y: random(height * 0.7, height * 0.98),
      h: random(15, 35),
      sway: random(0.01, 0.03),
      offset: random(TWO_PI)
    }))
  };
}
function drawGrasses() {
  for (let grass of grasses.grasses) {
    let sway = sin(frameCount * grass.sway + grass.offset) * 4;
    stroke(110, 180, 110, 180);
    strokeWeight(2);
    line(grass.x, grass.y, grass.x + sway, grass.y - grass.h);
  }
}

// =================== Text ===================
function initTextState() {
  textState = {
    opacity1: 0,
    opacity2: 0,
    delay: 0,
    isFirstLineComplete: false
  };
}
function drawTextState() {
  // 첫 번째 줄
  if (!textState.isFirstLineComplete) {
    textState.opacity1 += 2;
    if (textState.opacity1 >= 255) {
      textState.opacity1 = 255;
      textState.isFirstLineComplete = true;
    }
  } else {
    textState.delay += 1;
    if (textState.delay > 45 && textState.opacity2 < 255) {
      textState.opacity2 += 2;
      if (textState.opacity2 > 255) textState.opacity2 = 255;
    }
  }
  textAlign(CENTER);
  noStroke();
  // 첫 번째 줄
  fill(50, 120, 50, textState.opacity1);
  textSize(28);
  textStyle(BOLD);
  text("당신의 마음에도 새로운 시작이 찾아왔어요!", width / 2, height * 0.15);
  // 두 번째 줄
  fill(50, 120, 50, textState.opacity2);
  textSize(20);
  text("오늘의 마음을 기억하며, 힘찬 하루를 시작해보세요 🌱", width / 2, height * 0.15 + 40);
  textStyle(NORMAL);
}
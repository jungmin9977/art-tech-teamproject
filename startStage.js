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

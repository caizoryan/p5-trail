let margin = 50;
let sqrSize = 50;
let sqr, sqr2;
let chars = "LAURA COOMBS".split("");
let rotationTl = new Timeline();
let rot = { angle: 0 };
let sw = "cMoAoRm b2s8. o7c:a3d1up.mg d".split("");

function setup() {
  createCanvas(1000, 1000);
  setInterval(() => {
    let temp = chars.slice();
    chars = sw;
    sw = temp;
  }, 3000);
  rotationTl.add(
    new PropKeyframes(rot, "angle", [
      [0, 700],
      [180, 2700],
      [180, 700],
      [0, 2700],
    ])
  );
  sqr = new Square(50, 0, 0, 500, 500, 50, 1);
  sqr2 = new Square(50, 500, 500, width, height, 50, 1400);
  rotationTl.loop();
  rotationTl.animate();
  rotationTl.setEasing("InOutCubic");
  angleMode(DEGREES);
}

function draw() {
  rotationTl.update();
  background(0, 200);
  fill(255);
  textSize(40);
  for (let i = 0; i < chars.length; i++) {
    push();
    translate(width / 2, height / 2);
    rotate(rot.angle * i);
    translate(-width / 2, 0);
    text(chars[i], margin + i * 20, height / 4);
    pop();
  }
  sqr.update();
  sqr2.update();
}

class Square {
  constructor(size, contX, contY, contW, contH, margin, delay) {
    this.size = size;
    this.margin = margin;
    this.contW = contW;
    this.contH = contH;
    this.contX = contX;
    this.contY = contY;
    this.delay = delay;
    this.pos = { x: contX + margin, y: contY + margin };
    this.tl = new Timeline();
    this.init();
  }
  init() {
    this.tl.add(
      new PropKeyframes(this.pos, "x", [
        [this.contW - this.margin - this.size, 700],
        [this.contW - this.margin - this.size, 700],
        [this.contX + this.margin, 700],
        [this.contX + this.margin, 700],
      ])
    );
    this.tl.add(
      new PropKeyframes(this.pos, "y", [
        [this.contY + this.margin, 700],
        [this.contH - this.margin - sqrSize, 700],
        [this.contH - this.margin - sqrSize, 700],
        [this.contY + this.margin, 700],
      ])
    );
    this.tl.setEasing("InOutCubic");
    this.tl.loop();
    setTimeout(() => {
      this.tl.animate();
    }, this.delay);
  }
  update() {
    this.tl.update();
    rect(this.pos.x, this.pos.y, this.size, this.size);
  }
}

class Block {}
class Letters {}

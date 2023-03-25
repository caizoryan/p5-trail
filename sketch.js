let t = 200;
let trs = [];
let shw = false;
let fontBold, fontRegular;
function preload() {
  fontBold = loadFont("./SuisseIntlLD-Bold.otf");
  fontRegular = loadFont("./SuisseIntlLD-Regular.otf");
}
function setup() {
  createCanvas(1000, 1000);
  trs.push(
    new TextTrail("LAURA", color(255, 200, 0), laura, 0),
    new TextTrail("COOMBS", color(255, 200, 0), coombs, 0),
    new TextTrail("MARCH", color(255), date, (coombs.length - 2) * t * 2),
    new TextTrail("28", color(255), date2, (coombs.length - 2) * t * 2)
  );
  setTimeout(() => {
    shw = true;
  }, (coombs.length + date.length - 3) * t * 2);
}

function draw() {
  background(250, 0, 50, 200);
  textSize(28);
  fill(0);
  textFont(fontBold);
  if (shw) {
    text("7PM", 230, height / 2 + 70);
    text("—VIA ZOOM", 230 + 40, height / 2 + 100);
  }
  textFont(fontRegular);
  for (const x of trs) x.update();
}

class TextTrail {
  constructor(text, border, keyframes, delay) {
    this.text = text;
    this.border = border;
    this.keyframes = keyframes;
    this.trail = [];
    this.pos = { x: keyframes[0].x, y: keyframes[0].y };
    this.tl = new Timeline();
    this.x = [];
    this.y = [];
    for (const key of this.keyframes) {
      this.x.push([key.x, t]);
      this.x.push([key.x, t]);
      this.y.push([key.y, t]);
      this.y.push([key.y, t]);
    }
    this.tl.add(new PropKeyframes(this.pos, "x", this.x));
    this.tl.add(new PropKeyframes(this.pos, "y", this.y));
    // this.tl.loop();
    setTimeout(() => {
      this.tl.animate();
    }, delay);
    this.tl.setEasing("InOutQuad");
  }
  update() {
    this.tl.update();
    if (this.trail.length > 50) this.trail.splice(0, 1);
    this.trail.push({ x: this.pos.x, y: this.pos.y });
    for (const p of this.trail) {
      fill(this.border);
      stroke(this.border);
      strokeWeight(20);
      strokeJoin(ROUND);
      textSize(100);
      text(this.text, p.x, p.y);
      fill(0);
      noStroke();
    }
    text(this.text, this.pos.x, this.pos.y);
  }
}

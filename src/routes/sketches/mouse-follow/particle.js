export class Particle {
  constructor(p, center) {
    this.p5 = p;
    this.pos = new p.constructor.Vector(p.mouseX - center.x, p.mouseY - center.y);
    this.vel = new p.constructor.Vector(p.random(-1, 1), p.random(1, -1));
    // this.col = new p5.constructor.Vector(random(256), 0);
    this.lifespan = 255;
  }

  finished() {
    return this.lifespan < 0;
  }

  update() {
    this.pos.add(this.vel);
    this.lifespan -= this.p5.random(10, 15);
  }

  show() {
    this.p5.noStroke();
    // this.p5.stroke(255);
    // this.p5.fill(this.col.x);
    this.p5.fill(255, this.lifespan);
    this.p5.ellipse(this.pos.x, this.pos.y, 16);
  }

  run() {
    this.update();
    this.show();
  }
}

export default Particle;

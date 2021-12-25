export function Particle(p, x = p.random(p.width), y = p.random(p.height)) {
  this.p5 = p;
  this.pos = p.createVector(x, y);
  this.prevPos = this.pos.copy();
  this.vel = p.constructor.Vector.random2D();
  this.acc = p.createVector(0, 0);
  this.limitVel = 4;
}

Particle.prototype.update = function () {
  this.prevPos.x = this.pos.x;
  this.prevPos.y = this.pos.y;
  this.vel.add(this.acc);
  this.vel.limit(this.limitVel);
  this.pos.add(this.vel);
  this.acc.mult(0);
};

Particle.prototype.applyForce = function (force) {
  this.acc.add(force);
};

Particle.prototype.show = function (color = [26, 51, 43, 0.1]) {
  this.wrapAround();
  // this.p5.strokeWeight(8)
  this.p5.stroke(...color);
  this.p5.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
};

Particle.prototype.updatePrev = function () {
  this.prevPos.x = this.pos.x;
  this.prevPos.y = this.pos.y;
};

Particle.prototype.wrapAround = function () {
  if (this.pos.x > this.p5.width) {
    this.pos.x = 0;
    this.updatePrev();
  } else if (this.pos.x < 0) {
    this.pos.x = this.p5.width;
    this.updatePrev();
  }

  if (this.pos.y > this.p5.height) {
    this.pos.y = 0;
    this.updatePrev();
  } else if (this.pos.y < 0) {
    this.pos.y = this.p5.height;
    this.updatePrev();
  }
};

Particle.prototype.follow = function (scl, cols, flowField) {
  const x = this.p5.floor(this.pos.x / scl);
  const y = this.p5.floor(this.pos.y / scl);
  const index = x + y * cols;
  const force = flowField[index].vec;
  this.applyForce(force);
};

export default Particle;

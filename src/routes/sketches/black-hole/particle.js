export function Particle(
  p,
  { x = 0, y = 0 },
  radius = 5,
  maxLifeTime = 25,
) {
  this.p5 = p;
  this.pos = this.p5.createVector(x, y);
  // this.vel = createVector(random(0.5, 1), random(0.5, 1)).setMag(3);
  this.vel = this.p5.createVector(0, 1).setMag(3);
  this.acc = this.p5.createVector();
  this.radius = radius;
  this.maxLifeTime = maxLifeTime;
  this.lifeTime = maxLifeTime;
  this.trails = [];
}

Particle.prototype.applyForce = function (force) {
  this.acc.add(force);
};

Particle.prototype.update = function () {
  this.vel.add(this.acc);
  this.pos.add(this.vel);
  this.acc.setMag(0);
  this.acc.limit(4);
};

Particle.prototype.updateLifeTime = function () {
  this.lifeTime = this.lifeTime > 1 ? this.lifeTime - 1 : 0;
};

Particle.prototype.show = function (fade = false) {
  if (fade) this.p5.fill(0, this.p5.map(0, this.maxLifeTime, 0, 100, this.lifeTime));
  else this.p5.fill(200, 25, 60, 255);
  this.p5.noStroke();
  this.p5.ellipse(this.pos.x, this.pos.y, this.radius * 2);
};

Particle.prototype.showTrail = function (trailLife = 300) {
  this.trails.push(this.pos.copy());
  if (this.trails.length > trailLife) this.trails.splice(0, 1);
  this.p5.stroke(0);
  for (let i = 0; i < this.trails.length; i += 1) {
    if (i !== 0) {
      const current = this.trails[i];
      const prev = this.trails[i - 1];
      this.p5.line(current.x, current.y, prev.x, prev.y);
    }
  }
};

export default Particle;

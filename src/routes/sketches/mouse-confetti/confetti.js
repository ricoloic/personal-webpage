function Confetti(
  p5,
  x,
  y,
  colors,
  radius = 40,
  life = p5.floor(p5.random(40, 95)),
) {
  this.p5 = p5;
  this.pos = p5.createVector(x, y);
  this.vel = p5.constructor.Vector.random2D().setMag(2);
  this.radius = radius;
  this.color = p5.random(colors);
  this.maxLife = life;
  this.life = life;
}

Confetti.prototype.updateLife = function () {
  this.life--;
};

Confetti.prototype.updatePos = function () {
  this.pos.add(this.vel);
};

Confetti.prototype.show = function () {
  const r = this.p5.map(this.life, 0, this.maxLife, 0, this.radius);
  this.p5.stroke(this.color);
  this.p5.circle(this.pos.x, this.pos.y, r * 2);
};

Confetti.prototype.animate = function () {
  this.updateLife();
  this.updatePos();
  this.show();
};

export default Confetti;

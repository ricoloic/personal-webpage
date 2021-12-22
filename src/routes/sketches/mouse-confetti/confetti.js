function Confetti(
  p5,
  x,
  y,
  radius = 40,
  life = p5.floor(p5.random(40, 95)),
  colors = [
    { r: 246, g: 82, b: 160 },
    { r: 54, g: 238, b: 224 },
    { r: 188, g: 236, b: 224 },
  ],
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
  const alfa = this.p5.map(r, 0, this.radius, 0, 1);
  this.p5.stroke(`rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alfa})`);
  this.p5.circle(this.pos.x, this.pos.y, r * 2);
};

Confetti.prototype.animate = function () {
  this.updateLife();
  this.updatePos();
  this.show();
};

export default Confetti;

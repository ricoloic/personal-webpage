const defaultColor = {
  name: 'Magenta',
  rgbDecimal: {
    r: 255,
    g: 0,
    b: 255,
    string: '255, 0, 255',
  },
};

function Particle(p5, x, y, radius = 50, color = defaultColor, vel = 0.03, trailLength = 50) {
  this.p5 = p5;
  this.vel = vel;
  this.radius = radius;
  this.origin = { x, y };
  this.pos = { x, y };
  this.radians = this.p5.floor(this.p5.random(0, 100));
  this.color = color;
  this.alfaIntencity = this.p5.random(0.08, 0.1) && 0.5;
  this.trails = [];
  this.trailLength = trailLength;
  this.spacing = this.p5.floor(this.p5.random(100, 275));
}

Particle.prototype.updatePos = function (mouseIsPressed, position) {
  this.radians += this.vel;
  // eslint-disable-next-line max-len
  this.pos.x = (mouseIsPressed ? position.x : this.origin.x) + this.p5.cos(this.radians) * this.spacing;
  // eslint-disable-next-line max-len
  this.pos.y = (mouseIsPressed ? position.y : this.origin.y) + this.p5.sin(this.radians) * this.spacing;
  this.trails.push({ x: this.pos.x, y: this.pos.y });
  if (this.trails.length > this.trailLength) this.trails.splice(0, 1);
};

Particle.prototype.showTrail = function () {
  for (let i = this.trails.length - 1; i >= 0; i--) {
    const trail = this.trails[i];
    const alfa = Math.abs(this.p5.map(i, 0, this.trailLength, 0, 1) * this.alfaIntencity);
    this.p5.fill(`rgba(${this.color.rgbDecimal.r}, ${this.color.rgbDecimal.g}, ${this.color.rgbDecimal.b}, ${alfa})`);
    this.p5.circle(trail.x, trail.y, this.radius * 2);
  }
};

Particle.prototype.showHead = function () {
  this.p5.fill(`rgba(${this.color.rgbDecimal.r}, ${this.color.rgbDecimal.g}, ${this.color.rgbDecimal.b}, ${this.alfaIntencity + 0.2})`);
  this.p5.circle(this.pos.x, this.pos.y, this.radius * 2);
};

Particle.prototype.show = function () {
  this.showHead();
  this.showTrail();
};

Particle.prototype.animate = function (mouseIsPressed, position) {
  this.updatePos(mouseIsPressed, position);
  this.show();
};

export default Particle;

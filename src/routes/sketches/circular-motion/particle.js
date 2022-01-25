const defaultColor = {
  name: 'Magenta',
  rgbDecimal: {
    r: 255,
    g: 0,
    b: 255,
    string: '255, 0, 255',
  },
};

function Particle(p5, x, y, rgbColor = defaultColor, vel = 0.03, trailLength = 20) {
  this.p5 = p5;
  this.vel = vel;
  this.origin = { x, y };
  this.pos = { x, y };
  this.radians = this.p5.floor(this.p5.random(0, 100));
  this.rgbColor = rgbColor;
  this.alfaIntencity = this.p5.random(0.08, 0.1) && 0.5;
  this.trails = [];
  this.trailLength = trailLength;
  this.spacing = this.p5.floor(this.p5.random(45, 140));

  this.color = () => this.p5.color(this.rgbColor.rgbDecimal.r, this.rgbColor.rgbDecimal.g, this.rgbColor.rgbDecimal.b);

  this.showTrail = () => {
    this.p5.stroke(this.color());
    this.p5.strokeWeight(3);
    this.p5.beginShape();
    for (let i = this.trails.length - 1; i >= 0; i--) {
      const trail = this.trails[i];
      this.p5.vertex(trail.x, trail.y);
    }
    this.p5.endShape();
  };
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

Particle.prototype.show = function () {
  this.showTrail();
};

Particle.prototype.animate = function (mouseIsPressed, position) {
  this.updatePos(mouseIsPressed, position);
  this.show();
};

export default Particle;

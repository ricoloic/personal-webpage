export function Flow(p) {
  this.p5 = p;
  this.vec = 0;
}

Flow.prototype.update = function (xoff, yoff, zoff) {
  const noiseAngle = this.p5.noise(xoff, yoff, zoff) * this.p5.TWO_PI;
  this.vec = this.p5.constructor.Vector.fromAngle(noiseAngle).setMag(50);
};

Flow.prototype.show = function (scl, x, y) {
  this.p5.push();
  this.p5.translate(x * scl, y * scl);
  this.p5.rotate(this.vec.heading());
  // this.p5.stroke(0);
  // this.p5.strokeWeight(1);
  this.p5.line(0, 0, scl, 0);
  this.p5.pop();
};

export default Flow;

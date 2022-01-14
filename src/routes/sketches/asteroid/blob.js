export class Blob {
  constructor(
    p5,
    position = p5.createVector(0, 0),
    minRadius = 100,
    maxRadius = 200,
    incrementOffset = 0,
  ) {
    this.p5 = p5;
    this.position = position;
    this.minRadius = minRadius;
    this.maxRadius = maxRadius;
    this.avgRadius = (this.minRadius + this.maxRadius) / 2;

    this.incrementOffset = incrementOffset;
    this.maxNoise = 2;
  }

  show(toff = 0) {
    this.p5.noFill();
    this.p5.strokeWeight(2);
    this.p5.stroke(0);
    this.p5.beginShape();
    for (let i = 0; i < this.p5.TWO_PI; i += 0.08) {
      const xoff = this.p5.map(this.p5.cos(i), -1, 1, 0, this.maxNoise);
      const yoff = this.p5.map(this.p5.sin(i), -1, 1, 0, this.maxNoise);
      const noise = this.p5.noise(xoff, yoff, toff + this.incrementOffset);
      const r = this.p5.map(noise, 0, 1, this.minRadius, this.maxRadius);
      const x = this.p5.cos(i) * r;
      const y = this.p5.sin(i) * r;
      this.p5.vertex(x + this.position.x, y + this.position.y);
    }
    this.p5.endShape(this.p5.CLOSE);
  }

  showMaxCircle() {
    this.p5.noFill();
    this.p5.strokeWeight(2);
    this.p5.stroke(97, 190, 150);
    this.p5.circle(this.position.x, this.position.y, this.maxRadius * 2);
  }

  showMinCircle() {
    this.p5.noFill();
    this.p5.strokeWeight(2);
    this.p5.stroke(97, 190, 150);
    this.p5.circle(this.position.x, this.position.y, this.maxRadius * 2);
  }

  showAvgCircle() {
    this.p5.noFill();
    this.p5.strokeWeight(2);
    this.p5.stroke(96, 80, 157);
    this.p5.circle(this.position.x, this.position.y, this.avgRadius * 2);
  }
}

export default Blob;

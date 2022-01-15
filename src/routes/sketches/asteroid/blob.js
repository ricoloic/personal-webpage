import { Mover } from './mover';

export class Blob extends Mover {
  constructor(p5, position = p5.createVector(0, 0), minRadius = 20, maxRadius = 40) {
    super(p5, position);
    this.radius = p5.floor(p5.random(minRadius, maxRadius));
    this.minRadius = minRadius;
    this.maxRadius = maxRadius;
  }

  show(displayType = 'circle') {
    this.p5.noFill();
    this.p5.strokeWeight(2);
    this.p5.stroke(96, 80, 157);

    if (displayType === 'circle') {
      this.p5.circle(this.position.x, this.position.y, this.radius * 2);
    } else if (displayType === 'rect') {
      this.p5.rect(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
    }
  }
}

export default Blob;

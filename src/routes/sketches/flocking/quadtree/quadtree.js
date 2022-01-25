class QuadTree {
  constructor(boundary, capacity = 4) {
    // Rectangle class
    this.boundary = boundary;

    // the max number of points in a section
    this.capacity = capacity;

    // list of points in the quad
    this.points = [];

    // if the quad as been divided into other quads
    this.divided = false;
  }

  // divide the quad into 4 region like quad
  // northeast, northwest, southeast, southwest
  subdivide() {
    const b = this.boundary;

    this.northeast = new QuadTree(b.subdivide('ne'), this.capacity);
    this.northwest = new QuadTree(b.subdivide('nw'), this.capacity);
    this.southeast = new QuadTree(b.subdivide('se'), this.capacity);
    this.southwest = new QuadTree(b.subdivide('sw'), this.capacity);

    this.divided = true;
  }

  // adds a point like object to the quad
  // or if the quad is at max capacity divide it
  // and insert it in the corresponding region
  // point = point.x && point.y
  // eslint-disable-next-line consistent-return
  insert(point) {
    if (!this.boundary.contains(point)) return false;

    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    }
    if (!this.divided) this.subdivide();

    if (this.northeast.insert(point)) return true;
    if (this.northwest.insert(point)) return true;
    if (this.southeast.insert(point)) return true;
    if (this.southwest.insert(point)) return true;
  }

  // query the points like object in a given range and returns them
  query(range, found = []) {
    if (!this.boundary.intersects(range)) return found;
    // eslint-disable-next-line no-restricted-syntax
    for (const p of this.points) if (range.contains(p)) found.push(p);

    if (this.divided) {
      this.northeast.query(range, found);
      this.northwest.query(range, found);
      this.southwest.query(range, found);
      this.southeast.query(range, found);
    }

    return found;
  }

  // use p5js to draw the QuadTree and its points
  show(p5) {
    p5.stroke(255);
    p5.strokeWeight(1);
    p5.noFill();
    p5.rect(
      this.boundary.x - this.boundary.w,
      this.boundary.y - this.boundary.h,
      this.boundary.w * 2,
      this.boundary.h * 2,
    );
    if (this.divided) {
      this.northeast.show(p5);
      this.northwest.show(p5);
      this.southeast.show(p5);
      this.southwest.show(p5);
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const p of this.points) {
      p5.point(p.x, p.y);
    }
  }
}

export default QuadTree;

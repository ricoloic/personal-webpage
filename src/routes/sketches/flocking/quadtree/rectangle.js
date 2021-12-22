class Rectangle {
  constructor(x, y, w, h) {
    // from center
    this.x = x;
    this.y = y;

    // half length
    this.w = w;
    this.h = h;
  }

  intersects(range) {
    return !(
      range.x - range.w > this.x + this.w
      || range.x + range.w < this.x - this.w
      || range.y - range.h > this.y + this.h
      || range.y + range.h < this.y - this.h
    );
  }

  // check if any x, y are in the rectangle or on the exact edge
  contains(point) {
    return (
      point.x >= this.x - this.w
      && point.x <= this.x + this.w
      && point.y >= this.y - this.h
      && point.y <= this.y + this.h
    );
  }

  // return a new rectangle of a given region
  // eslint-disable-next-line consistent-return
  subdivide(region) {
    // eslint-disable-next-line default-case
    switch (region) {
      case 'ne':
        return new Rectangle(this.x + this.w / 2, this.y - this.h / 2, this.w / 2, this.h / 2);
      case 'nw':
        return new Rectangle(this.x - this.w / 2, this.y - this.h / 2, this.w / 2, this.h / 2);
      case 'se':
        return new Rectangle(this.x + this.w / 2, this.y + this.h / 2, this.w / 2, this.h / 2);
      case 'sw':
        return new Rectangle(this.x - this.w / 2, this.y + this.h / 2, this.w / 2, this.h / 2);
    }
  }
}

export default Rectangle;

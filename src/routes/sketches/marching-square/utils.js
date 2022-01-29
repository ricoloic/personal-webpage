export const getMiddles = (scl, x, y) => {
  const mt = { x: x + scl / 2, y };
  const mr = { x: x + scl, y: y + scl / 2 };
  const mb = { x: x + scl / 2, y: y + scl };
  const ml = { x, y: y + scl / 2 };
  return {
    mt, mr, mb, ml,
  };
};

export const getState = (grid, i, j) => {
  const tl = grid[i][j];
  const tr = grid[i + 1][j];
  const br = grid[i + 1][j + 1];
  const bl = grid[i][j + 1];
  return tl * 8 + tr * 4 + br * 2 + bl;
};

export const drawContourBasedOnState = (p, state, middles) => {
  const {
    mt, mr, mb, ml,
  } = middles;

  const vLine = (v1, v2) => {
    p.line(v1.x, v1.y, v2.x, v2.y);
  };

  switch (state) {
    case 1:
    case 14:
      vLine(ml, mb);
      break;
    case 2:
    case 13:
      vLine(mb, mr);
      break;
    case 3:
    case 12:
      vLine(ml, mr);
      break;
    case 4:
    case 11:
      vLine(mt, mr);
      break;
    case 6:
    case 9:
      vLine(mt, mb);
      break;
    case 7:
    case 8:
      vLine(ml, mt);
      break;
    case 5:
      vLine(mt, ml);
      vLine(mb, mr);
      break;
    case 10:
      vLine(mt, mr);
      vLine(mb, ml);
      break;
    default: break;
  }
};

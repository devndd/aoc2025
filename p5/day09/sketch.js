
const points = [];
const s = 120;
let point1 = 0;
let point2 = 1;
let rects = [];
function preload() {
  loadStrings("9.in", parseData)
}

function setup() {
  scale(1/s);
  strokeWeight(s);
  createCanvas(900, 900);
  drawScene();
}

function drawScene() {
  background(250,250,250);
  scale(1/s);
  strokeWeight(s);
  for (let i = 0; i < points.length - 1; i += 1) {
    line(points[i][0], points[i][1], points[i+1][0], points[i+1][1]);
  }
  if (rects.length > 1) {
    if (testRect(rects[0], rects[1])) {
      console.log("ok");
      fill('green');
    } else {
      fill('red');
    }
    draw_rect(rects[0], rects[1]);
  }
}

function crossProduct(A, B) {
    return A[0] * B[1] - A[1] * B[0];
}

function isBetween(a, b, c) {
    return Math.min(a, b) <= c && c <= Math.max(a, b);
}

function checkIntersection(A, B, C, D) {
    const AB = [B[0] - A[0], B[1] - A[1]];
    const AC = [C[0] - A[0], C[1] - A[1]];
    const AD = [D[0] - A[0], D[1] - A[1]];
    const CD = [D[0] - C[0], D[1] - C[1]];
    const CA = [A[0] - C[0], A[1] - C[1]];
    const CB = [B[0] - C[0], B[1] - C[1]];
    const cross1 = crossProduct(AB, AC) * crossProduct(AB, AD);
    const cross2 = crossProduct(CD, CA) * crossProduct(CD, CB);
    return (cross1 < 0 && cross2 < 0) || (cross1 === 0 && isBetween(A[0], B[0], C[0]) && isBetween(A[1], B[1], C[1])) ||
           (cross2 === 0 && isBetween(C[0], D[0], A[0]) && isBetween(C[1], D[1], A[1]));
}

function testRect(p1, p2) {
  let rect_line1 = [p1[0],p1[1]];
  let rect_line2 = [p1[0],p2[1]];
  let ok = true;
  for (let i = 0; i < points.length - 1; i += 1) {
    if (checkIntersection(rect_line1, rect_line2, points[i], points[i+1])){
      return false;
    }
  }
  return true;
}



function area(p1, p2) {
    return (Math.abs(p1[0] - p2[0]) + 1) * (Math.abs((p1[1] - p2[1])) + 1);
}

function draw() {
  if ( keyIsPressed === true) {
    if ( key === 'w') {
      rects = [];
      point2 += 1;
      if (point2 > points.length - 1) {
        point2 = points.length - 1;
      }
      rects.push(points[point1]);
      rects.push(points[point2]);
    } else if ( key === 's') {
      rects = [];
      point2 -= 1;
      if (point2 < 1) {
        point2 = 1;
      }
      rects.push(points[point1]);
      rects.push(points[point2]);
    }
    if ( key === 'q') {
      rects = [];
      point1 += 1;
      if (point1 > points.length - 1) {
        point1 = points.length - 1;
      }
      rects.push(points[point1]);
      rects.push(points[point2]);
    } else if ( key === 'a') {
      rects = [];
      point1 -= 1;
      if (point1 < 0) {
        point1 = 0;
      }
      rects.push(points[point1]);
      rects.push(points[point2]);
    }
  }
  drawScene();
}

function draw_rect(p1, p2) {
  let h = Math.abs(p1[1] - p2[1]) + 1;
  let w = -Math.abs(p1[0] - p2[0]) + 1;
  if (p1[1] > p2[1]) {
    h *= -1;
  }
  if (p1[0] < p2[0]) {
    w *= -1;
  }
  noFill();
  rect(p1[0], p1[1], w, h);
  fill('red');
  circle(p1[0], p1[1], 1000);
  fill('green');
  circle(p2[0], p2[1], 1000);
}

function parseData(data) {
  data.forEach(element => {
      p = element.split(',');
      points.push([+p[0], +p[1]]);
  });
}

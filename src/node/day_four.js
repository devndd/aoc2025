
const fs = require('node:fs');

fs.readFile('../../input/4.in', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let sum_one = 0;
  let sum_two = 0;
  let lines = data.trim().split('\n');
  let rows = [];
  lines.forEach(s => rows.push(s.split('')));
  let row_count = rows.length;
  let col_count = rows[0].length;
  let sum = 0;
  for (let r = 0; r < row_count; r += 1) {
    for (let c = 0; c < col_count; c += 1) {
        let n = count_neighbours(rows, r, c);
        if (rows[r][c] === '@' && n < 4) {
            sum += 1;
        }
    }
  }
  console.log("part one:", sum);
});

function remove_rolls(rows) {
    let sum = 0;
   for (let r = 0; r < row_count; r += 1) {
    for (let c = 0; c < col_count; c += 1) {
        let n = count_neighbours(rows, r, c);
        if (rows[r][c] === '@' && n < 4) {
            sum += 1;
            rows[r][c] = '-';
        }
    }
  }
  return sum;
}

function count_neighbours(rows, row, col) {
    let rolls = 0
    for (let r = row - 1; r <= row + 1; r += 1){
        for (let c = col - 1; c <= col + 1; c += 1) {
            if (!(r == row && c == col)) {
                if (r >= 0 && r < rows.length && c >= 0 && c < rows[0].length) {
                    if (rows[r][c] === '@') {
                        rolls += 1;
                    }
                }
            }
        }
    }
    return rolls;
}

const fs = require('node:fs');


fs.readFile('input/4.in', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let lines = data.trim().split('\n');
    let rolls = [];
    lines.forEach(s => rolls.push(s.split('')));
    let part_one_ans = movable_rolls(rolls);
    remove_rolls(rolls);
    let part_two_ans = 0;
    let done = false;
    while (!done) {
        let next = movable_rolls(rolls);
        if (next == 0) {
            done = true;
        }
        part_two_ans += next;
        remove_rolls(rolls);
    }
    console.log("part one:", part_one_ans);
    console.log("part two:", part_two_ans + part_one_ans);
});


function remove_rolls(rows) {
    let row_count = rows.length;
    let col_count = rows[0].length;
    for (let r = 0; r < row_count; r += 1) {
        for (let c = 0; c < col_count; c += 1) {
            if (rows[r][c] === '-') {
                rows[r][c] = '.';
            }
        }
    }
}


function movable_rolls(rows) {
    let sum = 0;
    let row_count = rows.length;
    let col_count = rows[0].length;
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
    for (let r = row - 1; r <= row + 1; r += 1) {
        for (let c = col - 1; c <= col + 1; c += 1) {
            if (!(r == row && c == col)) {
                if (r >= 0 && r < rows.length && c >= 0 && c < rows[0].length) {
                    if (rows[r][c] === '@' || rows[r][c] === '-') {
                        rolls += 1;
                    }
                }
            }
        }
    }
    return rolls;
}
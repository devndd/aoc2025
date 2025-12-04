const fs = require('node:fs');

fs.readFile('../../input/1.in', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let values = data.trim().split('\n');
    let part_one_ans = 0;
    let last = 50;
    let next = 0;
    values.forEach(v => {
        let rotation = parse(v);
        next = rotate(last, rotation);
        if (next == 0) {
            part_one_ans += 1;
        }
        last = next;
    });
    console.log("part one:", part_one_ans);
});


function rotate(current, rotation) {
    let res = 0;
    if (rotation.direction == "L") {
         res = (current - rotation.amount + 100) % 100;
    } else {
        res = (current + rotation.amount) % 100;
    }
    return res;
}

function parse(entry) {
    return {"direction":entry[0], "amount":+entry.slice(1)}
}
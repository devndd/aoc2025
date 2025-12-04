const fs = require('node:fs');

fs.readFile('../../input/1.in', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let values = data.trim().split('\n');
    let part_one_ans = 0;
    let part_two_ans = 0;
    let last = 50;
    values.forEach(v => {
        let rotation = parse(v);
        let next = rotate(last, rotation);
        if (next == 0) {
            part_one_ans += 1;
        }
        last = next;
    });
    last = 50;
    values.forEach(v => {
        let rotation = parse(v);
        let next = rotate_by_step(last, rotation);
        part_two_ans += next.zeroes;
        last = next.next; 
    })

    console.log("part one:", part_one_ans);
    console.log("part two:", part_two_ans);


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

function rotate_by_step(current, rotation) {
    let zeroes = 0;
    let last = current;
    let step = 0;
    for (let i = 0; i < rotation.amount; i += 1) {
        if ( rotation.direction == "L" ) {
           step = (last - 1 + 100) % 100;
        } else {
            step = (last + 1) % 100;
            
        }
        if (step == 0) {
            zeroes += 1;

        }
        last = step;
    }
    return {"next":step, "zeroes":zeroes};
}

function parse(entry) {
    return {"direction":entry[0], "amount":+entry.slice(1)}
}
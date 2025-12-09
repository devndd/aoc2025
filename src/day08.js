
const fs = require('node:fs');

fs.readFile('input/8.test', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let raw_values = data.split('\n');
    console.log(raw_values);
    let points = parse_input(raw_values);
    console.log(points);
});

function parse_input(raw_values) {
    let points = [];
    raw_values.forEach(element => {
        let nums = element.split(',');
        points.push({"x":+nums[0], "y":+nums[1], "z":+nums[2]});
    });
    return points;
}
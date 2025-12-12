const fs = require("node:fs");

fs.readFile("input/9.in", "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let raw_values = data.split("\n");
    let points = parse(raw_values);
    let max_part_one = 0;
    for (let i = 0; i < points.length; i += 1) {
        for (let j = i; j < points.length; j += 1) {
            a = area(points[i], points[j]);
            if (a > max_part_one) {
                max_part_one = a;
            }
        }
    }
    let part_one_ans = max_part_one;
    console.log("part one:", part_one_ans);
    let max_part_two = 0;
    let part_two_ans = max_part_two;
    console.log("part two:", part_two_ans);

});

function rect(p1, p2) {
    return [[p1[0],p2[1]], [p2[0], p1[1]]];
}

function area(p1, p2) {
    return (Math.abs(p1[0] - p2[0]) + 1) * (Math.abs((p1[1] - p2[1])) + 1);
}

function parse(raw_values) {
    let points = [];
    raw_values.forEach(element => {
        let nums = element.split(',');
        points.push([+nums[0],+nums[1]])
    });
    return points;
}
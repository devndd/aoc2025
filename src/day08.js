const fs = require("node:fs");


fs.readFile("8.test", "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let raw_values = data.split("\n");
    let points = parse(raw_values);
    let rows = raw_values.length;
    let pairs = []
    for (let i = 0; i < rows; i += 1) {
        for (let j = i; j < rows; j += 1) {
            if (i != j) {
                pairs.push({"p1":points[i], "p2":points[j], "d2": dist_squared(points[i], points[j])});
            }
        }
    }
    pairs.sort(((a, b) => a.d2 - b.d2));
    console.log(pairs);
});

function parse(data) {
    let points = [];
    data.forEach(element => {
        let p = element.split(',');
        points.push({ "x": p[0], "y": p[1], "z": p[2] });
    });
    return points;
}

function dist_squared(p1, p2) {
    return (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2 + (p1.z - p2.z) ** 2;
}

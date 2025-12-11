const fs = require("node:fs");

fs.readFile("input/8.in", "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let raw_values = data.split("\n");
    let points = parse(raw_values);
    let rows = raw_values.length;
    let sz = Array(rows).fill(1);
    let id = Array(rows);
    let count = rows;
    for (let i = 0; i < rows; i +=1 ){
        id[i] = i;
    }
    let pairs = []
    for (let i = 0; i < rows; i += 1) {
        for (let j = i; j < rows; j += 1) {
            if (i != j) {
                pairs.push({"p1":i, "p2":j, "d2": dist_squared(points[i], points[j])});
            }
        }
    }
    pairs.sort(((a, b) => a.d2 - b.d2));

    for (let i = 0; i < 1000; i += 1) {
        count = union(id, sz, count, pairs[i].p1, pairs[i].p2);
    };
    let sz_sorted = [...sz];
    sz_sorted.sort((a,b) => b - a);
    let part_one_ans = sz_sorted[0] * sz_sorted[1] * sz_sorted[2];
    console.log("part one:", part_one_ans);

    let next = 1000;
    while(count > 1) {
        count = union(id, sz, count, pairs[next].p1, pairs[next].p2);
        last_pair = pairs[next];
        next += 1;
    }
    let part_two_ans = points[last_pair.p1].x * points[last_pair.p2].x;
    console.log("part two:", part_two_ans);
});

function find(id, p) {
    while (p != id[p]) {
        p = id[p];
    };
    return p;
}

function union(id, sz, count, p, q) {
    let i = find(id, p);
    let j = find(id, q);
    if (i === j) {
        return count
    }
    if (sz[i] < sz[j] ) {
        id[i] = j;
        sz[j] += sz[i];
    } else {
        id[j] = i;
        sz[i] += sz[j];
    }
    count -= 1;
    return count;
}

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

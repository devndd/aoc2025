const fs = require("node:fs");

fs.readFile("input/9.test", "utf8", (err, data) => {
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

    for (let i = 0; i < points.length; i += 1) {
        for (let j = i; j < points.length; j += 1) {
            let p1 = points[i];
            let p2 = points[j];
            let r = rect(p1, p2);
            if (rect_is_valid(r, points)) {
                a = area(p1, p2);
                if (a > max_part_two) {
                    max_part_two = a;
                }
            }
        }
    }
    let part_two_ans = max_part_two;
    console.log("part two:", part_two_ans);

});

function rect_is_valid(rect, polygon) {
    for (let i = 0; i < rect.length; i += 1) {
        if (!pointIsInPoly(rect[i], polygon)) {
            return false;
        }
    }
    return true;
}

function rect(p1, p2) {
    return [p1, p2, { "x": p1.x, "y": p2.y }, { "x": p2.x, "y": p1.y }];
}

// Source - https://stackoverflow.com/a
// Posted by Philipp Lenssen, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-11, License - CC BY-SA 4.0

function pointIsInPoly(p, polygon) {
    var isInside = false;
    var minX = polygon[0].x, maxX = polygon[0].x;
    var minY = polygon[0].y, maxY = polygon[0].y;
    for (var n = 1; n < polygon.length; n++) {
        var q = polygon[n];
        minX = Math.min(q.x, minX);
        maxX = Math.max(q.x, maxX);
        minY = Math.min(q.y, minY);
        maxY = Math.max(q.y, maxY);
    }

    if (p.x < minX || p.x > maxX || p.y < minY || p.y > maxY) {
        return false;
    }

    var i = 0, j = polygon.length - 1;
    for (i, j; i < polygon.length; j = i++) {
        if ((polygon[i].y > p.y) != (polygon[j].y > p.y) &&
            p.x < (polygon[j].x - polygon[i].x) * (p.y - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x) {
            isInside = !isInside;
        }
    }

    return isInside;
}

function area(p1, p2) {
    return (Math.abs(p1.x - p2.x) + 1) * (Math.abs((p1.y - p2.y)) + 1);
}

function parse(raw_values) {
    let points = [];
    raw_values.forEach(element => {
        let nums = element.split(',');
        points.push({ "x": +nums[0], "y": +nums[1] })
    });
    return points;
}
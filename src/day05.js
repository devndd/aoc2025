
const fs = require('node:fs');

fs.readFile('input/5.in', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let test_cases = [];
    let ranges = []
    let values = data.trim().split('\n');
    values.forEach(s => {
        if (s.includes('-')) {
            ranges.push(parse_range(s));
        } else {
            if (s.length > 0) {
                test_cases.push(+s);
            }
        }
    });
    let part_one_ans = brute_force_for_part_one(ranges, test_cases);
    ranges.sort( (item1, item2) => item1.start - item2.start);
    let part_two_ans = part_two(ranges); 
    console.log("part one:",part_one_ans);
    console.log("part two:",part_two_ans);
});

function parse_range(range) {
    range_values = range.split('-');
    return {"start":+range_values[0], "end":+range_values[1]};
}

function part_two(ranges) {
    let sum = 0;
    let distinct_ranges = get_distinct_ranges(ranges);

    distinct_ranges.forEach(r => {
        sum += r.end - r.start + 1;
    });
    return sum;
}

function get_distinct_ranges(ranges) {
    let distinct_ranges = [];
    ranges.forEach( range => {
        if (distinct_ranges.length > 0) {
            let last_range = distinct_ranges.at(-1);
            if (need_to_merge(last_range, range)) {
                if (!(range.start > last_range.start && range.end < last_range.end)) {
                    let merged_range = merge_ranges(distinct_ranges.at(-1), range);
                    distinct_ranges.pop();
                    distinct_ranges.push(merged_range);
                }
            } else {
                distinct_ranges.push(range);
            }
        } else {
            distinct_ranges.push(range);
        }
    });
    return distinct_ranges;
}

function merge_ranges(range1, range2) {
    return {"start":Math.min(range1.start, range2.start), "end":Math.max(range1.end, range2.end)};
}

function need_to_merge(range1, range2) {
    return range2.start <= range1.end;
}

function brute_force_for_part_one(ranges, values) {
    let sum = 0;
    for (let i = 0; i < values.length; i += 1) {
        for (let j = 0; j < ranges.length; j += 1) {
            if (values[i] >= ranges[j].start && values[i] <= ranges[j].end) {
                sum += 1;
                break;
            }
        }
    }
    return sum;
}

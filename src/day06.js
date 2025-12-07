const fs = require('node:fs');
const { execPath } = require('node:process');

fs.readFile('input/6.in', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let raw_values = data.trim().split('\n');
    let values = [];
    raw_values.forEach(r => {
        s = r.trim().split(' ');
        values.push(s.filter(n => n.length > 0 && !n.includes(' ')));
    });
    let terms = values[0].length;
    let part_one_ans = values_to_expressions(values).map(e => calculate(e)).reduce((a, b) => a + b);
    let part_two_ans = 0;
    console.log("part one:", part_one_ans);

    // console.log(raw_values[0][0]);
    // console.log(raw_values[1][0]);
    // console.log(raw_values[2][0]);
    // console.log(raw_values[3][0]);
    parse_expressions(raw_values, terms).forEach( e => console.log(calculate_part_two(e, terms)));
    console.log("part two", part_two_ans);


});



function replace_spaces_with_zeros(value) {
    let v = [];
    v.length = value.length;
    for (let i = 0; i < value.length - 1; i++) {
        if (value[i] === ' ' && value[i + 1] === ' ') {
            v.push('0');
        } else {
            v.push(value[i]);
        }
    }
    return v.reduce((a, b) => a + b);
}

function parse_expressions(raw_values, terms) {
    let raw_length = raw_values[0].length;
    let latest_row = [];
    latest_row.length = terms;
    let next_expression = [];
    next_expression.length = terms;
    expressions = [];
    for (let i = 0; i < next_expression.length; i += 1) {
        next_expression[i] = [];
    }

    for (let j = 0; j < raw_length; j += 1) {
        for (let i = 0; i < terms; i += 1) {
            let current = raw_values[i][j];
            if (current == ' ') {
                current = '0';
            }
            latest_row[i] = current;
        }
        if (latest_row.every(v => v == '0') || j == raw_length - 1) {
            expressions.push(next_expression.slice());
            for (let i = 0; i < next_expression.length; i += 1) {
                next_expression[i] = [];
            }
        } else {
            for (let i = 0; i < latest_row.length; i += 1) {
                next_expression[i].push(latest_row[i]);
            }
        }
    }
    return expressions;
}

function values_to_expressions(values) {
    let expressions = [];
    expressions.length = values[0].length;
    for (let i = 0; i < expressions.length; i += 1) {
        let expression = [];
        expression.length = values.length;
        expressions[i] = expression;
    }
    for (let term = 0; term < values.length; term += 1) {
        for (let expression = 0; expression < expressions.length; expression += 1) {
            expressions[expression][term] = values[term][expression];
        }
    }
    return expressions;
}

function calculate_part_two(expression, terms) {
    let ans = 0;
    if (terms != 5) {
        console.error("wrong terms", terms);
    }
    let operation = expression[expression.length - 1][0];
    console.log("operation", operation);

}

function calculate(expression) {
    let ans = 0;
    let operation = expression[expression.length - 1];
    if (operation === '*') {
        ans = 1;
    }
    for (let i = 0; i < expression.length - 1; i += 1) {
        if (operation === '+') {
            ans += +expression[i];
        } else {
            ans *= +expression[i];
        }
    }
    return ans;
}
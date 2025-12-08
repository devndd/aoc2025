const fs = require('node:fs');

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
    let terms = values.length;
    let part_one_ans = values_to_expressions(values).map(e => calculate(e)).reduce((a, b) => a + b);
    let part_two_ans = 0;
    console.log("part one:", part_one_ans);

    part_two_ans = parse_expressions(raw_values, terms).map(e => calculate_part_two(e, terms)).reduce((a,b) => a + b);
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
    let next_expression = [];
    next_expression.length = terms;
    expressions = [];
    for (let i = 0; i < next_expression.length; i += 1) {
        next_expression[i] = [];
    }

    for (let j = 0; j < raw_length; j += 1) {
        let t_values = [];
        for (let i = 0; i < terms; i += 1) {
            if (raw_values[i][j]) {
                // console.log("adding_t", raw_values[i][j]);
                t_values.push(raw_values[i][j]);
            }
        }
        if (t_values.every(t => t == ' ')) {
            expressions.push(next_expression.slice());
            next_expression = [];
            
            for (let i = 0; i < next_expression.length; i += 1) {
                next_expression[i] = [];
            }
        } else  {
            next_expression.push(t_values);
        }
    }
    if (next_expression.length > 0){
        expressions.push(next_expression);
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
    let operation = '!';
    expression.forEach(e => {
        if (e.length == terms) {
            if (e[terms - 1] != ' ') {
                operation = e[terms - 1];
            }
        }
    });
    let nums = [];
    let ans = 0;
    expression.forEach(t => {
        let n_arr = t.slice(0, terms - 1).filter(v => v != ' ');
        if (n_arr.length > 0) {
            let n = n_arr.reduce((a,b) => a + b);
            nums.push(+n);
        }

    });
    if (operation == "*") {
        ans = 1;
    }
    if (operation == "*") {
        nums.forEach(n => ans *= n);
    } else {
        nums.forEach(n => ans += n);
    }
    return ans;
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
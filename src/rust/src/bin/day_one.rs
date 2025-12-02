use std::fs::read_to_string;

#[derive(Debug)]
struct Rotation {
    direction: String,
    amount: i32,
}

fn main() {
    let testing = false;
    let mut file_path = "../../input/1.in";
    if testing {
        file_path = "../../input/1.test"
    }
    let input = read_to_string(file_path).expect("file read failed");
    let ans = part_one(&input);
    println!("part one {ans}");
    let ans = part_two(&input);
    println!("part two {ans}");
}

fn part_one(input: &String) -> i32 {
    let values: Vec<Rotation> = input.lines().map(|l| parse(l.to_string())).collect();
    let mut last = 50;
    let mut zero_count = 0;
    for r in values {
        let new = rotate(last, &r);
        if new == 0 {
            zero_count += 1;
        }
        last = new;
    }
    zero_count
}

fn part_two(input: &String) -> i32 {
    let values: Vec<Rotation> = input.lines().map(|l| parse(l.to_string())).collect();
    let mut last = 50;
    let mut zero_count = 0;
    for r in values {
        let (new, zeros) = rotate_by_step(last, &r);
        zero_count += zeros;
        last = new;
    }
    zero_count
}

fn rotate(current: i32, rotation: &Rotation) -> i32 {
    let ans;
    match rotation.direction.as_str() {
        "L" => ans = (current - rotation.amount + 100) % 100,
        "R" => ans = (current + rotation.amount) % 100,
        _ => panic!("oh no"),
    }
    ans
}

fn rotate_by_step(current: i32, rotation: &Rotation) -> (i32, i32) {
    let mut ans = 0;
    let mut zeroes = 0;
    let mut last = current;
    for _i in 0..rotation.amount {
        match rotation.direction.as_str() {
            "L" => ans = (last - 1 + 100) % 100,
            "R" => ans = (last + 1) % 100,
            _ => panic!("oh no"),
        }
        last = ans;
        if ans == 0 {
            zeroes += 1;
        }
    }
    (ans, zeroes)
}

fn parse(val: String) -> Rotation {
    let direction: String = val[0..1].to_string();
    let amount = val[1..].parse().unwrap();
    Rotation { direction, amount }
}


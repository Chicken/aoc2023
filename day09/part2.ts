const values = Deno.readTextFileSync("input")
    .trim()
    .split("\n")
    .map((l) => l.split(" ").map(Number));

let sum = 0;

for (const value of values) {
    const histories = [value.reverse()];
    while (!histories.at(-1)!.every((n) => n === 0)) {
        const history = histories.at(-1)!;
        const difference = Array(history.length - 1).fill(0).map((_v, i) => history[i + 1] - history[i]);
        histories.push(difference);
    }
    histories.reverse();
    for (let i = 0; i < histories.length; i++) {
        if (i === 0) {
            histories[i].push(0);
            continue;
        }
        histories[i].push(histories[i].at(-1)! + histories[i - 1]!.at(-1)!);
    }
    sum += histories.at(-1)!.at(-1)!;
}

console.log(sum);

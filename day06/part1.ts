const ints = (str: string) => str.match(/\d+/g)?.map(Number) ?? [];

const lines = Deno.readTextFileSync("input")
    .trim()
    .split("\n");

const time = ints(lines[0]);
const distance = ints(lines[1]);

let w = 1;

for (let i = 0; i < time.length; ++i) {
    const t = time[i];
    const d = distance[i];
    let sum = 0;
    for (let j = 0; j <= t; j++) {
        const td = (t - j) * j;
        if (td > d) sum++;
    }
    w *= sum;
}

console.log(w);

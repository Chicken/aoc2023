const input = Deno.readTextFileSync("input")
    .trim()
    .split("\n")
    .map((l) => l.split(" ").slice(0, 2));

const dirs = {
    "U": [-1, 0],
    "L": [0, -1],
    "R": [0, 1],
    "D": [1, 0],
} as const;

const pos = [0, 0];
const corners = [];
let edge = 0;

for (const [dir, n] of input) {
    const amount = Number(n);
    const [dr, dc] = dirs[dir as keyof typeof dirs];
    pos[0] += dr * amount;
    pos[1] += dc * amount;
    corners.push([...pos]);
    edge += amount;
}

let sum = 0;

for (let i = 0; i < corners.length; i++) {
    sum += corners[i][0] * corners[(i + 1) % corners.length][1] -
        corners[i][1] * corners[(i + 1) % corners.length][0];
}

sum = Math.abs(sum) / 2;

console.log(sum + (edge / 2) + 1);

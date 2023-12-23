const input = Deno.readTextFileSync("input")
    .trim()
    .split("\n")
    .map((l) => l.split(" ")[2].slice(2, -1));

const dirs = {
    "3": [-1, 0],
    "2": [0, -1],
    "0": [0, 1],
    "1": [1, 0],
} as const;

const pos = [0, 0];
const corners = [];
let edge = 0;

for (const s of input) {
    const amount = parseInt(s.slice(0, 5), 16);
    const [dr, dc] = dirs[s[5] as keyof typeof dirs];
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

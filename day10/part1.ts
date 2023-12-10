const lines = Deno.readTextFileSync("input")
    .trim()
    .split("\n")
    .map((l) => l.split(""));

const directions: Record<string, number[][]> = {
    "|": [[-1, 0], [1, 0]],
    "-": [[0, -1], [0, 1]],
    "L": [[-1, 0], [0, 1]],
    "J": [[-1, 0], [0, -1]],
    "7": [[0, -1], [1, 0]],
    "F": [[0, 1], [1, 0]],
    ".": [],
    "S": [[-1, 0], [0, 1], [1, 0], [0, -1]],
};

const startPos: [number, number] = [
    lines.findIndex((l) => l.indexOf("S") !== -1)!,
    lines.find((l) => l.indexOf("S") !== -1)!.indexOf("S")!,
];

const k = ([r, c]: [number, number]): string => `${r},${c}`;

const seen = new Set<string>();
const queue: [[number, number], number][] = [[startPos, 0]];
seen.add(k(startPos));
let farthest = 0;

while (queue.length) {
    const [[r, c], dist] = queue.shift()!;
    farthest = Math.max(farthest, dist);
    for (const [dr, dc] of directions[lines[r][c]]) {
        const [nr, nc] = [r + dr, c + dc];
        if (seen.has(k([nr, nc]))) continue;
        if (lines[nr]?.[nc] && directions[lines[nr][nc]].find((d) => d[0] === -dr && d[1] === -dc)) {
            queue.push([[nr, nc], dist + 1]);
            seen.add(k([nr, nc]));
        }
    }
}

console.log(farthest);

const grid = Deno.readTextFileSync("input")
    .trim()
    .split("\n")
    .map((l) => l.split(""));

const startR = grid.findIndex((r) => r.includes("S"));
const startC = grid[startR].findIndex((c) => c === "S");
const start: [number, number] = [startR, startC];

const k = (r: number, c: number) => `${r},${c}`;

const q: [[number, number], number][] = [[start, 64]];
const visited = new Map<string, number>();

while (q.length) {
    const [[r, c], steps] = q.shift()!;
    if (steps === 0) continue;
    for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[0].length) continue;
        if (grid[nr][nc] === "#") continue;
        const key = k(nr, nc);
        if (visited.has(key)) continue;
        visited.set(key, steps);
        q.push([[nr, nc], steps - 1]);
    }
}

console.log([...visited.values()].filter((v) => v % 2 === 1).length);

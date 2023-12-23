const grid = Deno.readTextFileSync("input")
    .trim()
    .split("\n")
    .map((l) => l.split(""));

const arrows = [
    [">", [0, 1]],
    ["<", [0, -1]],
    ["^", [-1, 0]],
    ["v", [1, 0]],
] as const;
const dirs = arrows.map((e) => e[1]);

const q: [[number, number], number[]][] = [[[0, 1], [0]]];
const target = [grid.length - 1, grid.at(-1)!.indexOf(".")];

let id = 1;
const k = (r: number, c: number, id: number) => `${r},${c},${id}`;
const v = new Set<string>();

let max = 0;

while (q.length) {
    const [[r, c], ids] = q.shift()!;
    if (r === target[0] && c === target[1]) {
        max = ids.length - 1;
        continue;
    }

    for (const [dr, dc] of dirs) {
        const [nr, nc] = [r + dr, c + dc];
        if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[0].length) continue;
        if (grid[nr]?.[nc] === "#") continue;
        if (arrows.some((a) => grid[nr]?.[nc] === a[0] && a[1][0] === -dr && a[1][1] === -dc)) continue;
        if (ids.some((i) => v.has(k(nr, nc, i)))) continue;
        const i = id++;
        v.add(k(nr, nc, i));
        q.push([[nr, nc], [...ids, i]]);
    }
}

console.log(max);

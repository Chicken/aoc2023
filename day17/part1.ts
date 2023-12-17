const grid = Deno.readTextFileSync("input")
    .trim()
    .split("\n")
    .map((l) => l.split("").map(Number));

// row, col, previous delta row, previous delta col, cost, straight line lenght
type Node = [number, number, number, number, number, number];
const start: Node = [0, 0, 0, 0, 0, 0];
const end = [grid.length - 1, grid[0].length - 1] as const;

const q = [start];
const vk = (r: number, c: number, pr: number, pc: number, _cost: number, length: number) =>
    `${r},${c},${pr},${pc},${length}`;
const visited = new Set<string>();
visited.add(vk(...start));

while (q.length) {
    const [r, c, pr, pc, cost, length] = q.shift()!;
    if (r === end[0] && c === end[1]) {
        console.log(cost);
        break;
    }

    for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]] as const) {
        const nr = r + dr;
        const nc = c + dc;

        if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[0].length) continue;
        if (dr === -pr && dc === -pc) continue;
        if (length >= 3 && dr === pr && dc === pc) continue;

        const newLength = dr === pr && dc === pc ? length + 1 : 1;
        const newCost = cost + grid[nr][nc];
        const newNode: Node = [nr, nc, dr, dc, newCost, newLength];

        const key = vk(...newNode);
        if (visited.has(key)) continue;
        visited.add(key);

        q.push(newNode);
    }

    q.sort((a, b) => a[4] - b[4]);
}

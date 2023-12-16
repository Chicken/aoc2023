const grid = Deno.readTextFileSync("input")
    .trim()
    .split("\n")
    .map((l) => l.split(""));

const gridToString = (g: string[][]) => g.map((l) => l.join("")).join("\n");

const prevs = [gridToString(grid)];

const dirs = [[-1, 0], [0, -1], [1, 0], [0, 1]];
const cycles = 1000000000;
let skipped = false;
for (let c = 0; c < cycles; c++) {
    for (const [dr, dc] of dirs) {
        let prev = gridToString(grid);
        while (true) {
            for (let r = 0; r < grid.length; r++) {
                for (let c = 0; c < grid[r].length; c++) {
                    const n = grid[r][c];
                    if (n !== "O") continue;
                    const nr = r + dr;
                    const nc = c + dc;
                    if (
                        nr < 0 || nr >= grid.length ||
                        nc < 0 || nc >= grid[0].length ||
                        grid[nr][nc] !== "."
                    ) continue;
                    grid[r][c] = ".";
                    grid[nr][nc] = "O";
                }
            }
            const curr = grid.map((l) => l.join("")).join("\n");
            if (prev === curr) break;
            prev = curr;
        }
    }
    const curr = gridToString(grid);

    if (prevs.includes(curr) && !skipped) {
        prevs.push(curr);
        const lastIndex = prevs.length - 1;
        const firstIndex = prevs.indexOf(prevs[lastIndex]);
        const cycle = lastIndex - firstIndex;
        const newIndex = Math.floor((cycles - c) / cycle) * cycle + c;
        c = newIndex;
        skipped = true;
        continue;
    }
    prevs.push(curr);
}

let sum = 0;

for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
        if (grid[r][c] === "O") sum += grid.length - r;
    }
}

console.log(sum);

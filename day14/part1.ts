const grid = Deno.readTextFileSync("input")
    .trim()
    .split("\n")
    .map((l) => l.split(""));

let prev = "";

while (true) {
    prev = grid.map((l) => l.join("")).join("\n");
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            const n = grid[r][c];
            if (n !== "O") continue;
            const nr = r - 1;
            if (nr < 0 || grid[nr][c] !== ".") continue;
            grid[r][c] = ".";
            grid[nr][c] = "O";
        }
    }
    const curr = grid.map((l) => l.join("")).join("\n");
    if (prev === curr) break;
}

let sum = 0;

for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
        if (grid[r][c] === "O") sum += grid.length - r;
    }
}

console.log(sum);

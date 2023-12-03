const grid = Deno.readTextFileSync("input").trim().split("\n").map((l) => l.trim().split(""));

let sum = 0;

for (const r in grid) {
    let n = 0;
    let startC = 0;
    for (const c in grid[r]) {
        if ((Number.isNaN(Number(grid[r][c])) || Number(c) === grid[r].length - 1) && n !== 0) {
            if (Number(c) === grid[r].length - 1 && grid[r][c] !== ".") {
                n *= 10;
                n += Number(grid[r][c]);
            }
            outter:
            for (let cc = startC; cc < Number(c); cc++) {
                for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        if (
                            grid[Number(r) + dr]?.[cc + dc] !== "." &&
                            grid[Number(r) + dr]?.[cc + dc] != null &&
                            Number.isNaN(Number(grid[Number(r) + dr]?.[cc + dc]))
                        ) {
                            sum += n;
                            break outter;
                        }
                    }
                }
            }

            n = 0;
        }
        if (!Number.isNaN(Number(grid[r][c]))) {
            if (n === 0) startC = Number(c);
            n *= 10;
            n += Number(grid[r][c]);
        }
    }
}

console.log(sum);

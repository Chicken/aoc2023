type Beam = {
    r: number;
    c: number;
    dir: [number, number];
};

const initGrid = Deno.readTextFileSync("input")
    .trim()
    .split("\n")
    .map((l) => l.split("").map((c) => ({ c, beams: new Set<string>() })));

function calc(grid: typeof initGrid, startR: number, startC: number, startDirR: number, startDirC: number): number {
    const beams: Beam[] = [
        {
            r: startR,
            c: startC,
            dir: [startDirR, startDirC],
        },
    ];

    const k = (r: number, c: number) => `${r},${c}`;
    const e = new Set<string>();

    while (beams.length) {
        for (const beam of beams) {
            const [dr, dc] = beam.dir;
            const r = beam.r += dr;
            const c = beam.c += dc;
            if (r < 0 || c < 0 || r >= grid.length || c >= grid[r].length) {
                beams.splice(beams.indexOf(beam), 1);
                continue;
            }
            const ng = grid[r][c];
            if (ng.beams.has(k(dr, dc))) {
                beams.splice(beams.indexOf(beam), 1);
                continue;
            }
            const n = ng.c;
            e.add(k(r, c));
            ng.beams.add(k(dr, dc));

            if (
                n === "." ||
                (dr !== 0 && n === "|") ||
                (dc !== 0 && n === "-")
            ) continue;

            if (dr !== 0 && n === "-") {
                beams.splice(beams.indexOf(beam), 1);
                beams.push({
                    r,
                    c,
                    dir: [0, -1],
                });
                beams.push({
                    r: beam.r,
                    c: beam.c,
                    dir: [0, 1],
                });
                continue;
            }

            if (dc !== 0 && n === "|") {
                beams.splice(beams.indexOf(beam), 1);
                beams.push({
                    r,
                    c,
                    dir: [-1, 0],
                });
                beams.push({
                    r,
                    c,
                    dir: [1, 0],
                });
                continue;
            }

            if (dr > 0 && n === "/") beam.dir = [0, -1];
            if (dr < 0 && n === "/") beam.dir = [0, 1];
            if (dr > 0 && n === "\\") beam.dir = [0, 1];
            if (dr < 0 && n === "\\") beam.dir = [0, -1];

            if (dc > 0 && n === "/") beam.dir = [-1, 0];
            if (dc < 0 && n === "/") beam.dir = [1, 0];
            if (dc > 0 && n === "\\") beam.dir = [1, 0];
            if (dc < 0 && n === "\\") beam.dir = [-1, 0];
        }
    }
    return e.size;
}

let max = 0;

const maxC = initGrid[0].length;
for (let r = 0; r < initGrid.length; r++) {
    max = Math.max(max, calc(structuredClone(initGrid), r, -1, 0, 1));
    max = Math.max(max, calc(structuredClone(initGrid), r, maxC, 0, -1));
}

const maxR = initGrid.length;
for (let c = 0; c < initGrid[0].length; c++) {
    max = Math.max(max, calc(structuredClone(initGrid), -1, c, 1, 0));
    max = Math.max(max, calc(structuredClone(initGrid), maxR, c, -1, 0));
}

console.log(max);

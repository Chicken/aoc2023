type Beam = {
    r: number;
    c: number;
    dir: [number, number];
};

const grid = Deno.readTextFileSync("input")
    .trim()
    .split("\n")
    .map((l) => l.split("").map((c) => ({ c, beams: new Set<string>() })));

const beams: Beam[] = [
    {
        r: 0,
        c: -1,
        dir: [0, 1],
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

console.log(e.size);

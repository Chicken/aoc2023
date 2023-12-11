const lines = Deno.readTextFileSync("input")
    .trim()
    .split("\n")
    .map((l) => l.split(""));

const emptyColumns = Array(lines[0].length).fill(0).map((_, i) => i).filter((i) => lines.every((l) => l[i] === "."));
const emptyRows = Array(lines.length).fill(0).map((_, i) => i).filter((i) => lines[i].every((c) => c === "."));

const nodes = lines.flatMap((l, r) =>
    l.map((cc, c) => cc === "#" ? [+r, +c] : null).filter(Boolean) as unknown as [number, number][]
);

let sum = 0;

for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
        const start = nodes[i];
        const end = nodes[j];

        const dist = Math.abs(start[0] - end[0]) + Math.abs(start[1] - end[1]);

        const emptyRowsInBetween = emptyRows.filter((r) =>
            (r > start[0] && r < end[0]) || (r > end[0] && r < start[0])
        ).length;
        const emptyColumnsInBetween = emptyColumns.filter((c) =>
            (c > start[1] && c < end[1]) || (c > end[1] && c < start[1])
        ).length;

        sum += dist + emptyRowsInBetween * (1000000 - 1) + emptyColumnsInBetween * (1000000 - 1);
    }
}

console.log(sum);

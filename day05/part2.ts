const lines = Deno.readTextFileSync("input")
    .trim()
    .split("\n");

const seedRanges = [...lines[0].split(": ")[1].matchAll(/\d+ \d+/g)].map((n) => {
    const [start, len] = n[0].split(" ").map(Number);
    return [start, start + len - 1];
});
lines.splice(0, 2);

const maps = lines.join("\n").split("\n\n").map((rawMap) => {
    const mapLines = rawMap.split("\n");
    mapLines.splice(0, 1);
    const transforms = mapLines.map((l) => l.split(" ").map(Number));
    return transforms;
});

let lowest = Infinity;

for (const [seedStart, seedEnd] of seedRanges) {
    let ranges = [[seedStart, seedEnd]];
    let nextRanges: number[][] = [];
    for (const map of maps) {
        for (const range of ranges) {
            const [start, end] = range;
            const mappedRanges: number[][] = [];
            for (const transform of map) {
                const [dest, src, len] = transform;
                if (src <= start && end < src + len) {
                    mappedRanges.push([start, end]);
                    nextRanges.push([dest + (start - src), dest + (end - src)]);
                } else if (start < src && src <= end && end < src + len) {
                    mappedRanges.push([src, end]);
                    nextRanges.push([dest, dest + (end - src)]);
                } else if (src <= start && start < src + len && src + len <= end) {
                    mappedRanges.push([start, src + len - 1]);
                    nextRanges.push([dest + (start - src), dest + len - 1]);
                } else if (start < src && src + len <= end) {
                    mappedRanges.push([src, src + len - 1]);
                    nextRanges.push([dest, dest + len - 1]);
                }
            }
            mappedRanges.sort((a, b) => a[0] - b[0]);
            const unmappedRanges: number[][] = [];
            let previousEnd = start - 1;
            for (const newRange of mappedRanges) {
                const [newStart, newEnd] = newRange;
                if (newStart > previousEnd + 1) unmappedRanges.push([previousEnd + 1, newStart - 1]);
                previousEnd = newEnd;
            }
            if (previousEnd < end) unmappedRanges.push([previousEnd + 1, end]);
            nextRanges.push(...unmappedRanges);
        }
        ranges = nextRanges;
        nextRanges = [];
    }

    const seedLowest = Math.min(...ranges.map((r) => r[0]));
    if (seedLowest < lowest) lowest = seedLowest;
}

console.log(lowest);

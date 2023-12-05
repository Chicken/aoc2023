const lines = Deno.readTextFileSync("input")
    .trim()
    .split("\n");

const seeds = lines[0].split(": ")[1].split(" ").map(Number);
lines.splice(0, 2);

const maps = lines.join("\n").split("\n\n").map((rawMap) => {
    const mapLines = rawMap.split("\n");
    mapLines.splice(0, 1);
    const transforms = mapLines.map((l) => l.split(" ").map(Number));
    return transforms;
});

let lowest = Infinity;

for (const seed of seeds) {
    let n = seed;
    for (const map of maps) {
        const nn = map.find((t) => t[1] <= n && t[1] + t[2] > n);
        if (nn) n = nn[0] + (n - nn[1]);
    }
    if (n < lowest) lowest = n;
}

console.log(lowest);

const lines = Deno.readTextFileSync("input")
    .trim()
    .split("\n")
    .map((l) => l.split(""));

const directions: Record<string, number[][]> = {
    "|": [[-1, 0], [1, 0]],
    "-": [[0, -1], [0, 1]],
    "L": [[-1, 0], [0, 1]],
    "J": [[-1, 0], [0, -1]],
    "7": [[0, -1], [1, 0]],
    "F": [[0, 1], [1, 0]],
    ".": [],
    "S": [[-1, 0], [0, 1], [1, 0], [0, -1]],
};

const startPos: [number, number] = [
    lines.findIndex((l) => l.indexOf("S") !== -1)!,
    lines.find((l) => l.indexOf("S") !== -1)!.indexOf("S")!,
];

const k = ([r, c]: [number, number]): string => `${r},${c}`;

const seen = new Set<string>();
const queue: [[number, number], number][] = [[startPos, 0]];
seen.add(k(startPos));

while (queue.length) {
    const [[r, c], dist] = queue.shift()!;
    for (const [dr, dc] of directions[lines[r][c]]) {
        const [nr, nc] = [r + dr, c + dc];
        if (seen.has(k([nr, nc]))) continue;
        if (lines[nr]?.[nc] && directions[lines[nr][nc]].find((d) => d[0] === -dr && d[1] === -dc)) {
            queue.push([[nr, nc], dist + 1]);
            seen.add(k([nr, nc]));
        }
    }
}

const startPosNeighbours = directions["S"].filter(([dr, dc]) =>
    directions[lines[startPos[0] + dr][startPos[1] + dc]].findIndex(([ddr, ddc]) => ddr === -dr && ddc === -dc) !== -1
);
const startPosChar = Object.entries(directions).find((dir) =>
    dir[1].length === startPosNeighbours.length &&
    startPosNeighbours.every(([dr, dc]) => dir[1].findIndex(([ddr, ddc]) => dr === ddr && dc === ddc) !== -1)
)![0];
lines[startPos[0]][startPos[1]] = startPosChar;

let total = 0;
const inside = new Set<string>();

// we can determine which tiles are inside the loop by looking how our state changes within a line
for (let r = 0; r < lines.length; r++) {
    let inLoop = false;
    let prevCorner = "";
    for (let c = 0; c < lines[r].length; c++) {
        if (!seen.has(k([r, c]))) {
            if (inLoop) {
                inside.add(k([r, c]));
                total++;
            }
            continue;
        }
        const char = lines[r][c];
        if (char === "|") {
            // every | means we either go in or out of the loop on that line
            inLoop = !inLoop;
        } else if (char === "L" || char === "F") {
            // L and F have the edge on the left side (the side which we are coming from)
            // they dont change our status yet as they need to be paired with a 7 or J
            // we dont care about - as that just leads us to either 7 or J
            prevCorner = char;
        } else if (char === "J" || char === "7") {
            const pair = prevCorner + char;
            // possible corner pairs are LJ, F7, L7 and FJ
            // the first two LJ and F7 do nothing as they look like
            //       ┃ ┃
            //.┏━┓ . ┗━┛ . 
            // ┃ ┃
            // the status is same in all the dots
            // the other two L7 and FJ look like
            // ┃       ┃
            //.┗━┓ . ┏━┛ .
            //   ┃   ┃
            // the status is different in the middle dot than the other two
            if (pair === "L7" || pair === "FJ") inLoop = !inLoop;
            prevCorner = "";
        }
    }
}

// just for visual confirmation
for (let r = 0; r < lines.length; r++) {
    let row = "";
    const styles = [];
    for (let c = 0; c < lines[r].length; c++) {
        if (r === startPos[0] && c === startPos[1]) {
            row += "%c" + lines[r][c];
            styles.push("background-color: #0f0");
        } else if (inside.has(k([r, c]))) {
            row += "%c" + lines[r][c];
            styles.push("background-color: #00f");
        } else if (seen.has(k([r, c]))) {
            row += "%c" + lines[r][c];
            styles.push("background-color: #f00");
        } else {
            row += "%c" + lines[r][c];
            styles.push("background-color: #fff");
        }
    }
    console.log(row, ...styles);
}

console.log(total);

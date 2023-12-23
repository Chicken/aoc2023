type Coord = [number, number, number];
type Brick = [Coord, Coord];
type Bricks = Brick[];
type Snapshot = [Bricks, Set<string>];

const rInput = Deno.readTextFileSync("input")
    .trim()
    .split("\n")
    .map((l) => l.split("~").map((h) => h.split(",").map(Number))) as Bricks;

let input: Snapshot = [rInput, new Set<string>()];

const k = (r: number, c: number, w: number) => `${r},${c},${w}`;

function iter(brick: Brick, func: (r: number, c: number, w: number) => unknown) {
    const [a, b] = brick;
    const [r1, c1, w1] = a;
    const [r2, c2, w2] = b;
    for (let r = Math.min(r1, r2); r <= Math.max(r1, r2); r++) {
        for (let c = Math.min(c1, c2); c <= Math.max(c1, c2); c++) {
            for (let w = Math.min(w1, w2); w <= Math.max(w1, w2); w++) {
                func(r, c, w);
            }
        }
    }
}

for (const brick of input[0]) iter(brick, (r, c, w) => input[1].add(k(r, c, w)));

function fall(bricks: Snapshot): [number, Snapshot] {
    const clone = structuredClone(bricks[0]) as Bricks;
    const occupiedClone = structuredClone(bricks[1]) as Set<string>;
    clone.sort((a, b) => Math.min(a[0][2], a[1][2]) - Math.min(b[0][2], b[1][2]));
    let changed = 0;
    for (const brick of clone) {
        const [a, b] = brick;
        const w = Math.min(a[2], b[2]);
        if (w === 1) continue;
        let below = 0;
        iter(brick, (r, c) => occupiedClone.has(k(r, c, w - 1)) && below++);
        if (below) continue;
        iter(brick, (r, c, w) => occupiedClone.delete(k(r, c, w)));
        a[2] -= 1;
        b[2] -= 1;
        iter([a, b], (r, c, w) => occupiedClone.add(k(r, c, w)));
        changed++;
    }
    return [changed, [clone, occupiedClone]];
}

while (([, input] = fall(input))[0]) { /**/ }

let sum = 0;

for (let i = 0; i < input[0].length; i++) {
    const clone = structuredClone(input) as Snapshot;
    const removed = clone[0].splice(i, 1)[0];
    iter(removed, (r, c, w) => clone[1].delete(k(r, c, w)));
    const [changes] = fall(clone);
    sum += changes;
}

console.log(sum);

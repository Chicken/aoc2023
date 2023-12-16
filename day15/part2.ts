const seq = Deno.readTextFileSync("input").trim().split(",");

function hash(str: string) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
        h = (h + str.charCodeAt(i)) * 17 % 256;
    }
    return h;
}

const boxes: { label: string; n: number }[][] = Array(256).fill(0).map(() => []);

for (const inst of seq) {
    const [label, op, n] = inst.includes("-")
        ? [inst.slice(0, -1), "-", 0]
        : [inst.slice(0, -2), "=", parseInt(inst.slice(-1))];
    const h = hash(label);
    if (op === "-") {
        const b = boxes[h];
        const i = b.findIndex((l) => l.label === label);
        if (i >= 0) b.splice(i, 1);
    } else {
        const b = boxes[h];
        const i = b.findIndex((l) => l.label === label);
        if (i >= 0) b[i] = { label, n };
        else boxes[h].push({ label, n });
    }
}

let sum = 0;

for (let b = 0; b < boxes.length; b++) {
    for (let i = 0; i < boxes[b].length; i++) {
        sum += (b + 1) * (i + 1) * boxes[b][i].n;
    }
}

console.log(sum);

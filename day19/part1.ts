const input = Deno.readTextFileSync("input")
    .trim();

const [rWorkflows, rParts] = input.split("\n\n");

const workflows = Object.fromEntries(
    rWorkflows.split("\n").map((line) => {
        const [name, rest] = line.split("{");
        const rules = rest.split("}")[0].split(",").map((r) => {
            if (r.indexOf(":") === -1) return { target: r };
            const [cond, target] = r.split(":");
            return {
                field: cond[0],
                op: cond[1],
                value: Number(cond.slice(2)),
                target,
            };
        });
        return [name, rules];
    }),
);

const ints = (str: string) => (str.match(/\d+/g) || []).map(Number);
const parts = rParts.split("\n").map((l) => Object.fromEntries(ints(l).map((v, i) => ["xmas"[i], v])));

let sum = 0;

for (const part of parts) {
    let current = "in";
    while (true) {
        if (current === "A" || current === "R") {
            if (current === "A") sum += Object.values(part).reduce((a, b) => a + b, 0);
            break;
        }
        const workflow = workflows[current];
        for (const rule of workflow) {
            if (!rule.field) {
                current = rule.target;
                break;
            }
            const value = part[rule.field];
            if (
                (rule.op === "<" && value < rule.value) ||
                (rule.op === ">" && value > rule.value)
            ) {
                current = rule.target;
                break;
            }
        }
    }
}

console.log(sum);

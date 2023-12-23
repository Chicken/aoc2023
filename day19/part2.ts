const input = Deno.readTextFileSync("input")
    .trim();

const [rWorkflows] = input.split("\n\n");

const workflows = Object.fromEntries(
    rWorkflows.split("\n").map((line) => {
        const [name, rest] = line.split("{");
        const rules = rest.split("}")[0].split(",").map((r) => {
            if (r.indexOf(":") === -1) return { target: r };
            const [cond, target] = r.split(":");
            return {
                field: cond[0] as keyof Part,
                op: cond[1],
                value: Number(cond.slice(2)),
                target,
            };
        });
        return [name, rules];
    }),
);

type Part = {
    x: [number, number];
    m: [number, number];
    a: [number, number];
    s: [number, number];
};

function recurse(ranges: Part, current: string): number {
    if (current === "R") return 0;
    if (current === "A") return Object.values(ranges).reduce((a, b) => a * (b[1] - b[0] + 1), 1);
    const workflow = workflows[current];
    let sum = 0;
    for (const rule of workflow) {
        if (!rule.field) return sum + recurse(ranges, rule.target);
        const [min, max] = ranges[rule.field];
        if (rule.op === ">" && rule.value < min) return sum + recurse(ranges, rule.target);
        if (rule.op === "<" && rule.value > max) return sum + recurse(ranges, rule.target);
        if (rule.op === ">" && rule.value > max) continue;
        if (rule.op === "<" && rule.value < min) continue;
        const newRanges1 = { ...ranges };
        if (rule.op === ">") {
            newRanges1[rule.field] = [rule.value + 1, max];
            ranges[rule.field] = [min, rule.value];
        }
        if (rule.op === "<") {
            newRanges1[rule.field] = [min, rule.value - 1];
            ranges[rule.field] = [rule.value, max];
        }
        sum += recurse(newRanges1, rule.target);
    }
    return NaN;
}

console.log(recurse({
    x: [1, 4000],
    m: [1, 4000],
    a: [1, 4000],
    s: [1, 4000],
}, "in"));

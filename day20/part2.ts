const input = Object.fromEntries(
    Deno.readTextFileSync("input")
        .trim()
        .split("\n")
        .map((l) => {
            const [input, output] = l.split(" -> ");
            const outputs = output.split(", ");
            if (input === "broadcaster") {
                return ["broadcaster", { type: "broadcaster", name: "broadcaster", outputs }];
            }
            return [
                input.slice(1),
                {
                    name: input.slice(1),
                    type: input[0],
                    value: 0,
                    inputs: {},
                    outputs,
                },
            ];
        }),
) as Record<
    string,
    {
        type: "broadcaster";
        name: "broadcaster";
        outputs: string[];
    } | {
        type: "&" | "%";
        name: string;
        value: number;
        inputs: Record<string, number>;
        outputs: string[];
    }
>;

for (const node of Object.values(input)) {
    for (const outputName of node.outputs) {
        const output = input[outputName];
        if (output && output.type === "&") {
            output.inputs[node.name] = 0;
        }
    }
}
const gcd = (a: number, b: number): number => !b ? a : gcd(b, a % b);
const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

let i = 0;

const rxInput = Object.values(input).find((n) => n.outputs.includes("rx"))!;
const rxInputs = Object.values(input).filter((n) => n.outputs.includes(rxInput.name));
const cycles: number[][] = rxInputs.map(() => []);

while (true) {
    const pulses: [string, number, string][] = [["button", 0, "broadcaster"]];
    while (pulses.length) {
        const [from, pulse, to] = pulses.shift()!;
        const node = input[to];
        if (!node) continue;
        if (rxInput === node && pulse === 1) {
            const index = rxInputs.indexOf(input[from]);
            if (cycles[index].length < 2) {
                cycles[index].push(i);
                if (cycles.every((c) => c.length === 2)) {
                    console.log(cycles.reduce((a, c) => lcm(a, c[1] - c[0]), 1));
                    Deno.exit(0);
                }
            }
        }
        if (node.type === "broadcaster") {
            for (const outputName of node.outputs) {
                pulses.push([node.name, pulse, outputName]);
            }
        } else if (node.type === "&") {
            node.inputs[from] = pulse;
            const newPulse = Object.values(node.inputs).every((i) => i === 1) ? 0 : 1;
            node.value = newPulse;
            for (const outputName of node.outputs) {
                pulses.push([node.name, newPulse, outputName]);
            }
        } else if (node.type === "%" && pulse === 0) {
            node.value = node.value ? 0 : 1;
            for (const outputName of node.outputs) {
                pulses.push([node.name, node.value, outputName]);
            }
        }
    }
    i++;
}

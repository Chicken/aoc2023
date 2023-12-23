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

let low = 0;
let high = 0;

for (let i = 0; i < 1000; i++) {
    const pulses: [string, number, string][] = [["button", 0, "broadcaster"]];
    while (pulses.length) {
        const [from, pulse, to] = pulses.shift()!;
        if (pulse === 0) low++;
        else high++;
        const node = input[to];
        if (!node) continue;
        if (node.type === "broadcaster") {
            for (const outputName of node.outputs) {
                pulses.push([node.name, pulse, outputName]);
            }
        } else if (node.type === "&") {
            node.inputs[from] = pulse;
            const newPulse = Object.values(node.inputs).every((i) => i === 1) ? 0 : 1;
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
}

console.log(low * high);

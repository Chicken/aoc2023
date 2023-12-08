const lines = Deno.readTextFileSync("input")
    .trim()
    .split("\n");

const instructions = lines.splice(0, 1)[0]!.split("");
lines.shift();

type Node = {
    node: string;
    left: Node;
    right: Node;
};

const nodes: Record<string, Node> = {};

for (const line of lines) {
    const [node, rest] = line.split(" = ");
    const [a, b] = rest.split(", ");
    const left = a.split("(")[1];
    const right = b.split(")")[0];
    nodes[node] = { node, left: left as unknown as Node, right: right as unknown as Node };
}

for (const node of Object.values(nodes)) {
    node.left = nodes[node.left as unknown as string];
    node.right = nodes[node.right as unknown as string];
}

const startNodes = Object.values(nodes).filter((node) => node.node.endsWith("A"));
const cycles = startNodes.map(() => 0);

const gcd = (a: number, b: number): number => !b ? a : gcd(b, a % b);
const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

for (const node in startNodes) {
    let current = startNodes[node];
    let i = 0;
    while (true) {
        const inst = instructions[i % instructions.length];
        if (inst === "L") current = current.left;
        else current = current.right;
        i++;
        if (current.node.endsWith("Z")) break;
    }
    cycles[node] = i;
}

console.log(cycles.reduce((a, c) => lcm(a, c), 1));

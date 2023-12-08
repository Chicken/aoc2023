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

let current = nodes["AAA"];
let i = 0;
while (true) {
    const inst = instructions[i % instructions.length];
    if (inst === "L") current = current.left;
    else current = current.right;
    i++;
    if (current.node === "ZZZ") break;
}

console.log(i);

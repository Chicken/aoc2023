const lines = Deno.readTextFileSync("input")
    .trim()
    .split("\n")
    .map((l) => {
        const [springs, rGroups] = l.split(" ");
        const groups = rGroups.split(",").map(Number);
        return { springs, groups };
    });

const cache = new Map<string, number>();
const k = (str: string, groups: number[]) => `${str}-${groups.join(",")}`;

function f(str: string, groups: number[]): number {
    const key = k(str, groups);
    if (cache.has(key)) return cache.get(key)!;
    if (!groups.length) {
        if (str.includes("#")) return 0;
        else return 1;
    }
    const g = groups[0];
    const rest = groups.slice(1);
    let sum = 0;
    for (let i = 0; i < str.length - g - rest.reduce((a, c) => a + c, 0) + 1; i++) {
        const strStart = str.slice(0, i);
        if (strStart.includes("#")) break;
        let strEnd = str.slice(i, i + g + 1);
        if (strEnd.length === g) strEnd += ".";
        if (strEnd.slice(0, -1).includes(".") || strEnd.endsWith("#")) continue;
        sum += f(str.slice(i + g + 1), rest);
    }
    cache.set(key, sum);
    return sum;
}

let sum = 0;

for (const { springs, groups } of lines) {
    sum += f(Array(5).fill("").map(() => springs).join("?"), Array(5).fill([]).map(() => [...groups]).flat());
}

console.log(sum);

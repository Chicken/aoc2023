const numbers = [
    [1, "one"],
    [2, "two"],
    [3, "three"],
    [4, "four"],
    [5, "five"],
    [6, "six"],
    [7, "seven"],
    [8, "eight"],
    [9, "nine"],
] as [number, string][];
console.log(
    Deno.readTextFileSync("input").trim().split("\n").reduce((a, l) => {
        let leastIndex = Infinity;
        let first = NaN;
        for (const [n, ns] of numbers) {
            const i1 = l.indexOf(ns);
            const i2 = l.indexOf(String(n));
            const i = (i1 >= 0 && i2 >= 0) ? Math.min(i1, i2) : Math.max(i1, i2);
            if (i < leastIndex && i >= 0) {
                leastIndex = i;
                first = n;
            }
        }
        let maxIndex = -Infinity;
        let last = NaN;
        for (const [n, ns] of numbers) {
            const i = Math.max(l.lastIndexOf(ns), l.lastIndexOf(String(n)));
            if (i > maxIndex && i >= 0) {
                maxIndex = i;
                last = n;
            }
        }
        return a + parseInt(String(first) + String(last));
    }, 0),
);

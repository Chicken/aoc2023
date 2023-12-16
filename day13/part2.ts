const patterns = Deno.readTextFileSync("input")
    .trim()
    .split("\n\n")
    .map((b) => b.split("\n").map((l) => l.split("")));

let sum = 0;

for (const pattern of patterns) {
    for (let br = 0; br < pattern.length - 1; br++) {
        const firstHalf = pattern.filter((_, i) => i <= br);
        const secondHalf = pattern.filter((_, i) => i > br);
        const firstHalfReversed = firstHalf.reverse();
        const minLength = Math.min(firstHalf.length, secondHalf.length);
        if (
            Array(minLength).fill(0).reduce(
                (a, _, i) =>
                    a + firstHalfReversed[i].reduce((a2, fhrc, i2) => a2 + (fhrc !== secondHalf[i][i2] ? 1 : 0), 0),
                0,
            ) ===
                1
        ) {
            sum += firstHalf.length * 100;
            break;
        }
    }
    const rotated = Array(pattern[0].length).fill("").map((_, i) => pattern.map((l) => l[i]));
    for (let br = 0; br < rotated.length - 1; br++) {
        const firstHalf = rotated.filter((_, i) => i <= br);
        const secondHalf = rotated.filter((_, i) => i > br);
        const firstHalfReversed = firstHalf.reverse();
        const minLength = Math.min(firstHalf.length, secondHalf.length);
        if (
            Array(minLength).fill(0).reduce(
                (a, _, i) =>
                    a + firstHalfReversed[i].reduce((a2, fhrc, i2) => a2 + (fhrc !== secondHalf[i][i2] ? 1 : 0), 0),
                0,
            ) ===
                1
        ) {
            sum += firstHalf.length;
            break;
        }
    }
}

console.log(sum);

const patterns = Deno.readTextFileSync("input")
    .trim()
    .split("\n\n")
    .map((b) => b.split("\n"));

let sum = 0;

for (const pattern of patterns) {
    for (let br = 0; br < pattern.length - 1; br++) {
        const firstHalf = pattern.filter((_, i) => i <= br);
        const secondHalf = pattern.filter((_, i) => i > br);
        const firstHalfReversed = firstHalf.reverse();
        const minLength = Math.min(firstHalf.length, secondHalf.length);
        if (Array(minLength).fill(0).every((_, i) => firstHalfReversed[i] === secondHalf[i])) {
            sum += firstHalf.length * 100;
            break;
        }
    }
    const rotated = Array(pattern[0].length).fill("").map((_, i) => pattern.map((l) => l[i]).join(""));
    for (let br = 0; br < rotated.length - 1; br++) {
        const firstHalf = rotated.filter((_, i) => i <= br);
        const secondHalf = rotated.filter((_, i) => i > br);
        const firstHalfReversed = firstHalf.reverse();
        const minLength = Math.min(firstHalf.length, secondHalf.length);
        if (Array(minLength).fill(0).every((_, i) => firstHalfReversed[i] === secondHalf[i])) {
            sum += firstHalf.length;
            break;
        }
    }
}

console.log(sum);

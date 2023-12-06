const [t, d] = Deno.readTextFileSync("input")
    .trim()
    .split("\n").map((l) => Number(l.split(":")[1].replace(/ /g, "")));

const min = Math.ceil((-t + Math.sqrt(t ** 2 - 4 * -1 * -d)) / (2 * -1));
const max = Math.ceil((-t - Math.sqrt(t ** 2 - 4 * -1 * -d)) / (2 * -1));
console.log(max - min);

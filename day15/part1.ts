const seq = Deno.readTextFileSync("input").trim().split(",");

function hash(str: string) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
        h = (h + str.charCodeAt(i)) * 17 % 256;
    }
    return h;
}

let sum = 0;

for (const inst of seq) {
    sum += hash(inst);
}

console.log(sum);

const games = Deno.readTextFileSync("input").trim().split("\n").map((l) => {
    const [name, games] = l.split(": ");
    const id = Number(name.split(" ")[1]);
    const hands = games.split("; ").map((h) =>
        Object.fromEntries(h.split(", ").map((p) => [p.split(" ")[1], Number(p.split(" ")[0])]))
    );
    return { id, hands };
});

let sum = 0;

for (const game of games) {
    let maxRed = 0;
    let maxGreen = 0;
    let maxBlue = 0;
    for (const hands of game.hands) {
        if (hands.red && hands.red > maxRed) {
            maxRed = hands.red;
        }
        if (hands.green && hands.green > maxGreen) {
            maxGreen = hands.green;
        }
        if (hands.blue && hands.blue > maxBlue) {
            maxBlue = hands.blue;
        }
    }
    sum += maxRed * maxGreen * maxBlue;
}

console.log(sum);

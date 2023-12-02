console.log(
    Deno.readTextFileSync("input").trim().split("\n").map((l) => {
        const [name, games] = l.split(": ");
        const id = Number(name.split(" ")[1]);
        const hands = games.split("; ").map((h) =>
            Object.fromEntries(h.split(", ").map((p) => [p.split(" ")[1], Number(p.split(" ")[0])]))
        );
        return { id, hands };
    }).reduce((a, game) => {
        let maxRed = 0;
        let maxGreen = 0;
        let maxBlue = 0;
        for (const hand of game.hands) {
            if (hand.red && hand.red > maxRed) maxRed = hand.red;
            if (hand.green && hand.green > maxGreen) maxGreen = hand.green;
            if (hand.blue && hand.blue > maxBlue) maxBlue = hand.blue;
        }
        return a + maxRed * maxGreen * maxBlue;
    }, 0),
);

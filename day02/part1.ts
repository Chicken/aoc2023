const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;

console.log(
    Deno.readTextFileSync("input").trim().split("\n").map((l) => {
        const [name, games] = l.split(": ");
        const id = Number(name.split(" ")[1]);
        const hands = games.split("; ").map((h) =>
            Object.fromEntries(h.split(", ").map((p) => [p.split(" ")[1], Number(p.split(" ")[0])]))
        );
        return { id, hands };
    }).reduce((a, c) => {
        if (
            c.hands.every((h) =>
                (!h.red || h.red <= maxRed) &&
                (!h.green || h.green <= maxGreen) &&
                (!h.blue || h.blue <= maxBlue)
            )
        ) return a + c.id;
        else return a;
    }, 0),
);

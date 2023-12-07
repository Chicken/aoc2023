const cardTypes = "A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, 2, J".split(", ").reverse();

const hands = Deno.readTextFileSync("input")
    .trim()
    .split("\n")
    .map((l) => {
        const [hand, bidStr] = l.split(" ");
        const bid = Number(bidStr);
        let tier = 0;
        for (const [r, a, b] of [[6, 5, 0], [5, 4, 0], [4, 3, 2], [3, 3, 0], [2, 2, 2], [1, 2, 0], [0, 1, 0]]) {
            let containsA = false;
            let aCardType = "";
            for (const cardType of cardTypes) {
                if (hand.split("").filter((c) => c === cardType || c === "J").length === a) {
                    containsA = true;
                    aCardType = cardType;
                    break;
                }
            }
            let containsB = b === 0 ? true : false;
            if (b !== 0) {
                for (const cardType of cardTypes) {
                    if (hand.split("").filter((c) => c === cardType && c !== aCardType && c !== "J").length === b) {
                        containsB = true;
                        break;
                    }
                }
            }
            if (containsA && containsB) {
                tier = r;
                break;
            }
        }
        return { hand, tier, bid };
    })
    .sort((a, b) => {
        if (a.tier === b.tier) {
            for (let ci = 0; ci < a.hand.length; ci++) {
                if (a.hand[ci] === b.hand[ci]) continue;
                return cardTypes.indexOf(a.hand[ci]) - cardTypes.indexOf(b.hand[ci]);
            }
            return 0;
        }
        return a.tier - b.tier;
    });

console.log(hands.reduce((a, c, i) => a + c.bid * (i + 1), 0));

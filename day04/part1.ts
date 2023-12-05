console.log(
    Deno.readTextFileSync("input")
        .trim()
        .split("\n")
        .map((l) =>
            l
                .split(": ")[1]
                .split(" | ")
                .map((ns) =>
                    ns
                        .split(" ")
                        .filter(Boolean)
                        .map(Number)
                )
        )
        .reduce((a, c) => a + Math.floor(2 ** (c[0].filter((n) => c[1].includes(n)).length - 1)), 0),
);

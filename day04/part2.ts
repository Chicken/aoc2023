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
        .map((c) => [1, c[0].filter((n) => c[1].includes(n)).length])
        .map((c, i, a) => {
            for (let j = 0; j < c[1]; j++) a[i + j + 1][0] += c[0];
            return c;
        })
        .reduce((a, c) => a + c[0], 0),
);

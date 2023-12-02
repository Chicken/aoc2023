console.log(
    Deno.readTextFileSync("input").trim().split("\n").map((l) =>
        l.split("").map(Number).filter((n) => !Number.isNaN(n))
    ).reduce((a, c) => a + parseInt(String(c[0]) + String(c.at(-1)!)), 0),
);

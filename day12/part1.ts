const lines = Deno.readTextFileSync("input")
    .trim()
    .split("\n")
    .map((l) => {
        const [springs, rGroups] = l.split(" ");
        const groups = rGroups.split(",").map(Number);
        return { springs, groups };
    });

let sum = 0;

for (const { springs, groups } of lines) {
    const wildcardCount = springs.split("").filter((c) => c === "?").length;
    for (let i = 0; i < 2 ** wildcardCount; i++) {
        const springsCopy = [...springs];
        for (let j = 0; j < wildcardCount; j++) {
            springsCopy[springsCopy.indexOf("?")] = (i >> j & 1) ? "#" : ".";
        }
        const str = springsCopy.join("");
        const newGroups = str.split(".").filter(Boolean).map((g) => g.length).join(",");
        if (newGroups === groups.join(",")) sum++;
    }
}

console.log(sum);

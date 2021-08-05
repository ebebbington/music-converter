
const decoder = new TextDecoder();
const encoder = new TextEncoder();
const fetchRes = await fetch("https://cdn.deno.land/deno/meta/versions.json");
const versions: {
  latest: string;
  versions: string[];
} = await fetchRes.json(); // eg { latest: "v1.3.3", versions: ["v1.3.2", ...] }
const latestDenoVersion = versions.latest.replace("v", "");
console.log(latestDenoVersion)

let dockerfileContent = decoder.decode(
  Deno.readFileSync("./Dockerfile"),
);
dockerfileContent = dockerfileContent.replace(
  /-s v[0-9.]+[0-9.]+[0-9]/,
  `-s v${latestDenoVersion}`,
);
Deno.writeFileSync(
  "./Dockerfile",
  encoder.encode(dockerfileContent),
);
import { assertEquals, existsSync } from "../deps.ts";

Deno.test("GET / returns 200", async () => {
  const res = await fetch("http://localhost:1445");
  await res.text();
  assertEquals(res.status, 200);
});

Deno.test("POST / returns 200", async () => {
  const res = await fetch("http://localhost:1445", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: "https://www.youtube.com/watch?v=u0NyOcf7h8c",
      increaseBy: "1.5dB",
    }),
  });
  await res.text();
  const title = "Twiddle - Lost In The Cold";
  assertEquals(existsSync(title + ".mp4"), false);
  assertEquals(existsSync(title + ".mp3"), false);
  assertEquals(res.status, 200);
});

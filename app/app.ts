import { Drash, ffmpeg, ytdl } from "./deps.ts";
import { getTitleOfVideoFromUrl } from "./util.ts";

const decoder = new TextDecoder();
const ffmpegDir = "/usr/bin/ffmpeg";

class Res extends Drash.Http.Resource {
  static paths = ["/"];

  public GET() {
    this.response.body = decoder.decode(Deno.readFileSync("./index.html"));
    return this.response;
  }

  public async POST() {
    const url =
      decodeURIComponent(this.request.getBodyParam("url") as string) ?? "";
    const increaseBy = this.request.getBodyParam("increaseBy") ?? "1.5dB";
    const title = await getTitleOfVideoFromUrl(url);
    const stream = await ytdl(url);
    const chunks: Uint8Array[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    const blob = new Blob(chunks);
    const mp4filename = title + ".mp4";
    Deno.writeFileSync(
      mp4filename,
      new Uint8Array(await blob.arrayBuffer()),
    );
    const videoRender = ffmpeg({ input: mp4filename, ffmpegDir });
    const mp3filename = title + ".mp3";
    const mp3 = await videoRender
      .noVideo() // ignore video
      .audioCodec("libmp3lame") // to reduce filesize
      .audioBitrate(100) // to reduce filesize
      .audioFilters({
        filterName: "volume=" + increaseBy,
      })
      .save("pipe:1", false, { f: "mp3" });
    Deno.removeSync(mp4filename);
    this.response.headers.set("Content-Length", String(mp3.length));
    this.response.headers.set("Content-Type", "application/mpeg");
    this.response.headers.set(
      "Content-Disposition",
      "attachment; filename=" + mp3filename,
    );
    this.response.body = mp3;
    return this.response;
  }
}
const server = new Drash.Http.Server({
  resources: [Res],
});
await server.run({
  hostname: "app",
  port: 1445,
});
console.log("running on http://localhost:1445");

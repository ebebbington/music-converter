import { ytdl } from "./deps.ts";
import { getTitleOfVideoFromUrl } from "./util.ts";

const urls = Deno.args[0].split(",");

for (const url of urls) {
  const title = await getTitleOfVideoFromUrl(url);
  const stream = await ytdl(url);
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  const blob = new Blob(chunks);
  const mp4filename = "songs/" + title + ".mp4";
  Deno.writeFileSync(
    mp4filename,
    new Uint8Array(await blob.arrayBuffer()),
  );
  const mp3filename = "songs/" + title + ".mp3";
  const ffmpegCmd = [
    "ffmpeg",
    "-i", // specify input file
    mp4filename,
    "-vn", // no video
    "-c:a", // audio codecs
    "libmp3lame", // used to reduce filesize
    "-b:a", // bit rate
    "102400", // eg 100 as opposed to 100, to reduce file size
    "-filter:a", // reduce volume filter
    "volume=1.5dB",
    mp3filename,
  ];
  const p = Deno.run({
    cmd: ffmpegCmd,
  });
  await p.status();
  p.close();
  Deno.removeSync(mp4filename);
}

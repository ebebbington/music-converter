export async function getTitleOfVideoFromUrl(url: string): Promise<string> {
  const res = await fetch(url);
  const text = await res.text();
  return text.match(/<title>(.*)<\/title>/)![1].replace(" - YouTube", "")
    .replace(/(&amp;|&lt;|&gt;|&#39;|&quot;|&#x60;)/g, (tag) => {
      return {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&#39;": "'",
        "&quot;": '"',
        "&#x60;": "`",
      }[tag] || tag;
    });
}

import { assertEquals, buildFor } from "../deps.ts";

Deno.test("Can add url, click add button and data is correctly set", async () => {
  const browser = await buildFor("chrome");
  await browser.goTo("http://localhost:1445");
  await browser.type("#url", "hello:)");
  await browser.click("#add");
  await browser.type("#url", "goodbye:(");
  await browser.click("#add");
  const val = await browser.getInputValue("#url");
  const attribute = await browser.evaluatePage(
    `document.querySelector('#url').getAttribute('data-urls')`,
  );
  await browser.done();
  assertEquals(val, "");
  assertEquals(attribute, "hello:),goodbye:(");
});

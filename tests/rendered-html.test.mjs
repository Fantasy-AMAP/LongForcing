import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render() {
  return new Response(await readFile(new URL('../dist/index.html', import.meta.url), 'utf8'), { headers: { 'content-type': 'text/html' } });
}

test("server-renders the complete LongForcing project page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>LongForcing: Scaling Temporal Manifold Matching/i);
  assert.match(html, /Beyond short-window consistency/);
  assert.match(html, /72.0%/);
  assert.match(html, /76.81/);
  assert.match(html, /87.88%/);
  assert.match(html, /64.39/);
  assert.match(html, /88.26/);
  assert.match(html, /separately trained teacher checkpoint/);
  assert.doesNotMatch(html, /89\.30|65\.06|24\.2|19\.0-point/);
  assert.match(html, /game-0000.mp4/);
  assert.match(html, /game-0005.mp4/);
  assert.match(html, /Scaling Temporal Manifold Matching for Long-Horizon World Rollout/);
  assert.match(html, /Ziyu Zhu/);
  assert.match(html, /Hugging Face/);
  assert.match(html, /24-hour interactive world rollout/i);
  assert.match(html, /id="method"/);
  assert.match(html, /id="results"/);
  assert.match(html, /id="gallery"/);
  assert.match(html, /WorldRoamBench Action Score/);
  assert.match(html, /https:\/\/fantasy-amap\.github\.io\/LongForcing\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|Your site is taking shape/);
});

test("ships the figures, metadata, and no starter skeleton", async () => {
  const assets = [
    "one-day-rollout.png",
    "drift-phenomenon.png",
    "method-comparison.png",
    "drift-human-study.png",
    "interactive-rollouts.png",
  ];

  await Promise.all([
    ...assets.map((name) => access(new URL(`../public/assets/${name}`, import.meta.url))),
    access(new URL("../public/og.png", import.meta.url)),
    access(new URL("../public/favicon.png", import.meta.url)),
  ]);

  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../index.html", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /CopyButton/);
  assert.match(page, /drift-human-study\.png/);
  assert.match(layout, /summary_large_image/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});


test("publication assets contain only reviewed, linked resources", async () => {
  const expected = new Set([
    "favicon.png", "og.png",
    ...["one-day-rollout", "drift-phenomenon", "method-comparison", "drift-human-study", "interactive-rollouts"].map(name => `assets/${name}.png`),
    ...["game-0000", "game-0005", "sunset-meadow", "alpine-lake", "autumn-forest", "scifi-facility", "snow-temple", "campus-walk", "alpine-swordsman", "horseback-meadow", "longforcing-overview-v2"].flatMap(name => [`videos/${name}.jpg`, `videos/${name}.mp4`]),
  ]);
  async function files(url, prefix = "") {
    const entries = await readdir(url, { withFileTypes: true });
    const results = [];
    for (const entry of entries) {
      assert.ok(!entry.isSymbolicLink(), `Unexpected publication symlink: ${prefix}${entry.name}`);
      if (entry.isDirectory()) results.push(...await files(new URL(`${entry.name}/`, url), `${prefix}${entry.name}/`));
      else results.push(`${prefix}${entry.name}`);
    }
    return results;
  }
  const actual = await files(new URL("../public/", import.meta.url));
  assert.deepEqual(new Set(actual), expected);
  const html = (await (await render()).text()).replaceAll("%2F", "/");
  for (const name of expected) assert.ok(html.includes(`/${name}`), `Unreferenced publication asset: ${name}`);
  assert.doesNotMatch(html, /\/Users\/|\/mnt\/nas|oss:\/\/|alibaba-inc\.com|LTAI[0-9A-Za-z]{12,}|-----BEGIN [A-Z ]*PRIVATE KEY/);
  assert.doesNotMatch(html, /Identity and motion over 60 seconds|longforcing-overview\.mp4|longforcing-paper\.pdf|Under review/);
  const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");
  assert.doesNotMatch(readme, /\/Users\/|\/mnt\/nas|oss:\/\//);
});

test("all deployed resource URLs respect the GitHub Pages base and exist", async () => {
  const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
  const paths = [...html.matchAll(/(?:src|poster|href)="(\/[^"#]+)"/g)].map(match => match[1]);
  assert.ok(paths.length > 25);
  for (const path of paths) {
    assert.ok(path.startsWith('/LongForcing/'), `Root-relative URL breaks Pages: ${path}`);
    await access(new URL(`../dist/${path.slice('/LongForcing/'.length)}`, import.meta.url));
  }
  assert.doesNotMatch(html, /<!--app-html-->|\/_next\//);
});

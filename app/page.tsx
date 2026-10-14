import { Image, assetPath } from "./assets";
import { IdeaAnimation } from "./IdeaAnimation";
import { CopyButton } from "./CopyButton";

const shortVideoGroups = [
  { title: "First-person exploration", cases: [
    { id: "sunset-meadow", title: "Sunset Meadow" },
    { id: "alpine-lake", title: "Alpine Lake" },
    { id: "autumn-forest", title: "Autumn Forest" },
  ] },
  { title: "Third-person exploration", cases: [
    { id: "scifi-facility", title: "Sci-fi Facility" },
    { id: "snow-temple", title: "Snow Temple" },
    { id: "campus-walk", title: "Campus Walk" },
    { id: "alpine-swordsman", title: "Alpine Swordsman" },
    { id: "horseback-meadow", title: "Horseback Meadow" },
  ] },
];

const bibtex = `@misc{longforcing2026,
  title  = {LongForcing: Scaling Temporal Manifold Matching
            for Long-Horizon World Rollout},
  author = {Zhu, Ziyu and Sun, Zhaoxu and Jiang, Fan and
            Wang, Mengchao and Ni, Junfeng and Xu, Ting-Bing and
            Liu, Zhicheng and Xu, Mu},
  year   = {2026},
  eprint = {2610.18289},
  archivePrefix = {arXiv},
  primaryClass = {cs.CV},
  doi    = {10.48550/arXiv.2610.18289},
  url    = {https://arxiv.org/abs/2610.18289}
}`;

const resources = [
  { label: "Video", href: "#overview-video", status: "2 min" },
  { label: "arXiv", href: "https://arxiv.org/abs/2610.18289", status: "Paper" },
  { label: "GitHub", href: null, status: "Coming soon" },
  { label: "Hugging Face", href: null, status: "Coming soon" },
] as const;

function SectionHeading({
  index,
  kicker,
  title,
  body,
}: {
  index: string;
  kicker: string;
  title: string;
  body?: string;
}) {
  return (
    <header className="section-heading">
      <p className="section-index">{index} / {kicker}</p>
      <h2>{title}</h2>
      {body ? <p className="section-intro">{body}</p> : null}
    </header>
  );
}

export default function Home() {
  return (
    <main>
      <nav className="nav-shell" aria-label="Primary navigation">
        <a className="wordmark" href="#top">LongForcing</a>
        <div className="nav-links">
          <a href="#abstract">Abstract</a>
          <a href="#method">Method</a>
          <a href="#results">Results</a>
          <a href="#gallery">Gallery</a>
        </div>
        <a className="nav-cta" href="#one-day">24h Viewer</a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">LONG-HORIZON WORLD MODELING</p>
          <h1>LongForcing</h1>
          <p className="hero-title">Scaling Temporal Manifold Matching for Long-Horizon World Rollout</p>
          <p className="authors">{[
            { name: "Ziyu Zhu", marks: "1,*" },
            { name: "Zhaoxu Sun", marks: "1,*" },
            { name: "Fan Jiang", marks: "1,*,†" },
            { name: "Mengchao Wang", marks: "1,*" },
            { name: "Junfeng Ni", marks: "2" },
            { name: "Ting-Bing Xu", marks: "1" },
            { name: "Zhicheng Liu", marks: "1" },
            { name: "Mu Xu", marks: "1,‡" },
          ].map(({ name, marks }) => <span key={name}>{name}<sup>{marks}</sup></span>)}</p>
          <p className="affiliations"><span><sup>1</sup> AMAP, Alibaba Group</span><span><sup>2</sup> Tsinghua University</span></p>
          <p className="author-notes"><span><sup>*</sup> Equal contribution</span><span><sup>†</sup> Project leader</span><span><sup>‡</sup> Corresponding author</span></p>
          <p className="hero-deck">
            LongForcing extends distribution matching from short
            windows to long self-generated trajectories under long-horizon teacher guidance.
          </p>
          <div className="resource-links" aria-label="Project resources">
            {resources.map((resource) =>
              resource.href ? (
                <a key={resource.label} className="resource-link" href={resource.href}>
                  <span>{resource.label}</span><small>{resource.status}</small>
                </a>
              ) : (
                <span key={resource.label} className="resource-link resource-link-muted" aria-disabled="true">
                  <span>{resource.label}</span><small>{resource.status}</small>
                </span>
              ),
            )}
          </div>
        </div>

        <IdeaAnimation />
      </section>

      <section className="metric-ribbon" aria-label="Key results">
        <div><strong>24 h</strong><span>qualitative rollout</span></div>
        <div><strong>+23.9</strong><span>60s first-person Action · 1.3B ablation</span></div>
        <div><strong>+0.93</strong><span>VBench Quality</span></div>
        <div><strong>-52.7%</strong><span>drift at 59 seconds</span></div>
      </section>

      <section className="section overview-video" id="overview-video" aria-labelledby="overview-video-title">
        <header className="section-heading">
          <p className="section-index">VIDEO OVERVIEW</p>
          <h2 id="overview-video-title">LongForcing in two minutes</h2>
          <p>A short introduction to our motivation, method, and results.</p>
        </header>
        <figure>
          <video controls playsInline preload="none" poster={assetPath("/videos/longforcing-overview-v2.jpg")}  aria-label="LongForcing promotional video with audio">
            <source src={assetPath("/videos/longforcing-overview-v2.mp4")}  type="video/mp4" />
            Your browser does not support embedded video.
          </video>
          <figcaption>2-minute overview · with audio</figcaption>
        </figure>
      </section>

      <section className="section section-paper" id="abstract">
        <SectionHeading
          index="01"
          kicker="ABSTRACT"
          title="Learning beyond short supervision windows"
        />

        <div className="abstract-grid">
          <p className="abstract-lead">
            Short-window matching does not determine a long rollout.
          </p>
          <div className="abstract-copy">
            <p>
              Autoregressive video diffusion turns fixed-length synthesis into streaming world
              rollout. Yet, when generated chunks are recursively reused as context, small errors
              move the model into states that were never supervised and drift compounds.
            </p>
            <p>
              LongForcing preserves short teacher-forcing and ODE-distillation stages, then scales
              distribution matching to long on-policy student rollouts under an extended-horizon
              bidirectional teacher, without changing the architecture or inference cost.
            </p>
            <p>LongForcing reaches 85.52 VBench Quality and improves first-person 60-second WorldRoamBench Action by 23.9 points in the 1.3B horizon ablation. Qualitative 5B stress tests sample rollouts up to 24 hours, far beyond the training horizon.</p>
          </div>
        </div>

        <figure className="figure-card figure-card-wide">
          <div className="figure-label"><span>OBSERVATION</span><b>Drift emerges after short supervision ends.</b></div>
          <Image
            src={assetPath("/assets/drift-phenomenon.png")}
            alt="Visible and latent-space evidence of late-rollout drift"
            width={1834}
            height={1064}
            sizes="(max-width: 900px) 100vw, 86vw"
          />
        </figure>
      </section>

      <section className="section section-ink" id="method">
        <SectionHeading
          index="02"
          kicker="METHOD"
          title="Long-horizon on-policy distribution matching"
          body="LongForcing retains short-horizon teacher forcing and causal ODE distillation. In the final DMD stage, the student generates a longer causal path; the frozen real-score teacher and online fake-score network evaluate the whole path bidirectionally at a shared noise level."
        />

        <figure className="method-figure">
          <Image
            src={assetPath("/assets/method-comparison.png")}
            alt="Comparison of local matching, inference-time anchoring, and LongForcing"
            width={2489}
            height={830}
            sizes="(max-width: 900px) 100vw, 86vw"
          />
        </figure>

        <div className="principle-grid">
          <article><span>01</span><h3>Expose</h3><p>Long on-policy rollouts reveal failure states that short training windows cannot reach.</p></article>
          <article><span>02</span><h3>Match</h3><p>A long-horizon teacher scores a contiguous student path rather than sparse local fragments.</p></article>
          <article><span>03</span><h3>Distill</h3><p>Update the few-step causal student using standard DMD. Its architecture and inference procedure remain unchanged.</p></article>
        </div>
        <p className="section-intro">Interactive models use Wan2.2-5B and Wan2.1-1.3B. DMD uses 321-frame rollouts and trains for 1,000 steps on eight GPUs with global batch size 8. Longer DMD paths increase training compute and memory; inference operations stay unchanged.</p>
      </section>

      <section className="section section-results" id="results">
        <SectionHeading
          index="03"
          kicker="EXPERIMENTS"
          title="Quantitative evaluation"
          body="We evaluate 60-second interactive world rollouts and text-to-video generation. The 5B third-person comparison uses control-rate-weighted scores; the 1.3B first-person horizon ablation reports unweighted scores."
        />

        <div className="result-grid">
          <article className="result-card result-card-blue">
            <p className="result-kicker">60-SECOND THIRD-PERSON · 5B</p>
            <div className="result-value">76.81</div>
            <h3>WorldRoamBench Action Score</h3>
            <p>Control-rate-weighted Action; highest among the open-source models compared in the paper.</p>
            <dl className="result-pairs">
              <div><dt>Control rate</dt><dd>87.88%</dd></div>
              <div><dt>Weighted Visual</dt><dd>57.89</dd></div>
            </dl>
          </article>

          <article className="result-card">
            <p className="result-kicker">5-SECOND VBENCH</p>
            <div className="result-value">85.52</div>
            <h3>VBench Quality</h3>
            <p>+0.93 points over Causal Forcing at matched inference cost.</p>
            <dl className="result-pairs">
              <div><dt>Total</dt><dd>84.56</dd></div>
              <div><dt>Semantic</dt><dd>80.72</dd></div>
            </dl>
          </article>

          <article className="result-card">
            <p className="result-kicker">30-SECOND VBENCH-LONG</p>
            <div className="result-value">83.99</div>
            <h3>Long-video Quality</h3>
            <p>Highest Total and Quality among the compared methods; +1.78 Total and +0.55 Quality over Causal Forcing.</p>
            <dl className="result-pairs">
              <div><dt>Total</dt><dd>82.83</dd></div>
              <div><dt>Semantic</dt><dd>78.19</dd></div>
            </dl>
          </article>
        </div>

        <div className="benchmark-table">
          <h3>Third-person world modeling · 60-second WorldRoamBench</h3>
          <p>All scores are on a 0–100 scale. For normalized raw score s and control rate p, higher-is-better scores are 100ps. Ctrl. is 100p; Aesthetic Drift is 100[1 − p(1 − d)], where d is normalized raw drift.</p>
          <div className="table-scroll"><table>
            <thead><tr>{["Model", "Size", "Action ↑", "Ctrl. ↑", "Partial acc. ↑", "Trajectory ↑", "Visual ↑", "Aesthetic ↑", "Aesth. drift ↓", "Imaging ↑"].map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead>
            <tbody>
              <tr><th colSpan={10} scope="rowgroup">Proprietary models</th></tr>
              {[
                ["Genie 3", "—", "69.73", "79.80", "65.75", "73.70", "56.26", "48.11", "32.08", "45.30"],
                ["HappyOyster", "—", "84.02", "96.97", "80.48", "87.57", "65.63", "59.10", "20.61", "47.44"],
              ].map(row => <tr key={row[0]}><th scope="row">{row[0]}</th>{row.slice(1).map((value, i) => <td key={i}>{value}</td>)}</tr>)}
              <tr><th colSpan={10} scope="rowgroup">Open-source models</th></tr>
              {[
                ["LingBot-World", "14B", "18.81", "23.23", "18.50", "19.12", "15.99", "14.32", "81.70", "13.84"],
                ["HY-World 1.5", "8B", "24.92", "29.29", "24.57", "25.28", "19.11", "17.52", "79.48", "16.52"],
                ["LingBot-World v2", "14B", "36.09", "40.40", "35.35", "36.84", "28.42", "25.61", "68.75", "25.04"],
                ["LongForcing", "5B", "76.81", "87.88", "73.74", "79.89", "57.89", "51.69", "31.93", "48.26"],
              ].map(row => <tr key={row[0]} className={row[0] === "LongForcing" ? "ours" : undefined}><th scope="row">{row[0]}</th>{row.slice(1).map((value, i) => <td key={i}>{value}</td>)}</tr>)}
            </tbody>
          </table></div>
          <p>LongForcing-5B controls 87 of 99 cases (87.88%), versus 40 of 99 (40.40%) for LingBot-World v2. Rankings are restricted to the models reported here.</p>
        </div>

        <div className="benchmark-table">
          <h3>First-person horizon ablation · 1.3B · 60-second rollouts</h3>
          <p>Unweighted scores with a fixed 1.3B backbone. Increasing the DMD horizon from 81 to 321 frames raises Action from 64.39 to 88.26 (+23.87 points) and reduces Aesthetic Drift from 56.58 to 42.37.</p>
          <div className="table-scroll"><table>
            <thead><tr>{["DMD frames", "Training span", "Action ↑", "Strict acc. ↑", "Partial acc. ↑", "Trajectory ↑", "Visual ↑", "Aesthetic ↑", "Aesth. drift ↓", "Imaging ↑"].map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead>
            <tbody>{[
              ["81", "~5s", "64.39", "42.89", "63.01", "87.27", "45.05", "39.81", "56.58", "46.40"],
              ["161", "~10s", "56.16", "43.21", "50.00", "75.28", "47.01", "41.06", "60.18", "52.29"],
              ["241", "~15s", "83.39", "78.24", "85.14", "86.78", "55.19", "49.93", "43.30", "50.25"],
              ["321", "~20s", "88.26", "85.16", "90.56", "89.05", "56.30", "51.61", "42.37", "50.84"],
            ].map(row => <tr key={row[0]} className={row[0] === "321" ? "ours" : undefined}><th scope="row">{row[0]}</th>{row.slice(1).map((value, i) => <td key={i}>{value}</td>)}</tr>)}</tbody>
          </table></div>
        </div>

        <div className="benchmark-table">
          <h3>Text-to-video benchmarks · Wan2.1-1.3B</h3>
          <p>5-second VBench and 30-second VBench-Long are separate evaluation protocols. Higher is better for Total, Quality, and Semantic scores.</p>
          <div className="table-scroll"><table>
            <thead><tr>{["Protocol", "Model", "Total ↑", "Quality ↑", "Semantic ↑"].map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead>
            <tbody>{[
              ["VBench · 5s", "CausVid", "81.33", "83.98", "70.72"],
              ["VBench · 5s", "Self Forcing", "83.74", "84.48", "80.77"],
              ["VBench · 5s", "Causal Forcing", "84.04", "84.59", "81.84"],
              ["VBench · 5s", "LongForcing", "84.56", "85.52", "80.72"],
              ["VBench-Long · 30s", "LongLive", "82.80", "83.21", "81.17"],
              ["VBench-Long · 30s", "Self Forcing", "81.49", "82.67", "76.77"],
              ["VBench-Long · 30s", "Causal Forcing", "81.05", "83.44", "71.52"],
              ["VBench-Long · 30s", "LongForcing", "82.83", "83.99", "78.19"],
            ].map(row => <tr key={row[0] + row[1]} className={row[1] === "LongForcing" ? "ours" : undefined}><th scope="row">{row[0]}</th>{row.slice(1).map((value, i) => <td key={i}>{value}</td>)}</tr>)}</tbody>
          </table></div>
        </div>

        <div className="benchmark-table">
          <h3>Text-to-video supervision-horizon configurations</h3>
          <p>Each rollout length uses its corresponding separately trained teacher checkpoint. These configurations change both rollout length and teacher checkpoint; improvements are not monotonic across horizons.</p>
          <div className="table-scroll"><table>
            <thead><tr>{["DMD frames", "Training span", "5s Total ↑", "30s Total ↑", "30s Quality ↑", "30s Semantic ↑", "30s Dynamic ↑"].map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead>
            <tbody>{[
              ["81", "~5s", "84.36", "81.87", "83.71", "74.54", "58.15"],
              ["161", "~10s", "83.76", "78.02", "81.59", "63.77", "56.67"],
              ["241", "~15s", "84.38", "79.18", "83.75", "60.87", "94.91"],
              ["321", "~20s", "84.56", "82.83", "83.99", "78.19", "60.93"],
            ].map(row => <tr key={row[0]} className={row[0] === "321" ? "ours" : undefined}><th scope="row">{row[0]}</th>{row.slice(1).map((value, i) => <td key={i}>{value}</td>)}</tr>)}</tbody>
          </table></div>
        </div>

        <div className="evidence-layout">
          <div className="evidence-copy">
            <p className="section-index">TIME-RESOLVED EVIDENCE</p>
            <h3>Drift separates late.</h3>
            <p>
              At 59 seconds, 321-frame supervision reduces the mean Drift Score from 67.46 to
              31.91. Human evaluators also prefer the long-horizon model across overall quality,
              temporal coherence, visual quality, and motion naturalness.
            </p>
            <p>400 judgments per criterion; 16.2% prefer the 81-frame model and 11.8% are ties.</p>
            <div className="evidence-stat"><strong>72.0%</strong><span>overall human preference · 20 evaluators, 20 shared cases</span></div>
          </div>
          <figure className="evidence-figure">
            <Image
              src={assetPath("/assets/drift-human-study.png")}
              alt="Human preference and time-resolved drift comparison"
              width={2230}
              height={883}
              sizes="(max-width: 900px) 100vw, 58vw"
            />
          </figure>
        </div>
      </section>

      <section className="section section-gallery" id="gallery">
        <SectionHeading
          index="04"
          kicker="QUALITATIVE RESULTS"
          title="Long-horizon generation"
          body="Interactive rollouts from LongForcing-5B and selected paper figures. Videos are qualitative examples, separate from the benchmark evaluation."
        />

        <div className="video-grid">
          {["0000", "0005"].map((id, index) => <figure key={id}>
            <video muted controls playsInline preload="none" poster={assetPath(`/videos/game-${id}.jpg`)} aria-label={`LongForcing-5B interactive case ${index + 1}`}>
              <source src={assetPath(`/videos/game-${id}.mp4`)} type="video/mp4" />
              Your browser does not support embedded video.
            </video>
            <figcaption><strong>{index === 0 ? "Game Factory" : "Sunset Altar"} · LongForcing-5B</strong><span>10-minute interactive rollout · 10× playback · no temporal cuts</span></figcaption>
          </figure>)}
        </div>
        <p className="video-note">Each one-minute preview covers the complete 600-second source trajectory at 10× speed. These examples illustrate long-horizon behavior; they do not establish uninterrupted stability or matched action trajectories across methods.</p>
        <div className="short-rollouts" id="short-rollouts">
          <h3>Exploring diverse environments</h3>
          <p className="video-note">Eight 30-second examples across first- and third-person views. Each video plays at its original speed with the recorded WASD overlay retained.</p>
          {shortVideoGroups.map((group) => <div className="video-group" key={group.title}>
            <h4>{group.title}</h4>
            <div className="video-grid">
              {group.cases.map(({ id, title }) => <figure key={id}>
                <video muted controls playsInline preload="none" poster={assetPath(`/videos/${id}.jpg`)} aria-label={`${title} — 30-second ${group.title.toLowerCase()} example`}>
                  <source src={assetPath(`/videos/${id}.mp4`)} type="video/mp4" />
                  Your browser does not support embedded video.
                </video>
                <figcaption><strong>{title}</strong><span>30 seconds · original speed · WASD overlay</span></figcaption>
              </figure>)}
            </div>
          </div>)}
          <p className="video-note">These short examples illustrate scene variety and are separate from the quantitative evaluation and long-horizon demonstrations above.</p>
        </div>
        <div className="hero-proof" id="one-day">
          <div className="proof-header">
            <div><span>24-HOUR INTERACTIVE WORLD ROLLOUT</span><p>Six trajectories sampled over extended generation</p></div>
            <strong>00:00 &rarr; 24:00</strong>
          </div>
          <Image
            src={assetPath("/assets/one-day-rollout.png")}
            alt="Six LongForcing world-model rollouts sampled across 24 hours and 54 minutes"
            width={1834}
            height={824}
            sizes="(max-width: 900px) 100vw, 58vw"
            priority
          />
        </div>
        <div className="rollout-explorer-link">
          <div>
            <h3>Explore the 24-hour interactive rollouts</h3>
            <p>Browse the 24-hour rollout cases in our interactive viewer.</p>
          </div>
          <a className="button button-primary" href="https://amap-cvlab.github.io/abot-world-0-24h/?t=00%3A00%3A00" target="_blank" rel="noopener noreferrer">Open 24-hour viewer ↗</a>
        </div>
        <p className="hero-note">
          Sparse samples from qualitative stress tests; quantitative evaluation is reported separately above.
        </p>
        <div className="gallery-stack">
          <figure>
            <div className="gallery-title"><span>INTERACTIVE</span><h3>Long rollouts and 600-second comparisons</h3></div>
            <Image
              src={assetPath("/assets/interactive-rollouts.png")}
              alt="A–D: LongForcing up to 54 minutes. E–F: LongForcing-5B and LingBot-World v2 (14B) at matched timestamps up to 599 seconds."
              width={1834}
              height={917}
              sizes="(max-width: 900px) 100vw, 86vw"
            />
          </figure>
        </div>
      </section>

      <section className="section section-theory">
        <p className="section-index">THEORETICAL PERSPECTIVE</p>
        <div className="theory-line">Short windows <span>do not determine</span> long paths.</div>
        <div className="theory-grid">
          <div><span>SUPERVISION GAP</span><p>Perfect local-window matching need not determine the long trajectory distribution.</p></div>
          <div><span>EXPOSURE</span><p>Longer on-policy rollouts reveal failures whose first hitting time lies beyond the short horizon.</p></div>
          <div><span>FINITE-DEPTH CONTROL</span><p>Drift depends on teacher leakage, on-policy mismatch, and whether the rollout can return from failure states.</p></div>
        </div>
      </section>

      <section className="section section-cite" id="paper">
        <div className="cite-copy">
          <p className="section-index">05 / PAPER</p>
          <h2>LongForcing</h2>
          <p>Scaling Temporal Manifold Matching for Long-Horizon World Rollout</p>
          <div className="hero-actions">
            <a className="button button-primary" href="https://arxiv.org/abs/2610.18289">Read on arXiv ↗</a>
          </div>
        </div>
        <div className="bibtex-card">
          <div className="bibtex-head"><span>BIBTEX</span><CopyButton value={bibtex} /></div>
          <pre>{bibtex}</pre>
        </div>
      </section>

      <footer>
        <a className="wordmark" href="#top">LongForcing</a>
        <p>ABot-World Team · 2026</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

const chapters = [
  { label: "Local supervision", title: "Beyond short-window consistency", text: "Matching short video windows leaves the relationships between distant moments underdetermined. Local plausibility alone does not specify how a world should evolve.", detail: "Short-window matching", color: "#54816a" },
  { label: "The horizon gap", title: "The world continues. Supervision ends.", text: "Each generated chunk becomes context for the next. Longer self-rollouts can reach delayed failure states that short training windows never expose to teacher guidance.", detail: "Self-generated context → accumulated drift", color: "#b56755" },
  { label: "LongForcing", title: "Let the teacher see further along the path.", text: "We extend distribution matching over long, contiguous student self-rollouts. An extended-horizon teacher provides a training signal on the later states the student actually visits.", detail: "Long on-policy rollouts + long-horizon teacher", color: "#3157a4" },
];

export function IdeaAnimation() {
  const [chapter, setChapter] = useState(0);
  const [playing, setPlaying] = useState(false);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setPlaying(true); observer.disconnect(); }
    }, { threshold: 0.35 });
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (chapter === 2) setPlaying(false);
      else setChapter(chapter + 1);
    }, 6500);
    return () => window.clearTimeout(timer);
  }, [chapter, playing]);

  const current = chapters[chapter];
  return <figure ref={root} className={`motivation chapter-${chapter} ${playing ? "is-playing" : ""}`} aria-label="LongForcing motivation animation">
    <div className="motivation-top"><span>THE SUPERVISION-HORIZON GAP</span><button onClick={() => {
      if (!playing && chapter === 2) setChapter(0);
      setPlaying(!playing);
    }} aria-label={playing ? "Pause animation" : chapter === 2 ? "Replay animation" : "Play animation"}>
      <span aria-hidden="true">{playing ? "Ⅱ" : chapter === 2 ? "↺" : "▷"}</span> {playing ? "Pause" : chapter === 2 ? "Replay" : "Play"}
    </button></div>
    <div className="motivation-stage">
      <div className="manifold-scene">
        <svg viewBox="0 0 700 480" role="img" aria-labelledby="manifold-title manifold-desc">
          <title id="manifold-title">Temporal manifold matching at scale</title>
          <desc id="manifold-desc">{current.text} The gray ribbon represents the temporal manifold; green segments show local supervision, red shows a possible drifting rollout, and blue shows long-horizon matching. This is a conceptual illustration, not a measured latent projection.</desc>
          <defs>
            <linearGradient id="ribbon-fill" x1="0" y1="1" x2="1" y2="0"><stop stopColor="#e5e9ec" stopOpacity=".75"/><stop offset=".5" stopColor="#f6f8fa"/><stop offset="1" stopColor="#dce3e9" stopOpacity=".65"/></linearGradient>
            <linearGradient id="ribbon-edge"><stop stopColor="#bdc7ce"/><stop offset="1" stopColor="#d5dde2"/></linearGradient>
            <radialGradient id="node-blue" cx="30%" cy="25%"><stop stopColor="#9dbcea"/><stop offset="1" stopColor="#3157a4"/></radialGradient>
            <marker id="time-arrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M1 1 L6 4 L1 7" fill="none" stroke="#8b959d"/></marker>
          </defs>
          <g className="manifold-grid" stroke="#e7ebee" strokeWidth="1">
            <path d="M60 408 L565 445 M85 371 L590 408 M110 334 L615 371 M135 297 L640 334 M160 260 L665 297"/>
            <path d="M85 427 L185 279 M175 434 L275 286 M265 440 L365 292 M355 447 L455 299 M445 453 L545 305 M535 460 L635 312"/>
          </g>
          <path d="M90 390 C168 294 270 360 324 259 S450 214 484 151 S561 120 618 67 L652 114 C573 171 552 134 517 203 S396 255 365 315 S232 366 168 431 Z" fill="url(#ribbon-fill)" stroke="url(#ribbon-edge)" strokeWidth="1.2"/>
          <g fill="none" stroke="#c7d0d7" strokeWidth="1" opacity=".55">
            <path d="M116 404 C195 322 287 365 339 278 S469 236 497 170 S587 151 630 86"/>
            <path d="M141 417 C212 345 311 378 352 298 S485 250 507 186 S598 164 642 101"/>
          </g>
          <path d="M127 408 C202 328 289 367 343 283 S461 235 501 176 S589 151 635 92" fill="none" stroke="#9eaab4" strokeWidth="2"/>
          <g className="local-windows" fill="none" stroke="#54816a" strokeWidth="5" strokeLinecap="round">
            <path d="M145 391 Q165 371 189 362"/><path d="M281 341 Q303 331 317 315"/><path d="M419 229 Q442 226 459 217"/>
            <g fill="#54816a" stroke="white" strokeWidth="2"><circle cx="145" cy="391" r="5"/><circle cx="189" cy="362" r="5"/><circle cx="281" cy="341" r="5"/><circle cx="317" cy="315" r="5"/><circle cx="419" cy="229" r="5"/><circle cx="459" cy="217" r="5"/></g>
          </g>
          <g className="drift-trajectory">
            <path className="drift-line" pathLength="1" d="M127 408 C202 328 289 367 324 314 S390 313 429 336 S503 354 554 380 S605 401 641 405" fill="none" stroke="#b56755" strokeWidth="3" strokeDasharray="5 6"/>
            <circle cx="429" cy="336" r="5" fill="#b56755"/><circle cx="554" cy="380" r="5" fill="#b56755"/><circle cx="641" cy="405" r="5" fill="#b56755"/>
            <text x="441" y="438" fill="#a36554" fontSize="15">Delayed failure states</text>
          </g>
          <g className="matched-trajectory">
            <path className="matching-line" pathLength="1" d="M127 408 C202 328 289 367 343 283 S461 235 501 176 S589 151 635 92" fill="none" stroke="#3157a4" strokeWidth="4" strokeLinecap="round"/>
            <g fill="url(#node-blue)" stroke="white" strokeWidth="1.5"><circle cx="189" cy="362" r="6"/><circle cx="317" cy="315" r="6"/><circle cx="419" cy="229" r="6"/><circle cx="501" cy="176" r="6"/><circle cx="594" cy="133" r="6"/></g>
            <g stroke="#3157a4" fill="none" strokeWidth="1.5" strokeDasharray="4 5" opacity=".65"><path d="M392 114 Q372 178 419 219"/><path d="M497 83 Q470 120 497 165"/><path d="M587 56 Q565 83 590 123"/></g>
            <text x="260" y="81" fill="#3157a4" fontSize="16">Long-horizon teacher guidance</text>
          </g>
          <g fill="#77848e" fontSize="14"><text x="65" y="465">Initial context</text><text x="65" y="121" transform="rotate(-90 65 121)">time</text><path d="M59 244 V70" stroke="#8b959d" markerEnd="url(#time-arrow)"/><text x="381" y="174" transform="rotate(-24 381 174)" fontFamily="Georgia, serif" fontStyle="italic" fontSize="18">Temporal manifold</text></g>
        </svg>
      </div>
      <div className="motivation-copy" key={chapter} style={{ "--chapter-color": current.color } as React.CSSProperties}>
        <p className="motivation-number">0{chapter + 1} / 03</p><h2>{current.title}</h2><p>{current.text}</p><div className="motivation-detail">{current.detail}</div>
      </div>
    </div>
    <div className="motivation-controls" aria-label="Animation chapters">
      {chapters.map((item, index) => <button key={item.label} className={index === chapter ? "active" : ""} aria-pressed={index === chapter} onClick={() => { setChapter(index); setPlaying(false); }}><span>0{index + 1}</span>{item.label}<i key={`${chapter}-${playing}`} /></button>)}
    </div>
    <figcaption>Conceptual illustration adapted from our teaser. LongForcing extends the final distribution-matching stage; the student architecture and inference cost stay unchanged. The diagram does not imply guaranteed recovery or teacher supervision at inference time.</figcaption>
  </figure>;
}

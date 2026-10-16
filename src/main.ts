import "./style.css";

// ============================================================
// i18n
// ============================================================

const lang = document.documentElement.lang === "en" ? "en" : "zh";

const i18n = {
  zh: {
    stops: [
      [5, "📱 小模型 — 能聊，但经常离谱"] as [number, string],
      [20, "💻 中等模型 — 基本可用"] as [number, string],
      [45, "🖥️ 大模型 — 相当靠谱"] as [number, string],
      [65, "🧠 Claude-class"] as [number, string],
      [85, "🏆 Frontier — 接近无损"] as [number, string],
      [100, "🌌 人脑（理论上限）"] as [number, string],
    ],
    movies: [
      { emoji: "🏙️💤🔄🌀🏨🎯🔫💼🧊🌊🏔️🔑🎲🕰️🪞🚂🌉👤🎭⏱️🏗️💉", answer: "盗梦空间 Inception" },
      { emoji: "👨‍🚀🌽🕳️📚⏰👨‍👧🌊🪐🚀🏠📻🌌🤖💧🧊🕰️👴📊🛰️🌑🔭⏳", answer: "星际穿越 Interstellar" },
      { emoji: "🎸💀🌺🇲🇽👦🐕🌉🎶💜🦴🎭👴📸🌮🎺🕯️👻🌼🎪🦋💛🌅", answer: "寻梦环游记 Coco" },
      { emoji: "☄️🏙️🏔️👧👦🔄💫🎀📱✨🌅💧🕐🗾🎐🧵🌸💕🚃🔔🌌🪢", answer: "你的名字 Your Name" },
      { emoji: "🦑🎮👔💸🔴🟢🪆🍬📐🔫🦺🛏️🪜🎭💀⭕🔺🟥💉🌉🏆💰", answer: "鱿鱼游戏 Squid Game" },
      {
        emoji: "🦇🃏🏙️💣🔥🚔🏥💰🎭🪙🤡🚗💀🏢🗡️⚖️🌃🦸‍♂️🚁📞🎪🌑",
        answer: "蝙蝠侠：黑暗骑士 The Dark Knight",
      },
    ],
    quizPrompt:
      "我们来玩 emoji 猜影视作品。规则：1. 你只能用 emoji 输出，不能用文字，除非我说放弃当前题目。2. 每部作品用 22 个 emoji 表达一个经典桥段。3. 我猜对了自动下一题，猜错了给提示。选择要跳跃一点。",
    copied: "已复制 ✓",
    copyPrompt: "复制 Prompt",
  },
  en: {
    stops: [
      [5, "📱 Small model — can chat, often wrong"] as [number, string],
      [20, "💻 Mid-size model — mostly usable"] as [number, string],
      [45, "🖥️ Large model — quite reliable"] as [number, string],
      [65, "🧠 Claude-class"] as [number, string],
      [85, "🏆 Frontier — near lossless"] as [number, string],
      [100, "🌌 Human brain (theoretical ceiling)"] as [number, string],
    ],
    movies: [
      { emoji: "🏙️💤🔄🌀🏨🎯🔫💼🧊🌊🏔️🔑🎲🕰️🪞🚂🌉👤🎭⏱️🏗️💉", answer: "Inception" },
      { emoji: "👨‍🚀🌽🕳️📚⏰👨‍👧🌊🪐🚀🏠📻🌌🤖💧🧊🕰️👴📊🛰️🌑🔭⏳", answer: "Interstellar" },
      { emoji: "🎸💀🌺🇲🇽👦🐕🌉🎶💜🦴🎭👴📸🌮🎺🕯️👻🌼🎪🦋💛🌅", answer: "Coco" },
      { emoji: "☄️🏙️🏔️👧👦🔄💫🎀📱✨🌅💧🕐🗾🎐🧵🌸💕🚃🔔🌌🪢", answer: "Your Name (君の名は)" },
      { emoji: "🦑🎮👔💸🔴🟢🪆🍬📐🔫🦺🛏️🪜🎭💀⭕🔺🟥💉🌉🏆💰", answer: "Squid Game" },
      { emoji: "🦇🃏🏙️💣🔥🚔🏥💰🎭🪙🤡🚗💀🏢🗡️⚖️🌃🦸‍♂️🚁📞🎪🌑", answer: "The Dark Knight" },
    ],
    quizPrompt:
      "Let's play emoji movie guessing! Rules: 1. You can only output emoji, no text, unless I give up. 2. Use 22 emoji per movie depicting an iconic scene. 3. Auto next if I guess right, give hints if wrong. Be creative with your choices.",
    copied: "Copied ✓",
    copyPrompt: "Copy Prompt",
  },
};

const t = i18n[lang];

// ============================================================
// Slide engine with fragment support
// ============================================================

const slides = Array.from(document.querySelectorAll<HTMLElement>(".slide"));
let current = 0;

// Fragment tracking: which fragment index is visible per slide
const fragmentState = new Map<number, number>();

function getFragments(slideIdx: number): HTMLElement[] {
  return Array.from(slides[slideIdx].querySelectorAll<HTMLElement>("[data-f]")).sort(
    (a, b) => Number(a.dataset.f) - Number(b.dataset.f),
  );
}

function maxFragment(slideIdx: number): number {
  const frags = getFragments(slideIdx);
  if (frags.length === 0) return 0;
  // Count unique fragment indices
  const unique = new Set(frags.map((el) => Number(el.dataset.f)));
  return unique.size;
}

function currentFragment(slideIdx: number): number {
  return fragmentState.get(slideIdx) ?? 0;
}

function showFragmentsUpTo(slideIdx: number, n: number) {
  const frags = getFragments(slideIdx);
  // Get sorted unique fragment values
  const vals = [...new Set(frags.map((el) => Number(el.dataset.f)))].sort((a, b) => a - b);
  const visibleVals = new Set(vals.slice(0, n));
  frags.forEach((el) => {
    el.classList.toggle("f-visible", visibleVals.has(Number(el.dataset.f)));
  });
  fragmentState.set(slideIdx, n);
  if (slideIdx === current) updateHash();
}

function goto(index: number, direction?: "forward" | "backward") {
  const clamped = Math.max(0, Math.min(index, slides.length - 1));
  if (clamped === current) return;
  const dir = direction ?? (clamped > current ? "forward" : "backward");
  const prevSlide = slides[current];
  const nextSlide = slides[clamped];
  prevSlide.classList.remove("active");
  prevSlide.classList.add(dir === "forward" ? "exit-left" : "exit-right");
  nextSlide.classList.remove("exit-left", "exit-right");
  nextSlide.classList.add("active");
  const prevIdx = current;
  current = clamped;
  // Forward → initial state (0 fragments); backward → fully played (all fragments)
  if (dir === "backward") {
    showFragmentsUpTo(clamped, maxFragment(clamped));
  } else {
    showFragmentsUpTo(clamped, 0);
  }
  updateProgress();
  setTimeout(() => slides[prevIdx].classList.remove("exit-left", "exit-right"), 600);
}

// Step fragment forward; if at end, go to next slide
function stepForward() {
  const cur = currentFragment(current);
  const max = maxFragment(current);
  if (cur < max) {
    showFragmentsUpTo(current, cur + 1);
  } else {
    goto(current + 1, "forward");
  }
}

// Step fragment backward; if at start, go to previous slide
function stepBackward() {
  const cur = currentFragment(current);
  if (cur > 0) {
    showFragmentsUpTo(current, cur - 1);
  } else {
    goto(current - 1, "backward");
  }
}

function updateProgress() {
  const bar = document.getElementById("progress-bar") as HTMLElement | null;
  if (bar) bar.style.width = `${((current + 1) / slides.length) * 100}%`;
  const counter = document.getElementById("slide-counter");
  if (counter) counter.textContent = `${current + 1} / ${slides.length}`;
  updateHash();
}

// ============================================================
// Hash navigation: #slide or #slide.fragment (1-indexed)
// ============================================================

function updateHash() {
  const frag = currentFragment(current);
  const hash = frag > 0 ? `${current + 1}.${frag}` : `${current + 1}`;
  history.replaceState(null, "", `#${hash}`);
}

// Parse hash: #5 = slide 5 initial, #5.3 = slide 5 fragment 3, #5. = slide 5 all fragments
function parseHash(): { slide: number; fragment: number } | null {
  const h = location.hash.replace("#", "");
  if (!h) return null;
  const parts = h.split(".");
  const slide = parseInt(parts[0], 10) - 1; // 1-indexed → 0-indexed
  if (isNaN(slide) || slide < 0 || slide >= slides.length) return null;
  // "5." (trailing dot, empty after dot) means all fragments
  const fragment =
    parts.length > 1 && parts[1] === ""
      ? maxFragment(slide)
      : parts[1]
        ? parseInt(parts[1], 10)
        : 0;
  return { slide, fragment };
}

function applyHash() {
  const target = parseHash();
  if (!target) return false;
  // Directly activate the target slide without transition
  slides[current].classList.remove("active");
  slides[target.slide].classList.add("active");
  current = target.slide;
  const frag = Math.min(target.fragment, maxFragment(current));
  showFragmentsUpTo(current, frag);
  const bar = document.getElementById("progress-bar") as HTMLElement | null;
  if (bar) bar.style.width = `${((current + 1) / slides.length) * 100}%`;
  const counter = document.getElementById("slide-counter");
  if (counter) counter.textContent = `${current + 1} / ${slides.length}`;
  return true;
}

// ============================================================
// Overview mode
// ============================================================

let overviewActive = false;

function buildOverview() {
  let container = document.getElementById("overview");
  if (container) {
    scaleOverviewThumbs(container);
    return container;
  }
  container = document.createElement("div");
  container.id = "overview";
  container.className = "overview";
  document.body.appendChild(container);

  slides.forEach((slide, i) => {
    const thumb = document.createElement("div");
    thumb.className = "overview-thumb" + (i === current ? " current" : "");
    thumb.dataset.index = String(i);

    // Clone slide content into a scaled wrapper, with all fragments visible
    const inner = document.createElement("div");
    inner.className = "overview-inner";
    const clone = slide.cloneNode(true) as HTMLElement;
    // Show all fragments in the clone
    clone.querySelectorAll("[data-f]").forEach((el) => {
      el.classList.add("f-visible");
    });
    inner.innerHTML = clone.innerHTML;
    thumb.appendChild(inner);

    // Label — extract slide title text for mobile
    const label = document.createElement("div");
    label.className = "overview-label";
    const titleOverride = slide.dataset.title;
    const titleEl = slide.querySelector(".title-mega") || slide.querySelector(".title-large");
    const titleText = titleOverride ?? (titleEl ? (titleEl.textContent?.trim() ?? "") : "");
    label.textContent = titleText ? `${i + 1}. ${titleText}` : `${i + 1}`;
    thumb.appendChild(label);

    thumb.addEventListener("click", () => {
      toggleOverview(false);
      if (i === current) {
        showFragmentsUpTo(current, 0);
      } else {
        goto(i, "forward");
      }
    });
    container.appendChild(thumb);
  });

  scaleOverviewThumbs(container);
  return container;
}

// Render overview-inner at a fixed "desktop" size, scale to fit thumb
const REF_W = 1280;
const REF_H = 800;

function scaleOverviewThumbs(container: HTMLElement) {
  const thumbs = container.querySelectorAll<HTMLElement>(".overview-thumb");
  if (thumbs.length === 0) return;
  requestAnimationFrame(() => {
    const thumbW = thumbs[0].clientWidth;
    if (thumbW === 0) return;
    const scale = thumbW / REF_W;
    container.querySelectorAll<HTMLElement>(".overview-inner").forEach((inner) => {
      inner.style.width = REF_W + "px";
      inner.style.height = REF_H + "px";
      inner.style.transform = `scale(${scale})`;
    });
  });
}

function toggleOverview(show?: boolean) {
  overviewActive = show ?? !overviewActive;
  const container = buildOverview();

  // Update current marker
  container.querySelectorAll(".overview-thumb").forEach((el, i) => {
    el.classList.toggle("current", i === current);
  });

  container.classList.toggle("active", overviewActive);
  document.body.classList.toggle("overview-active", overviewActive);
}

// ============================================================
// Navigation
// ============================================================

document.addEventListener("keydown", (e) => {
  const overlay = document.getElementById("iframe-overlay");
  if (overlay && overlay.style.display !== "none") {
    if (e.key === "Escape") closeOverlay();
    return;
  }

  if (e.key === "Escape") {
    e.preventDefault();
    toggleOverview();
    return;
  }

  if (overviewActive) {
    // In overview, arrows navigate the grid
    if (["ArrowRight", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
      const next = Math.min(current + 1, slides.length - 1);
      goto(next);
      const container = document.getElementById("overview");
      container?.querySelectorAll(".overview-thumb").forEach((el, i) => {
        el.classList.toggle("current", i === current);
      });
    } else if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
      e.preventDefault();
      const prev = Math.max(current - 1, 0);
      goto(prev);
      const container = document.getElementById("overview");
      container?.querySelectorAll(".overview-thumb").forEach((el, i) => {
        el.classList.toggle("current", i === current);
      });
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleOverview(false);
    }
    return;
  }

  // Normal slide mode
  if (["ArrowRight", " ", "PageDown"].includes(e.key)) {
    e.preventDefault();
    goto(current + 1, "forward");
  } else if (["ArrowLeft", "PageUp"].includes(e.key)) {
    e.preventDefault();
    goto(current - 1, "backward");
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    stepForward();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    stepBackward();
  }
});

// ============================================================
// iframe overlay
// ============================================================

function openOverlay(url: string, mobile = false) {
  const overlay = document.getElementById("iframe-overlay")!;
  const content = overlay.querySelector(".iframe-overlay-content")!;
  const iframe = document.getElementById("overlay-iframe") as HTMLIFrameElement;
  iframe.src = url;
  content.classList.toggle("mobile", mobile);
  overlay.style.display = "flex";
}

function closeOverlay() {
  const overlay = document.getElementById("iframe-overlay")!;
  const iframe = document.getElementById("overlay-iframe") as HTMLIFrameElement;
  overlay.style.display = "none";
  iframe.src = "";
}

function setupOverlay() {
  document.getElementById("iframe-close")?.addEventListener("click", closeOverlay);
  document.querySelector(".iframe-overlay-bg")?.addEventListener("click", closeOverlay);

  document.querySelectorAll<HTMLElement>(".clickable[data-url]").forEach((el) => {
    el.addEventListener("click", () => {
      const url = el.dataset.url;
      const mobile = el.dataset.mobile === "true";
      if (url) openOverlay(url, mobile);
    });
  });
}

// ============================================================
// JPEG compression demo
// ============================================================

function setupJpegDemo() {
  const canvas = document.getElementById("jpeg-canvas") as HTMLCanvasElement;
  if (!canvas) return;
  const ctx = canvas.getContext("2d")!;
  const slider = document.getElementById("jpeg-slider") as HTMLInputElement;
  const label = document.getElementById("jpeg-quality-label");

  const W = 600;
  const H = 400;
  canvas.width = W;
  canvas.height = H;

  // Load the gorilla photo as source
  const srcImg = new Image();
  srcImg.src = "/mike-arney-gorilla.jpg";

  function drawOriginal() {
    ctx.drawImage(srcImg, 0, 0, W, H);
  }

  let rafId = 0;
  function compress(quality: number) {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      drawOriginal();
      const url = canvas.toDataURL("image/jpeg", quality);
      const im = new Image();
      im.onload = () => {
        ctx.clearRect(0, 0, W, H);
        ctx.drawImage(im, 0, 0);
      };
      im.src = url;
    });
  }

  const stops = t.stops;

  function updateLabel(v: number) {
    if (label) {
      let best = stops[0];
      for (const s of stops) {
        if (Math.abs(s[0] - v) < Math.abs(best[0] - v)) best = s;
      }
      const vStr = String(v).padStart(3, "\u2007");
      label.innerHTML = `Quality:&nbsp;${vStr}% — ${best[1]}`;
    }
  }

  slider?.addEventListener("input", () => {
    const v = Number(slider.value);
    // Steep curve: accelerate decay so 60%+ still shows visible difference
    const quality = Math.max(0.01, (v / 100) ** 4);
    compress(quality);
    updateLabel(v);
  });

  // Start after image loads
  srcImg.onload = () => {
    const v = Number(slider?.value ?? 50);
    const quality = Math.max(0.01, (v / 100) ** 4);
    compress(quality);
    updateLabel(v);
  };
}

// ============================================================
// Emoji quiz (影视作品)
// ============================================================

const movies = t.movies;
let mIdx = 0;
const QUIZ_PROMPT = t.quizPrompt;

function setupEmojiQuiz() {
  const display = document.getElementById("emoji-display");
  const reveal = document.getElementById("emoji-reveal");
  const answer = document.getElementById("emoji-answer");
  const nextBtn = document.getElementById("emoji-next");
  const startBtn = document.getElementById("emoji-start");
  const teaser = document.getElementById("emoji-teaser");
  const game = document.getElementById("emoji-game");
  if (!display) return;

  // Set ChatGPT link href
  const chatLink = document.getElementById("chatgpt-quiz-link") as HTMLAnchorElement;
  if (chatLink) {
    chatLink.href = `https://chatgpt.com/?q=${encodeURIComponent(QUIZ_PROMPT)}`;
  }

  function show() {
    display!.textContent = movies[mIdx].emoji;
    answer!.textContent = "???";
    answer!.classList.remove("revealed");
  }

  startBtn?.addEventListener("click", () => {
    teaser!.style.display = "none";
    game!.style.display = "flex";
    show();
  });

  reveal?.addEventListener("click", () => {
    answer!.textContent = movies[mIdx].answer;
    answer!.classList.add("revealed");
  });

  nextBtn?.addEventListener("click", () => {
    mIdx = (mIdx + 1) % movies.length;
    show();
  });

  // Copy prompt button
  document.getElementById("copy-prompt")?.addEventListener("click", () => {
    navigator.clipboard
      .writeText(QUIZ_PROMPT)
      .then(() => {
        const btn = document.getElementById("copy-prompt")!;
        btn.textContent = t.copied;
        setTimeout(() => {
          btn.textContent = t.copyPrompt;
        }, 2000);
      })
      .catch(() => {
        // Clipboard access can be denied; leave the button ready to retry.
      });
  });
}

// ============================================================
// AI taste toggle
// ============================================================

function setupAiTasteToggle() {
  const iframe = document.getElementById("ai-iframe") as HTMLIFrameElement;
  const frame = iframe?.closest(".ai-taste-frame") as HTMLElement | null;
  const btns = document.querySelectorAll<HTMLButtonElement>(".taste-btn");
  if (!iframe || btns.length === 0) return;

  // Scale iframe on mobile: render at desktop size, scale down to fill width
  function scaleIframe() {
    if (!frame || !iframe) return;
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      // Portrait ratio for mobile, leave room for buttons below
      const refW = 430;
      const refH = 580;
      const availW = window.innerWidth;
      const scale = availW / refW;
      iframe.style.width = refW + "px";
      iframe.style.height = refH + "px";
      iframe.style.transform = `scale(${scale})`;
      iframe.style.transformOrigin = "top left";
      frame.style.height = Math.round(refH * scale) + "px";
      frame.style.overflow = "hidden";
    } else {
      iframe.style.width = "";
      iframe.style.height = "";
      iframe.style.transform = "";
      iframe.style.transformOrigin = "";
      frame.style.height = "";
      frame.style.overflow = "";
    }
  }
  scaleIframe();
  window.addEventListener("resize", scaleIframe);

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = btn.dataset.src;
      if (src) {
        iframe.src = src;
        btns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      }
    });
  });
}

// ============================================================
// Init
// ============================================================

if (slides.length > 0) {
  slides[0].classList.add("active");
  // Apply hash navigation or default to first slide
  if (!applyHash()) {
    showFragmentsUpTo(0, maxFragment(0));
  }
}
updateProgress();

// Handle browser back/forward
window.addEventListener("hashchange", () => {
  applyHash();
});
setupJpegDemo();
setupEmojiQuiz();
setupAiTasteToggle();
setupOverlay();

// Mobile nav bar
document
  .getElementById("mnav-prev")
  ?.addEventListener("click", () => goto(current - 1, "backward"));
document.getElementById("mnav-next")?.addEventListener("click", () => goto(current + 1, "forward"));
document.getElementById("mnav-up")?.addEventListener("click", () => stepBackward());
document.getElementById("mnav-down")?.addEventListener("click", () => stepForward());
document.getElementById("mnav-overview")?.addEventListener("click", () => toggleOverview());

// Remove FOUC guard: double-rAF ensures initial state is fully painted
// before enabling transitions and making app visible
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    const app = document.getElementById("app");
    if (app) {
      app.style.opacity = "";
      app.classList.add("ready");
    }
  });
});

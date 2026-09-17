/* =========================================================
   侯如蓁 · Personal Page — app.js
   功能：Live Clock / 問候語 / 12H-24H 切換 / 時區 /
        Copy Timestamp / localStorage 記憶 / 主題切換 /
        進場動畫 / Particle 背景
   ========================================================= */

"use strict";

/* ---------- 小工具：safe querySelector ---------- */
const $ = (id) => document.getElementById(id);

/* =========================================================
   1. Live Clock（即時時鐘）
   ========================================================= */
const clockTimeEl   = $("clockTime");
const clockDateEl   = $("clockDate");
const clockPeriodEl = $("clockPeriod");
const clockTzEl     = $("clockTz");
const greetingEl    = $("greetingText");

// 是否使用 24 小時制（從 localStorage 讀取，預設 true）
let use24Hour = localStorage.getItem("use24Hour") !== "false";

// 補零：9 -> "09"
const pad = (n) => String(n).padStart(2, "0");

// 星期與月份對照
const WEEKDAYS = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];

/** 更新時鐘（每秒呼叫一次） */
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // --- 時間字串 ---
  let period = "";
  if (!use24Hour) {
    period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // 0 點顯示為 12
  }
  clockTimeEl.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  clockPeriodEl.textContent = period;

  // --- 日期字串 ---
  clockDateEl.textContent =
    `${now.getFullYear()}/${pad(now.getMonth() + 1)}/${pad(now.getDate())} ${WEEKDAYS[now.getDay()]}`;

  // --- 問候語（依小時，用原始 24 小時判斷）---
  updateGreeting(now.getHours());
}

let lastGreeting = "";   // 記住上次的問候語，避免每秒重打
let greetTimer = null;

/** 打字效果：一個字一個字打出 text */
function typeGreeting(text) {
  clearTimeout(greetTimer);
  const chars = Array.from(text);   // 以字元（含 emoji）為單位
  let i = 0;
  (function step() {
    greetingEl.textContent = chars.slice(0, i).join("");
    if (i < chars.length) {
      i++;
      greetTimer = setTimeout(step, 90);
    }
  })();
}

/** 依時間顯示 Good Morning / Afternoon / Evening（打字呈現） */
function updateGreeting(hour) {
  let text;
  if (hour < 5)       text = "Good Night 🌙";
  else if (hour < 12) text = "Good Morning ☀️";
  else if (hour < 18) text = "Good Afternoon 🌤️";
  else                text = "Good Evening 🌆";
  // 只有問候語改變時才重新打字（初次載入 or 跨時段）
  if (text !== lastGreeting) {
    lastGreeting = text;
    typeGreeting(text);
  }
}

/** 顯示使用者的時區 */
function showTimezone() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    clockTzEl.textContent = `🌍 ${tz}`;
  } catch (e) {
    clockTzEl.textContent = "🌍 —";
  }
}

// 啟動時鐘：先立即更新一次，再每秒更新
updateClock();
setInterval(updateClock, 1000);
showTimezone();

/* =========================================================
   2. 12H / 24H 切換按鈕
   ========================================================= */
$("formatToggle").addEventListener("click", () => {
  use24Hour = !use24Hour;
  localStorage.setItem("use24Hour", use24Hour); // 記住偏好
  updateClock(); // 立即反映
  showToast(use24Hour ? "已切換為 24 小時制" : "已切換為 12 小時制");
});

/* =========================================================
   3. Copy Timestamp 按鈕（複製目前時間戳記）
   ========================================================= */
$("copyBtn").addEventListener("click", async () => {
  const now = new Date();
  // 產生易讀 + ISO 兩種資訊
  const stamp = now.toISOString();
  try {
    await navigator.clipboard.writeText(stamp);
    showToast("已複製時間戳記 ✔");
  } catch (e) {
    // 後備方案：某些瀏覽器/非 https 無法用 clipboard API
    showToast(`複製失敗，時間為：${stamp}`);
  }
});

/* =========================================================
   4. Toast 提示
   ========================================================= */
const toastEl = $("toast");
let toastTimer = null;
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2200);
}

/* =========================================================
   5. 深色 / 淺色主題切換（localStorage 記憶）
   ========================================================= */
const themeToggle = $("themeToggle");
const themeIcon = themeToggle.querySelector(".theme-icon");

/** 套用主題 */
function applyTheme(theme) {
  if (theme === "light") {
    document.body.classList.add("light");
    themeIcon.textContent = "☀️";
  } else {
    document.body.classList.remove("light");
    themeIcon.textContent = "🌙";
  }
}

// 初始化：讀取儲存的偏好（預設 dark）
applyTheme(localStorage.getItem("theme") || "dark");

themeToggle.addEventListener("click", () => {
  const isLight = document.body.classList.toggle("light");
  const theme = isLight ? "light" : "dark";
  themeIcon.textContent = isLight ? "☀️" : "🌙";
  localStorage.setItem("theme", theme);
});

/* =========================================================
   6. 進場動畫（IntersectionObserver）
   ========================================================= */
const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // 只觸發一次
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => observer.observe(el));

/* =========================================================
   7. 頁尾年份
   ========================================================= */
$("year").textContent = new Date().getFullYear();

/* =========================================================
   8. 捲動進度條
   ========================================================= */
(function initScrollProgress() {
  const bar = $("scrollProgress");
  if (!bar) return;
  function update() {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const ratio = max > 0 ? doc.scrollTop / max : 0;
    bar.style.width = (ratio * 100) + "%";
  }
  window.addEventListener("scroll", update, { passive: true });
  update();
})();

/* =========================================================
   9. 回到頂端按鈕
   ========================================================= */
(function initBackToTop() {
  const btn = $("backToTop");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

/* =========================================================
   10. Particle 背景動畫（輕量粒子 + 連線）
   ========================================================= */
(function initParticles() {
  const canvas = $("particles");
  if (!canvas) return;

  // 尊重「減少動態」偏好：直接不啟用粒子動畫
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const ctx = canvas.getContext("2d");
  let width, height, particles;

  // 依螢幕大小決定粒子數量（手機少一點）
  function particleCount() {
    return window.innerWidth < 640 ? 34 : 70;
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    const count = particleCount();
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 1,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      // 邊界反彈
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // 畫粒子
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(251, 113, 133, 0.7)";
      ctx.fill();

      // 畫鄰近粒子間的連線
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(251, 191, 36, ${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();

  // 視窗大小改變時重建
  window.addEventListener("resize", () => {
    resize();
    createParticles();
  });
})();

# 🌐 侯如蓁 · Personal Page

一個使用 **純 HTML + CSS + JavaScript**(不使用任何框架)打造的個人網站,
部署於 **GitHub Pages**。

> 主題風格:Glassmorphism(玻璃擬態)+ Dark Mode · 珊瑚橘 + 暖黃配色

## 🔗 連結

- **Live Website**:<https://ruzzzhen.github.io/DIC1_PersonalPage/>
- **GitHub Repository**:<https://github.com/ruzzzhen/DIC1_PersonalPage>

---

## ✨ 功能特色

| 區塊 | 說明 |
|------|------|
| 👤 **Profile** | 姓名、科系、個人頭像、自我介紹 |
| 🛠 **Skills** | 8 項技能:Python、C/C++、NLP、MCP、RAG、PyTorch、LLM Agent、Backend |
| 🚀 **Projects** | 4 個專案:Medical Agent、Fact Checking System、AI Learning Assistant、LLM Course Q&A |
| 🕐 **Live Clock** | JavaScript 即時時鐘,每秒自動更新 HH:MM:SS |

### 🎁 加分功能

- 🌅 依時間顯示 **Good Morning / Afternoon / Evening** 問候語
- 🔄 **12H / 24H** 時間格式切換
- 🌍 自動偵測並顯示使用者的 **Time Zone**
- 📋 **Copy Timestamp** 一鍵複製目前時間戳記(ISO 格式)
- 🌙 **深色 / 淺色** 模式切換
- 💾 使用 **localStorage** 記住偏好(主題、時間格式)
- 🌌 **Particle 背景動畫**(粒子 + 連線)
- 📱 **Responsive Design**,手機(375px)與電腦皆正常顯示
- ✨ 進場動畫、卡片陰影、hover 特效

---

## 📁 檔案結構

```
DIC1_PersonalPage/
├── index.html   # 網頁結構
├── style.css    # 樣式、RWD、動畫
├── app.js       # 時鐘、互動、粒子背景邏輯
├── profile.jpg  # 頭像圖片
└── README.md    # 說明文件
```

---

## 💻 如何在本機開啟

**方法一(最簡單):** 直接用瀏覽器開啟 `index.html`。

**方法二(建議):** 用本機伺服器開啟,可確保剪貼簿等功能正常

```bash
python3 -m http.server 8000
```

接著在瀏覽器開啟 <http://localhost:8000>

---

## 🚀 部署方式(GitHub Pages)

1. 將程式碼 Push 到 GitHub 的 `main` 分支
2. 進入 Repository 的 **Settings → Pages**
3. **Source** 選 `Deploy from a branch`,**Branch** 選 `main` / `/ (root)`,按 Save
4. 稍待 1~2 分鐘即完成部署,即可透過 Live Website 網址開啟

---

## 🎨 客製化

- **換頭像**:替換 `profile.jpg`(建議正方形圖片)
- **修改技能 / 專案**:編輯 `index.html` 對應區塊
- **調整配色**:修改 `style.css` 最上方的 `:root` CSS 變數(如 `--neon-purple`、`--accent-grad`)

---

Built with ❤️ using HTML / CSS / JavaScript · Deployed on GitHub Pages

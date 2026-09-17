# 🌐 侯如蓁 · Personal Page

一個使用 **純 HTML + CSS + JavaScript**(不使用任何框架)打造的個人網站,
可直接部署在 **GitHub Pages** 上。

> 主題風格:Glassmorphism(玻璃擬態)+ Dark Mode + 霓虹紫藍配色

---

## ✨ 功能特色

| 區塊 | 說明 |
|------|------|
| 👤 **Profile** | 姓名、科系、漸層 Avatar 佔位、自我介紹 |
| 🛠 **Skills** | Python、C/C++、NLP、MCP 技能卡片(含圖示與 hover 動畫) |
| 🚀 **Projects** | 專案卡片:名稱、描述、技術標籤、GitHub 連結 |
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
DIC-1/
├── index.html   # 網頁結構
├── style.css    # 樣式與 RWD、動畫
├── app.js       # 時鐘、互動、粒子背景邏輯
└── README.md    # 說明文件
```

---

## 💻 如何在本機開啟

**方法一(最簡單):** 直接用瀏覽器開啟 `index.html` 即可。

**方法二(建議,避免部分瀏覽器限制):** 用本機伺服器開啟

```bash
# 使用 Python 內建伺服器
python3 -m http.server 8000
```

接著在瀏覽器開啟 <http://localhost:8000>

> 💡 使用本機伺服器可確保「Copy Timestamp」的剪貼簿功能在所有瀏覽器正常運作。

---

## 🚀 部署到 GitHub Pages

1. 建立 GitHub Repository(例如 `DIC1_PersonalPage`)
2. 將所有檔案 **Commit → Push** 到 `main` 分支
3. 進入 Repository 的 **Settings → Pages**
4. 設定 **Branch: `main`** / **Folder: `/ (root)`**,按 Save
5. 稍等片刻,即可透過以下網址開啟你的網站:

```
https://YOUR_NAME.github.io/DIC1_PersonalPage/
```

---

## 🎨 客製化

- **換成自己的照片**:在 `index.html` 中把 `.avatar` 區塊改成 `<img src="your-photo.jpg" alt="頭像">`
- **修改技能 / 專案**:直接編輯 `index.html` 對應區塊
- **調整配色**:修改 `style.css` 最上方的 `:root` CSS 變數(如 `--neon-purple`、`--neon-blue`)
- **更新 GitHub 連結**:把 `href="#"` 換成你的實際連結

---

Built with ❤️ using HTML / CSS / JavaScript · Deployed on GitHub Pages

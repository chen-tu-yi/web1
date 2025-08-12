# Figma → Code Starter

這個範例專案示範如何把 Figma 設計轉成乾淨的 HTML/CSS：
- 以 **Design Tokens（CSS 變數）** 定義品牌色、字體大小、間距與圓角
- 使用 **Flex/Grid** 排版，SVG 只負責 Logo/Icon/插畫
- 可直接在 VS Code 打開 `index.html` 預覽（無需建置流程）

## 如何把你的 Figma 樣式套進來
1. **抽取 Design Tokens**
   - 顏色：把主色、輔色、灰階對應到 `styles.css` 的 `--brand / --accent / --ink / --muted / --bg` 等變數。
   - 圓角：把常見圓角值（例如 12、16）填入 `--radius`。
   - 字體：若有品牌字體，於 `<head>` 引入 Webfont，再於 `body{ font-family: ... }` 套用。
   - 間距：將 Figma 的 spacing scale（8/12/16/24/32...）對應到 `--space-*`。

2. **資產匯出**
   - 在 Figma 對 **Logo/Icon/插畫** 匯出為 SVG 放到 `assets/svg`。
   - 在 `index.html` 以 `<img src="assets/svg/xxx.svg">` 或直接貼 SVG 內嵌。

3. **版面與尺寸**
   - 參考你 Figma 的 Frame 寬度（例如 1440）來設定 `.container` 的 `--container`。
   - 依據設計，調整 `--h1/--h2/--lead` 的大小。

4. **互動 & 響應式**
   - 若 Figma 有 hover/active：在 `styles.css` 補上 `:hover` 狀態。
   - 手機斷點：預設 900px，可改為你專案的 Breakpoints。

## 常見問題
- **整頁用一張 SVG？** 不建議。請用 HTML/CSS 排版，SVG 只當圖像。
- **SVG 顏色不好改？** 把 `fill="#xxxxxx"` 改為 `fill="currentColor"`，外層用 CSS 設 `color:`。
- **字體不同？** 請在 `<head>` 引入相同的 Webfont，或在 Figma 匯出時轉成路徑（但會失去可編輯文字）。

## 下一步
- 想用 React / Next.js：把每個 Section 拆成元件；或用 Tailwind，把 tokens 移到 `tailwind.config.js`。

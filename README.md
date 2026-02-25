# First Angular 20 Project

一個基於 Angular 20 的專案框架，包含完整的開發環境設定。

## 技術棧

- Angular 20（Zoneless + Signals）
- Angular Material 3
- TypeScript
- SCSS
- Inter 字體

## 開發工具

- **ESLint**：程式碼品質檢查
- **Prettier**：程式碼格式化
- **Husky**：Git pre-commit hook
- **lint-staged**：只檢查有改動的檔案

## 常用指令

### 啟動開發伺服器
```bash
ng serve
```

### 程式碼檢查
```bash
ng lint
```

### 格式化
```bash
npm run format
```

### 格式檢查
```bash
npm run format:check
```

## 專案結構
```
src/
├── assets/                          # 靜態資源（圖片、SVG、字體檔案）
├── styles/                          # 全域樣式
│   ├── _variables.scss              # Design System 顏色 CSS variables
│   ├── _colors.scss                 # 自動產生的 text/bg/hover utility classes
│   ├── _typography.scss             # 字體大小、粗細、行高定義
│   ├── _fonts.scss                  # Inter 字體載入（@font-face）
│   ├── _reset.scss                  # CSS reset，統一瀏覽器預設樣式
│   ├── _mixins.scss                 # 共用 SCSS mixin（flex-center、responsive）
│   └── _scrollbar.scss              # 捲軸樣式（hover 顯示／永遠顯示）
├── styles.scss                      # 全域樣式入口，統一引入所有樣式檔案
└── app/
    ├── core/                        # 單例服務、guards、interceptors
    │   ├── services/
    │   │   ├── http/                # HTTP 層，負責 API 呼叫
    │   │   ├── domain/              # 業務邏輯層
    │   │   └── dto/                 # API 請求/回應的資料結構
    │   │       ├── request/         # Request DTO
    │   │       └── response/        # Response DTO
    │   ├── guards/                  # 路由守衛
    │   ├── store/                   # 全域狀態管理（Signals）
    │   └── interceptors/            # HTTP interceptors
    ├── shared/                      # 跨功能共用資源
    │   ├── components/              # 共用元件
    │   ├── pipes/                   # 共用 pipe
    │   └── directives/              # 共用 directive
    └── features/                    # 功能模組（lazy loading）
```

---

## 樣式使用指南 (Style Guide)

### Typography 使用方式

Typography 定義於 `src/styles/_typography.scss`，有以下使用方式：

#### 方式 1：使用 Class（視覺樣式）
適用於只需要視覺樣式，但語意上不是標題的情況。
```html
<span class="h3">12,345</span>
<span class="subtitle-1">副標題文字</span>
<span class="body-2">內文文字</span>
```

#### 方式 2：使用 HTML Tag（語意化）⭐ 推薦
適用於內容本身就是標題的情況，有助於 SEO 與 Accessibility。
```html
<h1>主標題</h1>
<h2>次標題</h2>
<h3>EunoAI</h3>
```

#### 比較表

| 面向 | Class `<span class="h3">` | Tag `<h3>` |
|------|--------------------------|------------|
| 語意化 | ❌ 無語意 | ✅ 明確表達標題 |
| Accessibility | ❌ 螢幕閱讀器不認得 | ✅ 可識別標題層級 |
| SEO | ❌ 搜尋引擎不認 | ✅ 有助於 SEO |
| 使用時機 | 只要視覺樣式 | 內容是真正的標題 |

#### 可用的 Typography Classes

| 類別 | 說明 |
|------|------|
| `.h1 ~ .h5` | 標題樣式 |
| `.subtitle-1 ~ .subtitle-3` | 副標題 |
| `.body-1 ~ .body-3` | 內文 |
| `.caption-1, .caption-2` | 說明文字 |
| `.link-1 ~ .link-3` | 連結文字 |
| `.button-1, .button-2` | 按鈕文字 |
| `.menu` | 選單文字 |

---

### Helper Classes

常用的 utility classes 定義於 `styles.scss`，可在任何 template 中直接使用：
```html
<div class="h3 --show-scrollbar">EunoAI</div>
```

| Class | 說明 |
|-------|------|
| `.--show-scrollbar` | hover 時顯示滾動條 |
| `.--show-scrollbar-always` | 永遠顯示滾動條 |

#### 新增 Helper Class 指南

當你在 component SCSS 發現某個樣式可以被共用時，請將它移到 `styles.scss` 的 `// Helper` 區塊：
```scss
// styles.scss

// Helper
.--white-space-nowrap {
  white-space: nowrap;
}

// 新增的 helper class 放這裡
.--text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

或是建立一個 --text-ellipsis.scss 檔案，並在 style.scss 中引用。
```

> 命名規則：Helper class 以 `--` 開頭，使用 kebab-case。

---

### 顏色系統使用方式

本專案採用 CSS 自訂屬性（CSS Variables）+ SCSS Utilities 的方式管理顏色。

#### 可用的顏色系列

**主要顏色**
- Primary: `primary-50 ~ primary-900`、`primary-a100 / a200 / a400 / a700`
- Neutral: `neutral-50 ~ neutral-900`
- Auxiliary: `auxiliary-50 ~ auxiliary-900`

**語意化顏色**
- Red（錯誤/危險）: `red-50 ~ red-900`、`red-a100 / a200 / a400 / a700`
- Green（成功）: `green-50 ~ green-900`、`green-a100 / a200 / a400 / a700`
- Golden（警告）: `golden-50 ~ golden-900`、`golden-a100 / a200 / a400 / a700`

**其他**
- White: `white`

#### 使用方式

**文字顏色**
```html
<p class="text-primary-500">主要文字顏色</p>
<p class="text-neutral-700">次要文字顏色</p>
<span class="text-red-600">錯誤訊息</span>
<a class="text-primary-500 hover-text-primary-700">滑鼠移過時變深</a>
```

**背景顏色**
```html
<div class="bg-primary-500 text-white">主要按鈕背景</div>
<div class="bg-neutral-100">淺色背景</div>
<button class="bg-primary-500 hover-bg-primary-600 text-white">滑鼠移過時背景變深</button>
```

**組合使用**
```html
<!-- 卡片範例 -->
<div class="bg-white text-neutral-900">
  <h3 class="text-primary-600">標題</h3>
  <p class="text-neutral-700">內容文字</p>
</div>

<!-- 按鈕範例 -->
<button class="bg-primary-500 text-white hover-bg-primary-600">主要按鈕</button>

<!-- 警告訊息範例 -->
<div class="bg-golden-50 text-golden-900">
  <span class="text-golden-700">⚠️ 請注意</span>
</div>
```

**在 Component SCSS 中使用 CSS 變數**
```scss
.custom-element {
  color: var(--primary-500);
  background-color: var(--neutral-100);
  border: 1px solid var(--neutral-300);

  &:hover {
    background-color: var(--primary-50);
  }
}
```

#### 修改或新增顏色

1. 在 `src/styles/_variables.scss` 中定義新的 CSS 變數
2. 在 `src/styles/_colors.scss` 的 `$color-families` 中新增對應的顏色系列
3. 儲存後會自動生成對應的 utility classes
```scss
// _variables.scss
--new-color-500: #your-color;

// _colors.scss
$color-families: (
  // ... 其他顏色
  "new-color-": (500)
);
```

---

### 使用 mixin
在實作中若需要用到 _mixin.scss 內定義好的 style，需要先 import。
原本的 import 方法為
`@use '../../../styles/mixins' as *;`
但本專案有在 angular.json 的 stylePreprocessorOptions 設定路徑別名，這樣就可以用簡短的路徑：
`@use 'styles/mixins' as *;  // 不用管相對路徑`

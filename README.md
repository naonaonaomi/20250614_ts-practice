# TypeScript学習サイト

## 📂 プロジェクト構造

```
project/
├── public/
│   ├── ts/           # TypeScriptソースコード
│   │   ├── basic1.ts
│   │   ├── basic2.ts
│   │   └── basic3.ts
│   ├── js/           # コンパイル済みJavaScript
│   │   ├── basic1.js
│   │   ├── basic1.d.ts
│   │   └── basic1.js.map
│   ├── html/         # HTMLページ
│   └── css/          # スタイルシート
├── tsconfig.json     # TypeScript設定
└── package.json      # npm設定
```

## 🔄 開発フロー

### 1. TypeScriptで開発
```typescript
// public/ts/example.ts
export function greet(name: string): string {
    return `Hello, ${name}!`;
}
```

### 2. 自動コンパイル
```bash
npm run dev  # ファイル変更を監視
```

### 3. ブラウザで実行
```javascript
// 自動生成される public/js/example.js
export function greet(name) {
    return `Hello, ${name}!`;
}
```

## 🌐 なぜJavaScriptが必要？

- **ブラウザの制限**: `.ts`ファイルを直接実行不可
- **型安全性**: コンパイル時に型エラーを検出
- **最適化**: 効率的なJavaScriptコードを生成

## 🛠️ 開発コマンド

```bash
# 依存関係インストール
npm install

# 開発モード（ファイル監視）
npm run dev

# 本番ビルド
npm run build

# Webサイト表示
# public/index.html をブラウザで開く
```

## 📚 学習コンテンツ

1. **基礎編** - 型システム・構文
2. **応用編** - Interface・Class・Generics
3. **上級編** - 高度な型・実践

各ページで実際のTypeScriptコードを表示し、コンパイル済みJavaScriptで実行します。 
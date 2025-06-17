/**
 * TypeScript基礎編のサンプルコード
 * 基本的な型、関数、オブジェクトの使用方法を学習
 */
type Status = "pending" | "completed" | "failed";
type BasicUserType = {
    id: number;
    name: string;
    status: Status;
};
/**
 * 基本的なプリミティブ型の使用例を示す
 */
declare function demonstrateBasicTypes(): void;
/**
 * オブジェクト型とオプショナルプロパティの使用例を示す
 */
declare function demonstrateObjectTypes(): void;
/**
 * 関数の型注釈とオプション引数の使用例を示す
 */
declare function demonstrateFunctionTypes(): void;
/**
 * Union型（複数の型の組み合わせ）の使用例を示す
 */
declare function demonstrateUnionTypes(): void;
/**
 * 型エイリアスを使った型の再利用例を示す
 */
declare function demonstrateTypeAliases(): void;
/**
 * 配列型とタプル型の使用例を示す
 */
declare function demonstrateArraysAndTuples(): void;
/**
 * TypeScriptの特殊な型（never, any, unknown）の使用例を示す
 */
declare function demonstrateSpecialTypes(): void;
/**
 * 型注釈と型推論の違いと使い分けを示す
 */
declare function demonstrateTypeAnnotationVsInference(): void;
/**
 * 結果をHTMLページに表示するヘルパー関数
 */
declare function displayResult1(resultId: string, content: string): void;
/**
 * コンソールログをキャプチャして文字列として返すヘルパー関数
 */
declare function captureConsoleOutput1(fn: () => void): string;

/**
 * TypeScript基礎編のサンプルコード
 * 基本的な型、関数、オブジェクトの使用方法を学習
 */

// ===================================
// 型定義セクション
// ===================================

// セクション5で使用する型エイリアス
type Status = "pending" | "completed" | "failed";

type BasicUserType = {
    id: number;
    name: string;
    status: Status;
};

// ===================================
// セクション1: 基本的な型
// ===================================

/**
 * 基本的なプリミティブ型の使用例を示す
 */
function demonstrateBasicTypes(): void {
    console.log("=== 基本的な型のデモンストレーション ===");
    
    // 数値型
    let age: number = 25;
    console.log("年齢:", age);

    // 文字列型
    let name: string = "田中太郎";
    console.log("名前:", name);

    // 真偽値型
    let isStudent: boolean = true;
    console.log("学生か:", isStudent);

    // 配列型（推奨記法）
    let colors: string[] = ["赤", "青", "緑"];
    console.log("色配列:", colors);

    // 数値配列（ジェネリック記法）
    let scores: Array<number> = [85, 90, 78];
    console.log("得点配列:", scores);
}

// ===================================
// セクション2: オブジェクト型
// ===================================

/**
 * オブジェクト型とオプショナルプロパティの使用例を示す
 */
function demonstrateObjectTypes(): void {
    console.log("=== オブジェクト型のデモンストレーション ===");
    
    // オブジェクト型の定義（インライン型）
    let person: { name: string; age: number; isActive: boolean } = {
        name: "佐藤花子",
        age: 30,
        isActive: true
    };
    console.log("人物情報:", person);

    // オプショナルプロパティ
    let user: { name: string; email?: string } = {
        name: "山田太郎"
        // emailは省略可能
    };
    console.log("ユーザー情報:", user);

    // 後でemailを追加
    user.email = "yamada@example.com";
    console.log("email追加後:", user);
}

// ===================================
// セクション3: 関数の型
// ===================================

/**
 * 関数の型注釈とオプション引数の使用例を示す
 */
function demonstrateFunctionTypes(): void {
    console.log("=== 関数の型のデモンストレーション ===");
    
    // 関数の型注釈
    function add(x: number, y: number): number {
        return x + y;
    }
    console.log("5 + 3 =", add(5, 3));

    // アロー関数の型注釈
    const multiply = (x: number, y: number): number => x * y;
    console.log("4 × 6 =", multiply(4, 6));

    // オプション引数
    function greet(name: string, title?: string): string {
        if (title) {
            return `こんにちは、${title}${name}さん！`;
        }
        return `こんにちは、${name}さん！`;
    }
    console.log(greet("田中"));
    console.log(greet("佐藤", "先生"));
}

// ===================================
// セクション4: Union型
// ===================================

/**
 * Union型（複数の型の組み合わせ）の使用例を示す
 */
function demonstrateUnionTypes(): void {
    console.log("=== Union型のデモンストレーション ===");
    
    // Union型（複数の型のいずれか）
    let id: number | string;

    id = 123;
    console.log("数値のID:", id);

    id = "USER001";
    console.log("文字列のID:", id);

    // 関数でのUnion型使用
    function formatId(id: number | string): string {
        if (typeof id === "number") {
            return `ID: ${id.toString().padStart(6, "0")}`;
        } else {
            return `ID: ${id.toUpperCase()}`;
        }
    }
    console.log(formatId(42));
    console.log(formatId("abc123"));
}

// ===================================
// セクション5: 型エイリアス
// ===================================

/**
 * 型エイリアスを使った型の再利用例を示す
 */
function demonstrateTypeAliases(): void {
    console.log("=== 型エイリアスのデモンストレーション ===");
    
    // 型エイリアスの使用
    let currentUser: BasicUserType = {
        id: 1,
        name: "鈴木一郎",
        status: "pending"
    };
    console.log("ユーザー:", currentUser);

    // 型安全な関数
    function updateStatus(user: BasicUserType, newStatus: Status): BasicUserType {
        return { ...user, status: newStatus };
    }

    let updatedUser = updateStatus(currentUser, "completed");
    console.log("更新後:", updatedUser);
}

// ===================================
// セクション6: 配列とタプル
// ===================================

/**
 * 配列型とタプル型の使用例を示す
 */
function demonstrateArraysAndTuples(): void {
    console.log("=== 配列とタプルのデモンストレーション ===");
    
    // 配列型
    let numbers: number[] = [1, 2, 3, 4, 5];
    console.log("数値配列:", numbers);

    // タプル型（固定長・型が決まった配列）
    let coordinate: [number, number] = [10, 20];
    console.log("座標:", coordinate);
    console.log("X座標:", coordinate[0]);
    console.log("Y座標:", coordinate[1]);

    // ラベル付きタプル
    let person: [name: string, age: number, isActive: boolean] = 
        ["田中太郎", 25, true];
    console.log("人物タプル:", person);

    // 配列の型推論
    let fruits = ["りんご", "バナナ", "オレンジ"];  // string[]として推論
    console.log("果物配列:", fruits);
}

// ===================================
// セクション7: 特殊な型（never, any, unknown）
// ===================================

/**
 * TypeScriptの特殊な型（never, any, unknown）の使用例を示す
 */
function demonstrateSpecialTypes(): void {
    console.log("=== 特殊な型のデモンストレーション ===");
    
    // any型（型チェックを無効にする）
    let anyValue: any = 42;
    anyValue = "文字列";
    anyValue = true;
    console.log("any型の値:", anyValue);

    // unknown型（安全なany）
    let unknownValue: unknown = "何かの値";
    console.log("unknown型の値:", unknownValue);

    // unknown型は型チェックが必要
    if (typeof unknownValue === "string") {
        console.log("文字列として処理:", unknownValue.toUpperCase());
    }

    // never型を返す関数（例外を投げる）
    function throwError(message: string): never {
        throw new Error(message);
    }

    // 実際の使用例
    function processValue(value: string | number): string {
        if (typeof value === "string") {
            return value.toUpperCase();
        } else if (typeof value === "number") {
            return value.toString();
        } else {
            // この部分は到達しないはず（never型）
            return throwError("予期しない型です");
        }
    }
    console.log("処理結果:", processValue("hello"));
}

// ===================================
// セクション8: 型注釈 vs 型推論
// ===================================

/**
 * 型注釈と型推論の違いと使い分けを示す
 */
function demonstrateTypeAnnotationVsInference(): void {
    console.log("=== 型注釈と型推論のデモンストレーション ===");
    
    // 型推論（TypeScriptが自動で型を決定）
    let inferredString = "これは文字列";  // string型として推論
    let inferredNumber = 42;             // number型として推論
    let inferredArray = [1, 2, 3];       // number[]として推論

    console.log("推論された型の例:");
    console.log("文字列:", inferredString);
    console.log("数値:", inferredNumber);
    console.log("配列:", inferredArray);

    // 明示的な型注釈
    let explicitString: string = "明示的に指定した文字列";
    let explicitNumber: number = 100;
    let explicitArray: string[] = ["a", "b", "c"];

    console.log("明示的な型の例:");
    console.log("文字列:", explicitString);
    console.log("数値:", explicitNumber);
    console.log("配列:", explicitArray);

    // 型推論が役立つ例
    const user = {
        name: "佐藤",
        age: 25,
        isActive: true
    };
    // userは自動で { name: string; age: number; isActive: boolean; } 型として推論
    console.log("推論されたオブジェクト:", user);
}

// ===================================
// DOM操作・イベント処理セクション
// ===================================

import { displayResult, captureConsoleOutput } from './utils.js';

/**
 * DOMが読み込まれた後にイベントリスナーを設定
 */
document.addEventListener('DOMContentLoaded', () => {
    // ボタン要素の取得
    const buttons = {
        btn1: document.getElementById('btn1'),
        btn2: document.getElementById('btn2'),
        btn3: document.getElementById('btn3'),
        btn4: document.getElementById('btn4'),
        btn5: document.getElementById('btn5'),
        btn6: document.getElementById('btn6'),
        btn7: document.getElementById('btn7'),
        btn8: document.getElementById('btn8')
    };

    // 各ボタンのイベントリスナー設定
    buttons.btn1?.addEventListener('click', () => {
        const output = captureConsoleOutput(() => demonstrateBasicTypes());
        displayResult('result1', output);
    });

    buttons.btn2?.addEventListener('click', () => {
        const output = captureConsoleOutput(() => demonstrateObjectTypes());
        displayResult('result2', output);
    });

    buttons.btn3?.addEventListener('click', () => {
        const output = captureConsoleOutput(() => demonstrateFunctionTypes());
        displayResult('result3', output);
    });

    buttons.btn4?.addEventListener('click', () => {
        const output = captureConsoleOutput(() => demonstrateUnionTypes());
        displayResult('result4', output);
    });

    buttons.btn5?.addEventListener('click', () => {
        const output = captureConsoleOutput(() => demonstrateTypeAliases());
        displayResult('result5', output);
    });

    buttons.btn6?.addEventListener('click', () => {
        const output = captureConsoleOutput(() => demonstrateArraysAndTuples());
        displayResult('result6', output);
    });

    buttons.btn7?.addEventListener('click', () => {
        const output = captureConsoleOutput(() => demonstrateSpecialTypes());
        displayResult('result7', output);
    });

    buttons.btn8?.addEventListener('click', () => {
        const output = captureConsoleOutput(() => demonstrateTypeAnnotationVsInference());
        displayResult('result8', output);
    });
});  
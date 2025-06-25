"use strict";
/**
 * TypeScript基礎編のサンプルコード
 * 基本的な型、関数、オブジェクトの使用方法を学習
 */
// ===================================
// セクション1: 基本的な型
// ===================================
/**
 * 基本的なプリミティブ型の使用例を示す
 */
function demonstrateBasicTypes() {
    let age = 25;
    let name = "田中太郎";
    let isStudent = true;
    let colors = ["赤", "青", "緑"];
    console.log("年齢:", age, "名前:", name);
    console.log("学生:", isStudent, "色:", colors);
}
// ===================================
// セクション2: オブジェクト型
// ===================================
/**
 * オブジェクト型とオプショナルプロパティの使用例を示す
 */
function demonstrateObjectTypes() {
    // オブジェクト型の定義（インライン型）
    let person = {
        name: "佐藤花子", age: 30
    };
    // オプショナルプロパティ
    let user = {
        name: "山田太郎"
    };
    user.email = "yamada@example.com";
    console.log("人物:", JSON.stringify(person), "ユーザー:", JSON.stringify(user));
}
// ===================================
// セクション3: 関数の型
// ===================================
/**
 * 関数の型注釈とオプション引数の使用例を示す
 */
function demonstrateFunctionTypes() {
    function add(x, y) {
        return x + y;
    }
    function greet(name, title) {
        return title ? `こんにちは、${title}${name}さん！` : `こんにちは、${name}さん！`;
    }
    console.log("5 + 3 =", add(5, 3));
    console.log(greet("田中"), greet("佐藤", "さん"));
}
// ===================================
// セクション4: Union型
// ===================================
/**
 * Union型（複数の型の組み合わせ）の使用例を示す
 */
function demonstrateUnionTypes() {
    let id;
    id = 123;
    id = "USER001";
    function formatId(id) {
        return typeof id === "number" ? `ID: ${id.toString().padStart(6, "0")}` : `ID: ${id.toUpperCase()}`;
    }
    console.log(formatId(42), formatId("abc123"));
}
// ===================================
// セクション5: 型エイリアス
// ===================================
/**
 * 型エイリアスを使った型の再利用例を示す
 */
function demonstrateTypeAliases() {
    let currentUser = { id: 1, name: "鈴木一郎", status: "pending" };
    function updateStatus(user, newStatus) {
        return { ...user, status: newStatus };
    }
    console.log("元:", JSON.stringify(currentUser));
    console.log("更新後:", JSON.stringify(updateStatus(currentUser, "completed")));
}
// ===================================
// セクション6: 配列とタプル
// ===================================
/**
 * 配列型とタプル型の使用例を示す
 */
function demonstrateArraysAndTuples() {
    let numbers = [1, 2, 3];
    let coordinate = [10, 20];
    let person = ["田中太郎", 25];
    let fruits = ["りんご", "バナナ"];
    console.log("数値配列:", numbers);
    console.log("座標:", coordinate, "人物:", person);
    console.log("果物:", fruits);
}
// ===================================
// セクション7: 特殊な型（never, any, unknown）
// ===================================
/**
 * TypeScriptの特殊な型（never, any, unknown）の使用例を示す
 */
function demonstrateSpecialTypes() {
    let anyValue = 42;
    anyValue = "文字列";
    let unknownValue = "何かの値";
    if (typeof unknownValue === "string") {
        console.log("文字列として処理:", unknownValue.toUpperCase());
    }
    function processValue(value) {
        if (typeof value === "string")
            return value.toUpperCase();
        if (typeof value === "number")
            return value.toString();
        throw new Error("予期しない型");
    }
    console.log("any:", anyValue, "処理結果:", processValue("hello"));
}
// ===================================
// セクション8: 型注釈 vs 型推論
// ===================================
/**
 * 型注釈と型推論の違いと使い分けを示す
 */
function demonstrateTypeAnnotationVsInference() {
    let inferredString = "これは文字列";
    let inferredNumber = 42;
    let explicitString = "明示的に指定";
    let explicitArray = ["a", "b"];
    const user = { name: "佐藤", age: 25, isActive: true };
    console.log("推論:", inferredString, inferredNumber);
    console.log("明示:", explicitString, explicitArray);
    console.log("オブジェクト推論:", JSON.stringify(user));
}
// ===================================
// DOM操作・イベント処理セクション
// ===================================
/**
 * 結果をHTMLページに表示するヘルパー関数
 */
function displayResult1(resultId, content) {
    const resultDiv = document.getElementById(resultId);
    if (resultDiv) {
        resultDiv.innerHTML = `<div>${content}</div>`;
        resultDiv.style.padding = '10px';
        resultDiv.style.marginTop = '10px';
        resultDiv.style.whiteSpace = 'pre-wrap';
        resultDiv.style.fontFamily = 'monospace';
    }
}
/**
 * コンソールログをキャプチャして文字列として返すヘルパー関数
 */
function captureConsoleOutput1(fn) {
    const originalLog = console.log;
    let output = '';
    console.log = (...args) => {
        output += args.join(' ') + '\n';
        originalLog.apply(console, args);
    };
    try {
        fn();
    }
    finally {
        console.log = originalLog;
    }
    return output;
}
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
        const output = captureConsoleOutput1(() => demonstrateBasicTypes());
        displayResult1('result1', output);
    });
    buttons.btn2?.addEventListener('click', () => {
        const output = captureConsoleOutput1(() => demonstrateObjectTypes());
        displayResult1('result2', output);
    });
    buttons.btn3?.addEventListener('click', () => {
        const output = captureConsoleOutput1(() => demonstrateFunctionTypes());
        displayResult1('result3', output);
    });
    buttons.btn4?.addEventListener('click', () => {
        const output = captureConsoleOutput1(() => demonstrateUnionTypes());
        displayResult1('result4', output);
    });
    buttons.btn5?.addEventListener('click', () => {
        const output = captureConsoleOutput1(() => demonstrateTypeAliases());
        displayResult1('result5', output);
    });
    buttons.btn6?.addEventListener('click', () => {
        const output = captureConsoleOutput1(() => demonstrateArraysAndTuples());
        displayResult1('result6', output);
    });
    buttons.btn7?.addEventListener('click', () => {
        const output = captureConsoleOutput1(() => demonstrateSpecialTypes());
        displayResult1('result7', output);
    });
    buttons.btn8?.addEventListener('click', () => {
        const output = captureConsoleOutput1(() => demonstrateTypeAnnotationVsInference());
        displayResult1('result8', output);
    });
});
//# sourceMappingURL=basic1.js.map
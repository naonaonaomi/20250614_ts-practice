// TypeScript基礎編のサンプルコード
// セクション1: 基本的な型
export function demonstrateBasicTypes() {
    // 数値型
    let age = 25;
    console.log("年齢:", age);
    // 文字列型
    let name = "田中太郎";
    console.log("名前:", name);
    // 真偽値型
    let isStudent = true;
    console.log("学生か:", isStudent);
    // 配列型
    let colors = ["赤", "青", "緑"];
    console.log("色配列:", colors);
    // 数値配列の別の書き方
    let scores = [85, 90, 78];
    console.log("得点配列:", scores);
}
// セクション2: オブジェクト型
export function demonstrateObjectTypes() {
    // オブジェクト型の定義
    let person = {
        name: "佐藤花子",
        age: 30,
        isActive: true
    };
    console.log("人物情報:", person);
    // オプショナルプロパティ
    let user = {
        name: "山田太郎"
        // emailは省略可能
    };
    console.log("ユーザー情報:", user);
    // 後でemailを追加
    user.email = "yamada@example.com";
    console.log("email追加後:", user);
}
// セクション3: 関数の型
export function demonstrateFunctionTypes() {
    // 関数の型注釈
    function add(x, y) {
        return x + y;
    }
    console.log("5 + 3 =", add(5, 3));
    // アロー関数の型注釈
    const multiply = (x, y) => x * y;
    console.log("4 × 6 =", multiply(4, 6));
    // オプション引数
    function greet(name, title) {
        if (title) {
            return `こんにちは、${title}${name}さん！`;
        }
        return `こんにちは、${name}さん！`;
    }
    console.log(greet("田中"));
    console.log(greet("佐藤", "さん"));
}
// セクション4: Union型
export function demonstrateUnionTypes() {
    // Union型（複数の型のいずれか）
    let id;
    id = 123;
    console.log("数値のID:", id);
    id = "USER001";
    console.log("文字列のID:", id);
    // 関数でのUnion型使用
    function formatId(id) {
        if (typeof id === "number") {
            return `ID: ${id.toString().padStart(6, "0")}`;
        }
        else {
            return `ID: ${id.toUpperCase()}`;
        }
    }
    console.log(formatId(42));
    console.log(formatId("abc123"));
}
export function demonstrateTypeAliases() {
    // 型エイリアスの使用
    let currentUser = {
        id: 1,
        name: "鈴木一郎",
        status: "pending"
    };
    console.log("ユーザー:", currentUser);
    // 型安全な関数
    function updateStatus(user, newStatus) {
        return { ...user, status: newStatus };
    }
    let updatedUser = updateStatus(currentUser, "completed");
    console.log("更新後:", updatedUser);
}
// セクション6: 配列とタプル
export function demonstrateArraysAndTuples() {
    // 配列型
    let numbers = [1, 2, 3, 4, 5];
    console.log("数値配列:", numbers);
    // タプル型（固定長・型が決まった配列）
    let coordinate = [10, 20];
    console.log("座標:", coordinate);
    console.log("X座標:", coordinate[0]);
    console.log("Y座標:", coordinate[1]);
    // ラベル付きタプル
    let person = ["田中太郎", 25, true];
    console.log("人物タプル:", person);
    // 配列の型推論
    let fruits = ["りんご", "バナナ", "オレンジ"]; // string[]として推論
    console.log("果物配列:", fruits);
}
// セクション7: never, any, unknown型
export function demonstrateSpecialTypes() {
    // any型（型チェックを無効にする）
    let anyValue = 42;
    anyValue = "文字列";
    anyValue = true;
    console.log("any型の値:", anyValue);
    // unknown型（安全なany）
    let unknownValue = "何かの値";
    console.log("unknown型の値:", unknownValue);
    // unknown型は型チェックが必要
    if (typeof unknownValue === "string") {
        console.log("文字列として処理:", unknownValue.toUpperCase());
    }
    // never型を返す関数（例外を投げる）
    function throwError(message) {
        throw new Error(message);
    }
    // 実際の使用例
    function processValue(value) {
        if (typeof value === "string") {
            return value.toUpperCase();
        }
        else if (typeof value === "number") {
            return value.toString();
        }
        else {
            // この部分は到達しないはず（never型）
            return throwError("予期しない型です");
        }
    }
    console.log("処理結果:", processValue("hello"));
}
// セクション8: 型注釈vs型推論
export function demonstrateTypeAnnotationVsInference() {
    // 型推論（TypeScriptが自動で型を決定）
    let inferredString = "これは文字列"; // string型として推論
    let inferredNumber = 42; // number型として推論
    let inferredArray = [1, 2, 3]; // number[]として推論
    console.log("推論された型の例:");
    console.log("文字列:", inferredString);
    console.log("数値:", inferredNumber);
    console.log("配列:", inferredArray);
    // 明示的な型注釈
    let explicitString = "明示的に指定した文字列";
    let explicitNumber = 100;
    let explicitArray = ["a", "b", "c"];
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
// DOMイベントリスナーの設定
document.addEventListener('DOMContentLoaded', () => {
    // ボタンのクリックイベントを設定
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    const btn3 = document.getElementById('btn3');
    const btn4 = document.getElementById('btn4');
    const btn5 = document.getElementById('btn5');
    const btn6 = document.getElementById('btn6');
    const btn7 = document.getElementById('btn7');
    const btn8 = document.getElementById('btn8');
    // 結果表示用のヘルパー関数
    function displayResult(resultId, content) {
        const resultDiv = document.getElementById(resultId);
        if (resultDiv) {
            resultDiv.innerHTML = `<pre>${content}</pre>`;
            resultDiv.style.background = '#f5f5f5';
            resultDiv.style.padding = '10px';
            resultDiv.style.marginTop = '10px';
            resultDiv.style.borderRadius = '4px';
        }
    }
    // コンソールログをキャプチャするヘルパー関数
    function captureConsoleOutput(fn) {
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
    // 各ボタンのイベントリスナー
    if (btn1) {
        btn1.addEventListener('click', () => {
            const output = captureConsoleOutput(() => demonstrateBasicTypes());
            displayResult('result1', output);
        });
    }
    if (btn2) {
        btn2.addEventListener('click', () => {
            const output = captureConsoleOutput(() => demonstrateObjectTypes());
            displayResult('result2', output);
        });
    }
    if (btn3) {
        btn3.addEventListener('click', () => {
            const output = captureConsoleOutput(() => demonstrateFunctionTypes());
            displayResult('result3', output);
        });
    }
    if (btn4) {
        btn4.addEventListener('click', () => {
            const output = captureConsoleOutput(() => demonstrateUnionTypes());
            displayResult('result4', output);
        });
    }
    if (btn5) {
        btn5.addEventListener('click', () => {
            const output = captureConsoleOutput(() => demonstrateTypeAliases());
            displayResult('result5', output);
        });
    }
    if (btn6) {
        btn6.addEventListener('click', () => {
            const output = captureConsoleOutput(() => demonstrateArraysAndTuples());
            displayResult('result6', output);
        });
    }
    if (btn7) {
        btn7.addEventListener('click', () => {
            const output = captureConsoleOutput(() => demonstrateSpecialTypes());
            displayResult('result7', output);
        });
    }
    if (btn8) {
        btn8.addEventListener('click', () => {
            const output = captureConsoleOutput(() => demonstrateTypeAnnotationVsInference());
            displayResult('result8', output);
        });
    }
});
//# sourceMappingURL=basic1.js.map
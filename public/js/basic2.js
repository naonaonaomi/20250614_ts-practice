"use strict";
/**
 * TypeScript応用編のサンプルコード
 * Interface、Class、Generics、ユーティリティ型の使用方法を学習
 */
// ===================================
// セクション9: Interface（インターフェース）
// ===================================
/**
 * Interfaceの基本的な使用例を示す
 */
function demonstrateInterface() {
    // インターフェースを使用
    const user1 = {
        id: 1,
        name: "田中太郎",
        email: "tanaka@example.com",
        isActive: true
    };
    const user2 = {
        id: 2,
        name: "佐藤花子",
        email: "sato@example.com"
        // isActiveは省略可能
    };
    console.log("ユーザー1:", user1);
    console.log("ユーザー2:", user2);
}
// ===================================
// セクション10: メソッドを持つInterface
// ===================================
/**
 * メソッドを持つInterfaceの使用例を示す
 */
function demonstrateInterfaceWithMethods() {
    // インターフェースを実装
    const calculator = {
        add: (a, b) => {
            console.log(`${a} + ${b} = ${a + b}`);
            return a + b;
        },
        subtract: (a, b) => {
            console.log(`${a} - ${b} = ${a - b}`);
            return a - b;
        },
        multiply: (a, b) => {
            console.log(`${a} × ${b} = ${a * b}`);
            return a * b;
        }
    };
    // 使用例
    calculator.add(5, 3);
    calculator.subtract(10, 4);
    calculator.multiply(6, 7);
}
// ===================================
// セクション11: Class（クラス）
// ===================================
class Animal {
    constructor(name, species, age) {
        this.name = name;
        this.species = species;
        this.age = age;
        console.log(`${species}の${name}を作成しました`);
    }
    getName() {
        return this.name;
    }
    getInfo() {
        return `${this.species}の${this.name}（${this.age}歳）`;
    }
}
/**
 * Classの基本的な使用例を示す
 */
function demonstrateClass() {
    // インスタンス作成
    const dog = new Animal("ポチ", "犬", 3);
    const cat = new Animal("ミケ", "猫", 2);
    console.log(dog.getInfo());
    console.log(cat.getInfo());
}
// ===================================
// セクション12: クラスの継承
// ===================================
class Vehicle {
    constructor(brand, model) {
        this.brand = brand;
        this.model = model;
    }
    getInfo() {
        return `${this.brand} ${this.model}`;
    }
    start() {
        console.log(`${this.getInfo()}を始動しました`);
    }
}
class Car extends Vehicle {
    constructor(brand, model, doors) {
        super(brand, model); // 親クラスのコンストラクタ呼び出し
        this.doors = doors;
    }
    getInfo() {
        return `${super.getInfo()}（${this.doors}ドア）`;
    }
    drive() {
        console.log(`${this.getInfo()}で運転中...`);
    }
}
/**
 * クラスの継承の使用例を示す
 */
function demonstrateInheritance() {
    const car = new Car("トヨタ", "プリウス", 4);
    car.start();
    car.drive();
}
// ===================================
// セクション13: InterfaceとClassの組み合わせ
// ===================================
class Duck {
    constructor(name) {
        this.altitude = 0;
        this.depth = 0;
        this.name = name;
    }
    fly() {
        this.altitude = 100;
        console.log(`${this.name}が高度${this.altitude}mで飛んでいます`);
    }
    swim() {
        this.depth = 2;
        console.log(`${this.name}が深度${this.depth}mで泳いでいます`);
    }
    walk() {
        this.altitude = 0;
        this.depth = 0;
        console.log(`${this.name}が地上を歩いています`);
    }
}
/**
 * InterfaceとClassの組み合わせの使用例を示す
 */
function demonstrateInterfaceAndClass() {
    const duck = new Duck("アヒル");
    duck.walk();
    duck.fly();
    duck.swim();
}
// ===================================
// セクション14: Generics（ジェネリクス）基礎
// ===================================
function identity(arg) {
    console.log("引数の型:", typeof arg);
    console.log("値:", arg);
    return arg;
}
/**
 * Genericsの基本的な使用例を示す
 */
function demonstrateGenerics() {
    // 使用例
    const numberResult = identity(42);
    const stringResult = identity("こんにちは");
    const boolResult = identity(true);
    console.log("数値結果:", numberResult);
    console.log("文字列結果:", stringResult);
    console.log("真偽値結果:", boolResult);
    // 型推論も可能
    const autoNumber = identity(123); // number型として推論
    const autoString = identity("自動推論"); // string型として推論
    console.log("自動推論された数値:", autoNumber);
    console.log("自動推論された文字列:", autoString);
}
// ===================================
// セクション15: ジェネリッククラス
// ===================================
class Box {
    constructor(value) {
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    setValue(value) {
        this.value = value;
    }
    getType() {
        return typeof this.value;
    }
}
/**
 * ジェネリッククラスの使用例を示す
 */
function demonstrateGenericClass() {
    // 異なる型のBox作成
    const numberBox = new Box(123);
    const stringBox = new Box("テキスト");
    const boolBox = new Box(true);
    console.log("数値ボックス:", numberBox.getValue(), "型:", numberBox.getType());
    console.log("文字列ボックス:", stringBox.getValue(), "型:", stringBox.getType());
    console.log("真偽値ボックス:", boolBox.getValue(), "型:", boolBox.getType());
    // 値の更新
    numberBox.setValue(456);
    console.log("更新後の数値ボックス:", numberBox.getValue());
}
// ===================================
// セクション16: ジェネリック制約
// ===================================
function logLength(arg) {
    console.log(`長さ: ${arg.length}`);
    return arg;
}
function getProperty(obj, key) {
    return obj[key];
}
/**
 * ジェネリック制約の使用例を示す
 */
function demonstrateGenericConstraints() {
    // length プロパティを持つオブジェクトのみ受け入れる
    logLength("文字列です");
    logLength([1, 2, 3, 4]);
    logLength({ length: 10, value: "test" });
    // keyof を使用した型安全なプロパティアクセス
    const person = { name: "田中", age: 30, city: "東京" };
    const name = getProperty(person, "name"); // string型
    const age = getProperty(person, "age"); // number型
    console.log("取得した名前:", name);
    console.log("取得した年齢:", age);
}
// ===================================
// セクション17: ユーティリティ型
// ===================================
/**
 * TypeScriptのユーティリティ型の使用例を示す
 */
function demonstrateUtilityTypes() {
    // Partial<T> - すべてのプロパティをオプショナルに
    const updateUser = {
        name: "更新された名前" // 一部のプロパティのみ
    };
    console.log("部分更新用オブジェクト:", updateUser);
    // Pick<T, K> - 特定のプロパティだけ抽出
    const summary = {
        id: 1,
        name: "田中太郎"
    };
    console.log("ユーザー概要:", summary);
    // Omit<T, K> - 特定のプロパティを除外
    const newUser = {
        name: "新規ユーザー",
        email: "new@example.com",
        isActive: true
    };
    console.log("ID以外のユーザー情報:", newUser);
}
// ===================================
// セクション18: Mapped Types（マップド型）
// ===================================
/**
 * Mapped Typesの使用例を示す
 */
function demonstrateMappedTypes() {
    // 使用例
    const user = {
        name: "田中太郎",
        age: 30,
        email: "tanaka@example.com"
    };
    const readonlyUser = {
        name: "読み取り専用ユーザー",
        age: 25,
        email: "readonly@example.com"
    };
    const stringifiedUser = {
        name: "文字列名前",
        age: "30", // 数値も文字列として扱う
        email: "string@example.com"
    };
    console.log("通常のユーザー:", user);
    console.log("読み取り専用ユーザー:", readonlyUser);
    console.log("文字列化ユーザー:", stringifiedUser);
}
// ===================================
// DOM操作・イベント処理セクション
// ===================================
/**
 * 結果をHTMLページに表示するヘルパー関数
 */
function displayResult2(resultId, content) {
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
function captureConsoleOutput2(fn) {
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
        btnInterface: document.getElementById('btn-interface'),
        btnInterfaceMethod: document.getElementById('btn-interface-method'),
        btnClass: document.getElementById('btn-class'),
        btnInheritance: document.getElementById('btn-inheritance'),
        btnInterfaceClass: document.getElementById('btn-interface-class'),
        btnGenerics: document.getElementById('btn-generics'),
        btnGenericsClass: document.getElementById('btn-generics-class'),
        btnConstraints: document.getElementById('btn-constraints'),
        btnUtility: document.getElementById('btn-utility'),
        btnMapped: document.getElementById('btn-mapped')
    };
    // 各ボタンのイベントリスナー設定
    buttons.btnInterface?.addEventListener('click', () => {
        const output = captureConsoleOutput2(() => demonstrateInterface());
        displayResult2('result-interface', output);
    });
    buttons.btnInterfaceMethod?.addEventListener('click', () => {
        const output = captureConsoleOutput2(() => demonstrateInterfaceWithMethods());
        displayResult2('result-interface-method', output);
    });
    buttons.btnClass?.addEventListener('click', () => {
        const output = captureConsoleOutput2(() => demonstrateClass());
        displayResult2('result-class', output);
    });
    buttons.btnInheritance?.addEventListener('click', () => {
        const output = captureConsoleOutput2(() => demonstrateInheritance());
        displayResult2('result-inheritance', output);
    });
    buttons.btnInterfaceClass?.addEventListener('click', () => {
        const output = captureConsoleOutput2(() => demonstrateInterfaceAndClass());
        displayResult2('result-interface-class', output);
    });
    buttons.btnGenerics?.addEventListener('click', () => {
        const output = captureConsoleOutput2(() => demonstrateGenerics());
        displayResult2('result-generics', output);
    });
    buttons.btnGenericsClass?.addEventListener('click', () => {
        const output = captureConsoleOutput2(() => demonstrateGenericClass());
        displayResult2('result-generics-class', output);
    });
    buttons.btnConstraints?.addEventListener('click', () => {
        const output = captureConsoleOutput2(() => demonstrateGenericConstraints());
        displayResult2('result-constraints', output);
    });
    buttons.btnUtility?.addEventListener('click', () => {
        const output = captureConsoleOutput2(() => demonstrateUtilityTypes());
        displayResult2('result-utility', output);
    });
    buttons.btnMapped?.addEventListener('click', () => {
        const output = captureConsoleOutput2(() => demonstrateMappedTypes());
        displayResult2('result-mapped', output);
    });
});
//# sourceMappingURL=basic2.js.map
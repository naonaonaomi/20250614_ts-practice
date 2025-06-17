// TypeScript応用編のサンプルコード
export function demonstrateInterface() {
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
export function demonstrateInterfaceWithMethods() {
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
// セクション3: Class（クラス）
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
export function demonstrateClass() {
    // インスタンス作成
    const dog = new Animal("ポチ", "犬", 3);
    const cat = new Animal("ミケ", "猫", 2);
    console.log(dog.getInfo());
    console.log(cat.getInfo());
}
// セクション4: クラスの継承
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
export function demonstrateInheritance() {
    const car = new Car("トヨタ", "プリウス", 4);
    car.start();
    car.drive();
}
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
export function demonstrateInterfaceAndClass() {
    const duck = new Duck("アヒル");
    duck.walk();
    duck.fly();
    duck.swim();
}
// セクション6: Generics（ジェネリクス）基礎
function identity(arg) {
    console.log("引数の型:", typeof arg);
    console.log("値:", arg);
    return arg;
}
export function demonstrateGenerics() {
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
// セクション7: ジェネリッククラス
class Box {
    constructor(value) {
        this.value = value;
        console.log(`Box作成: 型 ${typeof value}, 値 ${value}`);
    }
    getValue() {
        return this.value;
    }
    setValue(value) {
        this.value = value;
        console.log(`値を更新: ${value}`);
    }
    getType() {
        return typeof this.value;
    }
}
export function demonstrateGenericClass() {
    // 様々な型のBoxを作成
    const numberBox = new Box(42);
    const stringBox = new Box("TypeScript");
    const booleanBox = new Box(true);
    console.log("数値Box:", numberBox.getValue());
    console.log("文字列Box:", stringBox.getValue());
    console.log("真偽値Box:", booleanBox.getValue());
    // 値の更新
    numberBox.setValue(100);
    stringBox.setValue("更新された文字列");
}
function logLength(arg) {
    console.log(`長さ: ${arg.length}`);
    console.log(`値: ${arg}`);
    return arg;
}
function getProperty(obj, key) {
    console.log(`${String(key)}プロパティの値:`, obj[key]);
    return obj[key];
}
export function demonstrateGenericConstraints() {
    // lengthプロパティを持つものだけ受け入れる
    logLength("文字列"); // string.length
    logLength([1, 2, 3, 4, 5]); // Array.length
    // オブジェクトのキーを安全に取得
    const person = {
        name: "田中太郎",
        age: 30,
        city: "東京"
    };
    const name = getProperty(person, "name"); // string型
    const age = getProperty(person, "age"); // number型
    console.log("取得した名前:", name);
    console.log("取得した年齢:", age);
}
export function demonstrateUtilityTypes() {
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
export function demonstrateMappedTypes() {
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
    const btn9 = document.getElementById('btn9');
    const btn10 = document.getElementById('btn10');
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
            const output = captureConsoleOutput(() => demonstrateInterface());
            displayResult('result1', output);
        });
    }
    if (btn2) {
        btn2.addEventListener('click', () => {
            const output = captureConsoleOutput(() => demonstrateInterfaceWithMethods());
            displayResult('result2', output);
        });
    }
    if (btn3) {
        btn3.addEventListener('click', () => {
            const output = captureConsoleOutput(() => demonstrateClass());
            displayResult('result3', output);
        });
    }
    if (btn4) {
        btn4.addEventListener('click', () => {
            const output = captureConsoleOutput(() => demonstrateInheritance());
            displayResult('result4', output);
        });
    }
    if (btn5) {
        btn5.addEventListener('click', () => {
            const output = captureConsoleOutput(() => demonstrateInterfaceAndClass());
            displayResult('result5', output);
        });
    }
    if (btn6) {
        btn6.addEventListener('click', () => {
            const output = captureConsoleOutput(() => demonstrateGenerics());
            displayResult('result6', output);
        });
    }
    if (btn7) {
        btn7.addEventListener('click', () => {
            const output = captureConsoleOutput(() => demonstrateGenericClass());
            displayResult('result7', output);
        });
    }
    if (btn8) {
        btn8.addEventListener('click', () => {
            const output = captureConsoleOutput(() => demonstrateGenericConstraints());
            displayResult('result8', output);
        });
    }
    if (btn9) {
        btn9.addEventListener('click', () => {
            const output = captureConsoleOutput(() => demonstrateUtilityTypes());
            displayResult('result9', output);
        });
    }
    if (btn10) {
        btn10.addEventListener('click', () => {
            const output = captureConsoleOutput(() => demonstrateMappedTypes());
            displayResult('result10', output);
        });
    }
});
//# sourceMappingURL=basic2.js.map
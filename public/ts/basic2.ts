/**
 * TypeScript応用編のサンプルコード
 * Interface、Class、Generics、ユーティリティ型の使用方法を学習
 */

// ===================================
// 型定義セクション
// ===================================

// セクション9で使用するInterface
interface BasicUser {
    id: number;
    name: string;
    email: string;
    isActive?: boolean;  // オプショナル
}

// セクション10で使用するInterface
interface Calculator {
    add(a: number, b: number): number;
    multiply(a: number, b: number): number;
}

// セクション13で使用するInterface
interface Flyable {
    fly(): void;
    altitude: number;
}

interface Swimmable {
    swim(): void;
    depth: number;
}

// セクション15で使用するInterface
interface Lengthwise {
    length: number;
}

// セクション16で使用する型
interface OriginalUser {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
}

// セクション17で使用する型
interface BaseUser {
    name: string;
    age: number;
    email: string;
}

// すべてのプロパティをreadonly（読み取り専用）にする
type ReadonlyUser = {
    readonly [K in keyof BaseUser]: BaseUser[K];
};

// すべてのプロパティをオプショナルにする
type OptionalUser = {
    [K in keyof BaseUser]?: BaseUser[K];
};

// すべてのプロパティを文字列にする
type StringifiedUser = {
    [K in keyof BaseUser]: string;
};

// ===================================
// セクション9: Interface（インターフェース）
// ===================================

/**
 * Interfaceの基本的な使用例を示す
 */
function demonstrateInterface(): void {
    const user1: BasicUser = { id: 1, name: "田中太郎", email: "tanaka@example.com", isActive: true };
    const user2: BasicUser = { id: 2, name: "佐藤花子", email: "sato@example.com" };

    console.log("ユーザー1:", JSON.stringify(user1));
    console.log("ユーザー2:", JSON.stringify(user2));
}

// ===================================
// セクション10: メソッドを持つInterface
// ===================================

/**
 * メソッドを持つInterfaceの使用例を示す
 */
function demonstrateInterfaceWithMethods(): void {
    const calculator: Calculator = {
        add: (a, b) => { console.log(`${a} + ${b} = ${a + b}`); return a + b; },
        multiply: (a, b) => { console.log(`${a} × ${b} = ${a * b}`); return a * b; }
    };

    calculator.add(5, 3);
    calculator.multiply(6, 7);
}

// ===================================
// セクション11: Class（クラス）
// ===================================

class Animal {
    private name: string;
    protected species: string;

    constructor(name: string, species: string, public age: number) {
        this.name = name;
        this.species = species;
        console.log(`${species}の${name}を作成`);
    }

    getInfo(): string {
        return `${this.species}の${this.name}（${this.age}歳）`;
    }
}

/**
 * Classの基本的な使用例を示す
 */
function demonstrateClass(): void {
    const dog = new Animal("ポチ", "犬", 3);
    console.log(dog.getInfo());
}

// ===================================
// セクション12: クラスの継承
// ===================================

class Vehicle {
    constructor(protected brand: string, protected model: string) {}
    
    getInfo(): string { return `${this.brand} ${this.model}`; }
    start(): void { console.log(`${this.getInfo()}を始動`); }
}

class Car extends Vehicle {
    constructor(brand: string, model: string, private doors: number) {
        super(brand, model);
    }
    
    getInfo(): string { return `${super.getInfo()}（${this.doors}ドア）`; }
    drive(): void { console.log(`${this.getInfo()}で運転中`); }
}

/**
 * クラスの継承の使用例を示す
 */
function demonstrateInheritance(): void {
    const car = new Car("トヨタ", "プリウス", 4);
    car.start();
    car.drive();
}

// ===================================
// セクション13: InterfaceとClassの組み合わせ
// ===================================

class Duck implements Flyable, Swimmable {
    altitude = 0;
    depth = 0;

    constructor(private name: string) {}

    fly(): void {
        this.altitude = 100;
        console.log(`${this.name}が高度${this.altitude}mで飛行`);
    }

    swim(): void {
        this.depth = 2;
        console.log(`${this.name}が深度${this.depth}mで泳ぐ`);
    }
}

/**
 * InterfaceとClassの組み合わせの使用例を示す
 */
function demonstrateInterfaceAndClass(): void {
    const duck = new Duck("アヒル");
    duck.fly();
    duck.swim();
}

// ===================================
// セクション14: Generics（ジェネリクス）基礎
// ===================================

function identity<T>(arg: T): T {
    console.log("型:", typeof arg, "値:", arg);
    return arg;
}

/**
 * Genericsの基本的な使用例を示す
 */
function demonstrateGenerics(): void {
    const numberResult = identity<number>(42);
    const stringResult = identity("こんにちは");

    console.log("数値結果:", numberResult);
    console.log("文字列結果:", stringResult);
}

// ===================================
// セクション15: ジェネリッククラス
// ===================================

class Box<T> {
    constructor(private value: T) {
        console.log(`Box作成: ${typeof value}型`);
    }

    getValue(): T { return this.value; }
    setValue(value: T): void { this.value = value; }
}

/**
 * ジェネリッククラスの使用例を示す
 */
function demonstrateGenericClass(): void {
    const numberBox = new Box<number>(42);
    const stringBox = new Box("TypeScript");

    console.log("数値Box:", numberBox.getValue());
    console.log("文字列Box:", stringBox.getValue());
    numberBox.setValue(100);
}

// ===================================
// セクション16: ジェネリック制約
// ===================================

function logLength<T extends Lengthwise>(arg: T): T {
    console.log(`長さ: ${arg.length}, 値: ${arg}`);
    return arg;
}

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

/**
 * ジェネリック制約の使用例を示す
 */
function demonstrateGenericConstraints(): void {
    logLength("文字列");
    logLength([1, 2, 3]);

    const person = { name: "田中太郎", age: 30 };
    console.log("名前:", getProperty(person, "name"));
    console.log("年齢:", getProperty(person, "age"));
}

// ===================================
// セクション17: ユーティリティ型
// ===================================

/**
 * TypeScriptのユーティリティ型の使用例を示す
 */
function demonstrateUtilityTypes(): void {
    const updateUser: Partial<OriginalUser> = { name: "更新された名前" };

    const summary: Pick<OriginalUser, "id" | "name"> = { id: 1, name: "田中太郎" };

    const newUser: Omit<OriginalUser, "id"> = { name: "新規", email: "new@example.com", isActive: true };

    console.log("部分更新:", JSON.stringify(updateUser));
    console.log("概要:", JSON.stringify(summary));
    console.log("新規:", JSON.stringify(newUser));
}

// ===================================
// セクション18: Mapped Types（マップド型）
// ===================================

/**
 * Mapped Typesの使用例を示す
 */
function demonstrateMappedTypes(): void {
    const user: BaseUser = { name: "田中太郎", age: 30, email: "tanaka@example.com" };
    const readonlyUser: ReadonlyUser = { name: "読み取り専用", age: 25, email: "readonly@example.com" };
    const stringifiedUser: StringifiedUser = { name: "文字列名前", age: "30", email: "string@example.com" };

    console.log("通常:", JSON.stringify(user));
    console.log("読み取り専用:", JSON.stringify(readonlyUser));
    console.log("文字列化:", JSON.stringify(stringifiedUser));
}

// ===================================
// DOM操作・イベント処理セクション
// ===================================

/**
 * 結果をHTMLページに表示するヘルパー関数
 */
function displayResult2(resultId: string, content: string): void {
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
function captureConsoleOutput2(fn: () => void): string {
    const originalLog = console.log;
    let output = '';
    
    console.log = (...args: any[]) => {
        output += args.join(' ') + '\n';
        originalLog.apply(console, args);
    };
    
    try {
        fn();
    } finally {
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
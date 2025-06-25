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
    subtract(a: number, b: number): number;
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
    console.log("=== Interface のデモンストレーション ===");
    
    // インターフェースを使用
    const user1: BasicUser = {
        id: 1,
        name: "田中太郎",
        email: "tanaka@example.com",
        isActive: true
    };

    const user2: BasicUser = {
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
function demonstrateInterfaceWithMethods(): void {
    console.log("=== メソッドを持つInterface のデモンストレーション ===");
    
    // インターフェースを実装
    const calculator: Calculator = {
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
    private name: string;
    protected species: string;
    public age: number;

    constructor(name: string, species: string, age: number) {
        this.name = name;
        this.species = species;
        this.age = age;
        console.log(`${species}の${name}を作成しました`);
    }

    public getName(): string {
        return this.name;
    }

    public getInfo(): string {
        return `${this.species}の${this.name}（${this.age}歳）`;
    }
}

/**
 * Classの基本的な使用例を示す
 */
function demonstrateClass(): void {
    console.log("=== Class のデモンストレーション ===");
    
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
    protected brand: string;
    protected model: string;

    constructor(brand: string, model: string) {
        this.brand = brand;
        this.model = model;
    }

    public getInfo(): string {
        return `${this.brand} ${this.model}`;
    }

    public start(): void {
        console.log(`${this.getInfo()}を始動しました`);
    }
}

class Car extends Vehicle {
    private doors: number;

    constructor(brand: string, model: string, doors: number) {
        super(brand, model);  // 親クラスのコンストラクタ呼び出し
        this.doors = doors;
    }

    public getInfo(): string {  // オーバーライド
        return `${super.getInfo()}（${this.doors}ドア）`;
    }

    public drive(): void {
        console.log(`${this.getInfo()}で運転中...`);
    }
}

/**
 * クラスの継承の使用例を示す
 */
function demonstrateInheritance(): void {
    console.log("=== クラスの継承 のデモンストレーション ===");
    
    const car = new Car("トヨタ", "プリウス", 4);
    car.start();
    car.drive();
}

// ===================================
// セクション13: InterfaceとClassの組み合わせ
// ===================================

class Duck implements Flyable, Swimmable {
    altitude: number = 0;
    depth: number = 0;
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    fly(): void {
        this.altitude = 100;
        console.log(`${this.name}が高度${this.altitude}mで飛んでいます`);
    }

    swim(): void {
        this.depth = 2;
        console.log(`${this.name}が深度${this.depth}mで泳いでいます`);
    }

    walk(): void {
        this.altitude = 0;
        this.depth = 0;
        console.log(`${this.name}が地上を歩いています`);
    }
}

/**
 * InterfaceとClassの組み合わせの使用例を示す
 */
function demonstrateInterfaceAndClass(): void {
    console.log("=== InterfaceとClass の組み合わせデモンストレーション ===");
    
    const duck = new Duck("アヒル");
    duck.walk();
    duck.fly();
    duck.swim();
}

// ===================================
// セクション14: Generics（ジェネリクス）基礎
// ===================================

function identity<T>(arg: T): T {
    console.log("引数の型:", typeof arg);
    console.log("値:", arg);
    return arg;
}

/**
 * Genericsの基本的な使用例を示す
 */
function demonstrateGenerics(): void {
    console.log("=== Generics基礎 のデモンストレーション ===");
    
    // 使用例
    const numberResult = identity<number>(42);
    const stringResult = identity<string>("こんにちは");
    const boolResult = identity<boolean>(true);

    console.log("数値結果:", numberResult);
    console.log("文字列結果:", stringResult);
    console.log("真偽値結果:", boolResult);

    // 型推論も可能
    const autoNumber = identity(123);  // number型として推論
    const autoString = identity("自動推論");  // string型として推論
    console.log("自動推論された数値:", autoNumber);
    console.log("自動推論された文字列:", autoString);
}

// ===================================
// セクション15: ジェネリッククラス
// ===================================

class Box<T> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    getValue(): T {
        return this.value;
    }

    setValue(value: T): void {
        this.value = value;
    }

    getType(): string {
        return typeof this.value;
    }
}

/**
 * ジェネリッククラスの使用例を示す
 */
function demonstrateGenericClass(): void {
    console.log("=== ジェネリッククラス のデモンストレーション ===");
    
    // 異なる型のBox作成
    const numberBox = new Box<number>(123);
    const stringBox = new Box<string>("テキスト");
    const boolBox = new Box<boolean>(true);

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

function logLength<T extends Lengthwise>(arg: T): T {
    console.log(`長さ: ${arg.length}`);
    return arg;
}

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

/**
 * ジェネリック制約の使用例を示す
 */
function demonstrateGenericConstraints(): void {
    console.log("=== ジェネリック制約 のデモンストレーション ===");
    
    // length プロパティを持つオブジェクトのみ受け入れる
    logLength("文字列です");
    logLength([1, 2, 3, 4]);
    logLength({ length: 10, value: "test" });

    // keyof を使用した型安全なプロパティアクセス
    const person = { name: "田中", age: 30, city: "東京" };
    const name = getProperty(person, "name");     // string型
    const age = getProperty(person, "age");       // number型
    console.log("取得した名前:", name);
    console.log("取得した年齢:", age);
}

// ===================================
// セクション17: ユーティリティ型
// ===================================

/**
 * TypeScriptのユーティリティ型の使用例を示す
 */
function demonstrateUtilityTypes(): void {
    console.log("=== ユーティリティ型 のデモンストレーション ===");
    
    // Partial<T> - すべてのプロパティをオプショナルに
    const updateUser: Partial<OriginalUser> = {
        name: "更新された名前"  // 一部のプロパティのみ
    };
    console.log("部分更新用オブジェクト:", updateUser);

    // Pick<T, K> - 特定のプロパティだけ抽出
    const summary: Pick<OriginalUser, "id" | "name"> = {
        id: 1,
        name: "田中太郎"
    };
    console.log("ユーザー概要:", summary);

    // Omit<T, K> - 特定のプロパティを除外
    const newUser: Omit<OriginalUser, "id"> = {
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
function demonstrateMappedTypes(): void {
    console.log("=== Mapped Types のデモンストレーション ===");
    
    // 使用例
    const user: BaseUser = {
        name: "田中太郎",
        age: 30,
        email: "tanaka@example.com"
    };

    const readonlyUser: ReadonlyUser = {
        name: "読み取り専用ユーザー",
        age: 25,
        email: "readonly@example.com"
    };

    const stringifiedUser: StringifiedUser = {
        name: "文字列名前",
        age: "30",    // 数値も文字列として扱う
        email: "string@example.com"
    };

    console.log("通常のユーザー:", user);
    console.log("読み取り専用ユーザー:", readonlyUser);
    console.log("文字列化ユーザー:", stringifiedUser);
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
        const output = captureConsoleOutput(() => demonstrateInterface());
        displayResult('result-interface', output);
    });

    buttons.btnInterfaceMethod?.addEventListener('click', () => {
        const output = captureConsoleOutput(() => demonstrateInterfaceWithMethods());
        displayResult('result-interface-method', output);
    });

    buttons.btnClass?.addEventListener('click', () => {
        const output = captureConsoleOutput(() => demonstrateClass());
        displayResult('result-class', output);
    });

    buttons.btnInheritance?.addEventListener('click', () => {
        const output = captureConsoleOutput(() => demonstrateInheritance());
        displayResult('result-inheritance', output);
    });

    buttons.btnInterfaceClass?.addEventListener('click', () => {
        const output = captureConsoleOutput(() => demonstrateInterfaceAndClass());
        displayResult('result-interface-class', output);
    });

    buttons.btnGenerics?.addEventListener('click', () => {
        const output = captureConsoleOutput(() => demonstrateGenerics());
        displayResult('result-generics', output);
    });

    buttons.btnGenericsClass?.addEventListener('click', () => {
        const output = captureConsoleOutput(() => demonstrateGenericClass());
        displayResult('result-generics-class', output);
    });

    buttons.btnConstraints?.addEventListener('click', () => {
        const output = captureConsoleOutput(() => demonstrateGenericConstraints());
        displayResult('result-constraints', output);
    });

    buttons.btnUtility?.addEventListener('click', () => {
        const output = captureConsoleOutput(() => demonstrateUtilityTypes());
        displayResult('result-utility', output);
    });

    buttons.btnMapped?.addEventListener('click', () => {
        const output = captureConsoleOutput(() => demonstrateMappedTypes());
        displayResult('result-mapped', output);
    });
});  
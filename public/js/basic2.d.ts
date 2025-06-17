/**
 * TypeScript応用編のサンプルコード
 * Interface、Class、Generics、ユーティリティ型の使用方法を学習
 */
interface BasicUser {
    id: number;
    name: string;
    email: string;
    isActive?: boolean;
}
interface Calculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
    multiply(a: number, b: number): number;
}
interface Flyable {
    fly(): void;
    altitude: number;
}
interface Swimmable {
    swim(): void;
    depth: number;
}
interface Lengthwise {
    length: number;
}
interface OriginalUser {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
}
interface BaseUser {
    name: string;
    age: number;
    email: string;
}
type ReadonlyUser = {
    readonly [K in keyof BaseUser]: BaseUser[K];
};
type OptionalUser = {
    [K in keyof BaseUser]?: BaseUser[K];
};
type StringifiedUser = {
    [K in keyof BaseUser]: string;
};
/**
 * Interfaceの基本的な使用例を示す
 */
declare function demonstrateInterface(): void;
/**
 * メソッドを持つInterfaceの使用例を示す
 */
declare function demonstrateInterfaceWithMethods(): void;
declare class Animal {
    private name;
    protected species: string;
    age: number;
    constructor(name: string, species: string, age: number);
    getName(): string;
    getInfo(): string;
}
/**
 * Classの基本的な使用例を示す
 */
declare function demonstrateClass(): void;
declare class Vehicle {
    protected brand: string;
    protected model: string;
    constructor(brand: string, model: string);
    getInfo(): string;
    start(): void;
}
declare class Car extends Vehicle {
    private doors;
    constructor(brand: string, model: string, doors: number);
    getInfo(): string;
    drive(): void;
}
/**
 * クラスの継承の使用例を示す
 */
declare function demonstrateInheritance(): void;
declare class Duck implements Flyable, Swimmable {
    altitude: number;
    depth: number;
    private name;
    constructor(name: string);
    fly(): void;
    swim(): void;
    walk(): void;
}
/**
 * InterfaceとClassの組み合わせの使用例を示す
 */
declare function demonstrateInterfaceAndClass(): void;
declare function identity<T>(arg: T): T;
/**
 * Genericsの基本的な使用例を示す
 */
declare function demonstrateGenerics(): void;
declare class Box<T> {
    private value;
    constructor(value: T);
    getValue(): T;
    setValue(value: T): void;
    getType(): string;
}
/**
 * ジェネリッククラスの使用例を示す
 */
declare function demonstrateGenericClass(): void;
declare function logLength<T extends Lengthwise>(arg: T): T;
declare function getProperty<T, K extends keyof T>(obj: T, key: K): T[K];
/**
 * ジェネリック制約の使用例を示す
 */
declare function demonstrateGenericConstraints(): void;
/**
 * TypeScriptのユーティリティ型の使用例を示す
 */
declare function demonstrateUtilityTypes(): void;
/**
 * Mapped Typesの使用例を示す
 */
declare function demonstrateMappedTypes(): void;
/**
 * 結果をHTMLページに表示するヘルパー関数
 */
declare function displayResult2(resultId: string, content: string): void;
/**
 * コンソールログをキャプチャして文字列として返すヘルパー関数
 */
declare function captureConsoleOutput2(fn: () => void): string;

/**
 * TypeScript上級編のサンプルコード
 * 条件付き型、Template Literal Types、高度なMapped Types、非同期処理の使用方法を学習
 */
type IsString<T> = T extends string ? "文字列です" : "文字列ではありません";
type ElementType<T> = T extends (infer U)[] ? U : never;
type Greeting = `Hello, ${string}!`;
type EventName = `on${Capitalize<string>}`;
type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";
type APIEndpoint = `/api/${string}`;
type APICall = `${HTTPMethod} ${APIEndpoint}`;
type CSSProperty = "margin" | "padding" | "border";
type CSSDirection = "top" | "right" | "bottom" | "left";
type CSSPropertyWithDirection = `${CSSProperty}-${CSSDirection}`;
interface User {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
}
type PromisifiedUser = {
    [K in keyof User]: Promise<User[K]>;
};
type NullableUser = {
    [K in keyof User]: User[K] | null;
};
type StringProperties<T> = {
    [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];
interface LoadingState {
    status: "loading";
    progress: number;
}
interface SuccessState {
    status: "success";
    data: string;
}
interface ErrorState {
    status: "error";
    error: string;
}
type AsyncState = LoadingState | SuccessState | ErrorState;
interface Dog {
    type: "dog";
    bark(): void;
}
interface Cat {
    type: "cat";
    meow(): void;
}
type PetAnimal = Dog | Cat;
interface UserData {
    id: number;
    name: string;
    email: string;
}
interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}
type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};
type PathsToStringProps<T> = T extends string ? [] : {
    [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>];
}[Extract<keyof T, string>];
interface NestedUser {
    id: number;
    profile: {
        name: string;
        contact: {
            email: string;
            phone: string;
        };
    };
    preferences: {
        theme: string;
        language: string;
    };
}
type IsArray<T> = T extends any[] ? true : false;
type ArrayCheck1 = IsArray<string[]>;
type ArrayCheck2 = IsArray<string>;
declare function checkType<T>(value: T): IsString<T>;
/**
 * Conditional Typesの使用例を示す
 */
declare function demonstrateConditionalTypes(): void;
declare function makeAPICall(endpoint: APICall): void;
/**
 * Template Literal Typesの使用例を示す
 */
declare function demonstrateTemplateLiteralTypes(): void;
declare function getStringProperties<T extends object>(obj: T): (keyof T)[];
/**
 * 高度なMapped Typesの使用例を示す
 */
declare function demonstrateAdvancedMappedTypes(): void;
declare function handleAsyncState(state: AsyncState): string;
/**
 * Discriminated Unionsの使用例を示す
 */
declare function demonstrateDiscriminatedUnions(): void;
declare function isDog(animal: PetAnimal): animal is Dog;
declare function isCat(animal: PetAnimal): animal is Cat;
declare function makeSound(animal: PetAnimal): void;
declare function makeSound2(animal: PetAnimal): void;
/**
 * Type Guardsの使用例を示す
 */
declare function demonstrateTypeGuards(): void;
declare function withLogging<T extends (...args: any[]) => any>(fn: T): T;
declare function withTiming<T extends (...args: any[]) => any>(fn: T): T;
/**
 * Decoratorsの使用例を示す
 */
declare function demonstrateDecorators(): void;
declare namespace MathUtils {
    function add(a: number, b: number): number;
    function multiply(a: number, b: number): number;
    function getInfo(): string;
}
declare namespace StringUtils {
    const utils: {
        capitalize(str: string): string;
        reverse(str: string): string;
        getUsageCount(): number;
    };
}
/**
 * Modules and Namespacesの使用例を示す
 */
declare function demonstrateModulesAndNamespaces(): void;
declare function fetchUser(id: number): Promise<ApiResponse<UserData>>;
/**
 * 非同期処理とPromise型の使用例を示す
 */
declare function demonstrateAsyncTypes(): Promise<void>;
declare class UserBuilder {
    private user;
    setId(id: number): UserBuilder;
    setName(name: string): UserBuilder;
    setEmail(email: string): UserBuilder;
    build(): UserData;
}
declare class UserFactory {
    static createAdmin(name: string): UserData;
    static createGuest(): UserData;
}
/**
 * デザインパターンの使用例を示す
 */
declare function demonstrateDesignPatterns(): void;
declare function getNestedProperty<T, K extends keyof T>(obj: T, key: K): T[K];
/**
 * TypeScript型チャレンジの使用例を示す
 */
declare function demonstrateTypeChallenges(): void;
/**
 * 結果をHTMLページに表示するヘルパー関数
 */
declare function displayResult3(resultId: string, content: string): void;
/**
 * コンソールログをキャプチャして文字列として返すヘルパー関数
 */
declare function captureConsoleOutput3(fn: () => void): string;

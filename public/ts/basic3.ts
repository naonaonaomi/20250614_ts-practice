/**
 * TypeScript上級編のサンプルコード
 * 条件付き型、Template Literal Types、高度なMapped Types、非同期処理の使用方法を学習
 */

// ===================================
// 型定義セクション
// ===================================

// セクション19で使用する型
type IsString<T> = T extends string ? "文字列です" : "文字列ではありません";
type ElementType<T> = T extends (infer U)[] ? U : never;

// セクション20で使用する型
type Greeting = `Hello, ${string}!`;
type EventName = `on${Capitalize<string>}`;
type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";
type APIEndpoint = `/api/${string}`;
type APICall = `${HTTPMethod} ${APIEndpoint}`;

type CSSProperty = "margin" | "padding" | "border";
type CSSDirection = "top" | "right" | "bottom" | "left";
type CSSPropertyWithDirection = `${CSSProperty}-${CSSDirection}`;

// セクション21で使用する型
interface User {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
}

// すべてのプロパティをPromise型にする
type PromisifiedUser = {
    [K in keyof User]: Promise<User[K]>;
};

// すべてのプロパティにnullを許可する
type NullableUser = {
    [K in keyof User]: User[K] | null;
};

// 特定の型のプロパティのみを抽出
type StringProperties<T> = {
    [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

// セクション22で使用する型
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

// セクション23で使用する型
interface Dog {
    type: "dog";
    bark(): void;
}

interface Cat {
    type: "cat";
    meow(): void;
}

type PetAnimal = Dog | Cat;

// セクション25で使用する型
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

// セクション28で使用する型
type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

type PathsToStringProps<T> = T extends string
    ? []
    : {
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
type ArrayCheck1 = IsArray<string[]>;  // true
type ArrayCheck2 = IsArray<string>;    // false

// ===================================
// セクション19: Conditional Types（条件付き型）
// ===================================

function checkType<T>(value: T): IsString<T> {
    return (typeof value === "string" ? "文字列です" : "文字列ではありません") as IsString<T>;
}

/**
 * Conditional Typesの使用例を示す
 */
function demonstrateConditionalTypes(): void {
    console.log("=== Conditional Types のデモンストレーション ===");

    // 実行時の動作例
    const stringResult = checkType("hello");
    console.log("文字列の場合:", stringResult);

    const numberResult = checkType(42);
    console.log("数値の場合:", numberResult);

    // 配列から要素の型を抽出（概念的に）
    const numbers = [1, 2, 3];
    const strings = ["a", "b", "c"];

    console.log("配列の要素:");
    console.log("数値配列:", numbers);
    console.log("文字列配列:", strings);
}

// ===================================
// セクション20: Template Literal Types
// ===================================

function makeAPICall(endpoint: APICall): void {
    console.log(`APIを呼び出し: ${endpoint}`);
}

/**
 * Template Literal Typesの使用例を示す
 */
function demonstrateTemplateLiteralTypes(): void {
    console.log("=== Template Literal Types のデモンストレーション ===");
    
    // 型安全なAPI呼び出し例
    makeAPICall("GET /api/users");
    makeAPICall("POST /api/users");
    makeAPICall("PUT /api/users/123");
    makeAPICall("DELETE /api/users/123");

    // 文字列操作の実用例
    const cssProperties: CSSPropertyWithDirection[] = [
        "margin-top",
        "padding-left",
        "border-bottom"
    ];

    console.log("CSS プロパティ例:", cssProperties);
}

// ===================================
// セクション21: 高度なMapped Types
// ===================================

function getStringProperties<T extends object>(obj: T): (keyof T)[] {
    return Object.keys(obj).filter(key => 
        typeof obj[key as keyof T] === 'string'
    ) as (keyof T)[];
}

/**
 * 高度なMapped Typesの使用例を示す
 */
function demonstrateAdvancedMappedTypes(): void {
    console.log("=== 高度なMapped Types のデモンストレーション ===");
    
    // 実用例の実装
    const user: User = {
        id: 1,
        name: "田中太郎",
        email: "tanaka@example.com",
        isActive: true
    };

    const stringProps = getStringProperties(user);
    console.log("ユーザーオブジェクト:", user);
    console.log("文字列プロパティ:", stringProps);
}

// ===================================
// セクション22: Discriminated Unions（判別可能なユニオン型）
// ===================================

function handleAsyncState(state: AsyncState): string {
    switch (state.status) {
        case "loading":
            return `読み込み中... ${state.progress}%`;
        case "success":
            return `成功: ${state.data}`;
        case "error":
            return `エラー: ${state.error}`;
        default:
            // TypeScriptが全てのケースを処理していることを保証
            const _exhaustive: never = state;
            return _exhaustive;
    }
}

/**
 * Discriminated Unionsの使用例を示す
 */
function demonstrateDiscriminatedUnions(): void {
    console.log("=== Discriminated Unions のデモンストレーション ===");
    
    // 実用例
    const states: AsyncState[] = [
        { status: "loading", progress: 50 },
        { status: "success", data: "データ取得完了" },
        { status: "error", error: "ネットワークエラー" }
    ];

    states.forEach((state, index) => {
        console.log(`状態 ${index + 1}:`, handleAsyncState(state));
    });
}

// ===================================
// セクション23: Type Guards（型ガード）
// ===================================

function isDog(animal: PetAnimal): animal is Dog {
    return animal.type === "dog";
}

function isCat(animal: PetAnimal): animal is Cat {
    return animal.type === "cat";
}

function makeSound(animal: PetAnimal): void {
    if (isDog(animal)) {
        // ここではanimalはDog型として扱われる
        animal.bark();
        console.log("犬が鳴きました");
    } else if (isCat(animal)) {
        // ここではanimalはCat型として扱われる
        animal.meow();
        console.log("猫が鳴きました");
    }
}

function makeSound2(animal: PetAnimal): void {
    if ("bark" in animal) {
        animal.bark();
    } else {
        animal.meow();
    }
}

/**
 * Type Guardsの使用例を示す
 */
function demonstrateTypeGuards(): void {
    console.log("=== Type Guards のデモンストレーション ===");
    
    // 動物の実装
    const dog: Dog = {
        type: "dog",
        bark() { console.log("ワンワン！"); }
    };

    const cat: Cat = {
        type: "cat",
        meow() { console.log("ニャーニャー！"); }
    };

    const animals: PetAnimal[] = [dog, cat];

    animals.forEach((animal, index) => {
        console.log(`動物 ${index + 1}:`);
        makeSound(animal);
    });
}

// ===================================
// セクション24: Decorators（デコレータ）
// ===================================

function withLogging<T extends (...args: any[]) => any>(fn: T): T {
    return ((...args: any[]) => {
        console.log(`関数 ${fn.name} を実行開始, 引数:`, args);
        const result = fn(...args);
        console.log(`関数 ${fn.name} を実行完了, 結果:`, result);
        return result;
    }) as T;
}

function withTiming<T extends (...args: any[]) => any>(fn: T): T {
    return ((...args: any[]) => {
        const start = Date.now();
        const result = fn(...args);
        const end = Date.now();
        console.log(`関数 ${fn.name} の実行時間: ${end - start}ms`);
        return result;
    }) as T;
}

/**
 * Decoratorsの使用例を示す
 */
function demonstrateDecorators(): void {
    console.log("=== Decorators のデモンストレーション ===");
    
    const add = (a: number, b: number): number => a + b;
    const multiply = (a: number, b: number): number => a * b;

    // デコレータを適用
    const loggedAdd = withLogging(add);
    const timedMultiply = withTiming(multiply);

    console.log("ログ付き加算:");
    loggedAdd(5, 3);

    console.log("時間測定付き乗算:");
    timedMultiply(4, 6);
}

// ===================================
// セクション25: Modules and Namespaces
// ===================================

namespace MathUtils {
    export function add(a: number, b: number): number {
        return a + b;
    }

    export function multiply(a: number, b: number): number {
        return a * b;
    }

    // 内部関数（エクスポートされない）
    function privateHelper(): string {
        return "これは内部関数です";
    }

    export function getInfo(): string {
        return `Math utilities: ${privateHelper()}`;
    }
}

namespace StringUtils {
    let usageCount = 0;

    export const utils = {
        capitalize(str: string): string {
            usageCount++;
            return str.charAt(0).toUpperCase() + str.slice(1);
        },

        reverse(str: string): string {
            usageCount++;
            return str.split('').reverse().join('');
        },

        getUsageCount(): number {
            return usageCount;
        }
    };
}

/**
 * Modules and Namespacesの使用例を示す
 */
function demonstrateModulesAndNamespaces(): void {
    console.log("=== Modules and Namespaces のデモンストレーション ===");
    
    // 名前空間の使用
    console.log("5 + 3 =", MathUtils.add(5, 3));
    console.log("4 × 7 =", MathUtils.multiply(4, 7));
    console.log("Math情報:", MathUtils.getInfo());

    // 文字列ユーティリティの使用
    console.log("大文字化:", StringUtils.utils.capitalize("hello"));
    console.log("逆転:", StringUtils.utils.reverse("world"));
    console.log("使用回数:", StringUtils.utils.getUsageCount());
}

// ===================================
// セクション26: 非同期処理とPromise型
// ===================================

async function fetchUser(id: number): Promise<ApiResponse<UserData>> {
    // 模擬的なAPI呼び出し
    return new Promise((resolve) => {
        setTimeout(() => {
            if (id === 1) {
                resolve({
                    success: true,
                    data: {
                        id: 1,
                        name: "田中太郎",
                        email: "tanaka@example.com"
                    }
                });
            } else {
                resolve({
                    success: false,
                    error: "ユーザーが見つかりません"
                });
            }
        }, 100);
    });
}

/**
 * 非同期処理とPromise型の使用例を示す
 */
async function demonstrateAsyncTypes(): Promise<void> {
    console.log("=== 非同期処理とPromise型 のデモンストレーション ===");
    
    try {
        console.log("ユーザー取得開始...");
        
        const result1 = await fetchUser(1);
        if (result1.success) {
            console.log("ユーザー1取得成功:", result1.data);
        } else {
            console.log("ユーザー1取得失敗:", result1.error);
        }

        const result2 = await fetchUser(999);
        if (result2.success) {
            console.log("ユーザー999取得成功:", result2.data);
        } else {
            console.log("ユーザー999取得失敗:", result2.error);
        }
    } catch (error) {
        console.error("エラーが発生しました:", error);
    }
}

// ===================================
// セクション27: デザインパターン
// ===================================

class UserBuilder {
    private user: Partial<UserData> = {};

    setId(id: number): UserBuilder {
        this.user.id = id;
        return this;
    }

    setName(name: string): UserBuilder {
        this.user.name = name;
        return this;
    }

    setEmail(email: string): UserBuilder {
        this.user.email = email;
        return this;
    }

    build(): UserData {
        if (!this.user.id || !this.user.name || !this.user.email) {
            throw new Error("必須プロパティが不足しています");
        }
        return this.user as UserData;
    }
}

class UserFactory {
    static createAdmin(name: string): UserData {
        return {
            id: Math.floor(Math.random() * 1000),
            name: `【管理者】${name}`,
            email: `admin.${name.toLowerCase()}@company.com`
        };
    }

    static createGuest(): UserData {
        return {
            id: 0,
            name: "ゲストユーザー",
            email: "guest@example.com"
        };
    }
}

/**
 * デザインパターンの使用例を示す
 */
function demonstrateDesignPatterns(): void {
    console.log("=== デザインパターン のデモンストレーション ===");
    
    // Builderパターン
    const user1 = new UserBuilder()
        .setId(1)
        .setName("田中太郎")
        .setEmail("tanaka@example.com")
        .build();

    // Factoryパターン
    const admin = UserFactory.createAdmin("管理者");
    const guest = UserFactory.createGuest();

    console.log("ビルダーで作成:", user1);
    console.log("ファクトリで作成（管理者）:", admin);
    console.log("ファクトリで作成（ゲスト）:", guest);
}

// ===================================
// セクション28: TypeScript型チャレンジ
// ===================================

function getNestedProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

/**
 * TypeScript型チャレンジの使用例を示す
 */
function demonstrateTypeChallenges(): void {
    console.log("=== TypeScript型チャレンジ のデモンストレーション ===");
    
    // 実用例
    const nestedUser: NestedUser = {
        id: 1,
        profile: {
            name: "田中太郎",
            contact: {
                email: "tanaka@example.com",
                phone: "090-1234-5678"
            }
        },
        preferences: {
            theme: "dark",
            language: "ja"
        }
    };

    console.log("ネストしたオブジェクトの例:");
    console.log("ユーザー:", nestedUser);
    console.log("プロフィール:", getNestedProperty(nestedUser, "profile"));
    console.log("名前:", nestedUser.profile.name);
    console.log("メール:", nestedUser.profile.contact.email);

    console.log("型レベルでの配列チェック例を実装しました");
}

// ===================================
// DOM操作・イベント処理セクション
// ===================================

/**
 * 結果をHTMLページに表示するヘルパー関数
 */
function displayResult3(resultId: string, content: string): void {
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
function captureConsoleOutput3(fn: () => void): string {
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
        btnConditional: document.getElementById('btn-conditional'),
        btnTemplate: document.getElementById('btn-template'),
        btnMappedAdvanced: document.getElementById('btn-mapped-advanced'),
        btnUnions: document.getElementById('btn-unions'),
        btnGuards: document.getElementById('btn-guards'),
        btnDecorators: document.getElementById('btn-decorators'),
        btnModules: document.getElementById('btn-modules'),
        btnAsyncTypes: document.getElementById('btn-async-types'),
        btnPatterns: document.getElementById('btn-patterns'),
        btnChallenges: document.getElementById('btn-challenges')
    };

    // 各ボタンのイベントリスナー設定
    buttons.btnConditional?.addEventListener('click', () => {
        const output = captureConsoleOutput3(() => demonstrateConditionalTypes());
        displayResult3('result-conditional', output);
    });

    buttons.btnTemplate?.addEventListener('click', () => {
        const output = captureConsoleOutput3(() => demonstrateTemplateLiteralTypes());
        displayResult3('result-template', output);
    });

    buttons.btnMappedAdvanced?.addEventListener('click', () => {
        const output = captureConsoleOutput3(() => demonstrateAdvancedMappedTypes());
        displayResult3('result-mapped-advanced', output);
    });

    buttons.btnUnions?.addEventListener('click', () => {
        const output = captureConsoleOutput3(() => demonstrateDiscriminatedUnions());
        displayResult3('result-unions', output);
    });

    buttons.btnGuards?.addEventListener('click', () => {
        const output = captureConsoleOutput3(() => demonstrateTypeGuards());
        displayResult3('result-guards', output);
    });

    buttons.btnDecorators?.addEventListener('click', () => {
        const output = captureConsoleOutput3(() => demonstrateDecorators());
        displayResult3('result-decorators', output);
    });

    buttons.btnModules?.addEventListener('click', () => {
        const output = captureConsoleOutput3(() => demonstrateModulesAndNamespaces());
        displayResult3('result-modules', output);
    });

    buttons.btnAsyncTypes?.addEventListener('click', async () => {
        const output = await new Promise<string>((resolve) => {
            const originalLog = console.log;
            let output = '';
            
            console.log = (...args: any[]) => {
                output += args.join(' ') + '\n';
                originalLog.apply(console, args);
            };
            
            demonstrateAsyncTypes().then(() => {
                console.log = originalLog;
                resolve(output);
            });
        });
        displayResult3('result-async-types', output);
    });

    buttons.btnPatterns?.addEventListener('click', () => {
        const output = captureConsoleOutput3(() => demonstrateDesignPatterns());
        displayResult3('result-patterns', output);
    });

    buttons.btnChallenges?.addEventListener('click', () => {
        const output = captureConsoleOutput3(() => demonstrateTypeChallenges());
        displayResult3('result-challenges', output);
    });
}); 
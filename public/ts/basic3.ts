// TypeScript上級編のサンプルコード

// セクション1: Conditional Types（条件付き型）
type IsString<T> = T extends string ? "文字列です" : "文字列ではありません";
type ElementType<T> = T extends (infer U)[] ? U : never;

function checkType<T>(value: T): IsString<T> {
    return (typeof value === "string" ? "文字列です" : "文字列ではありません") as IsString<T>;
}

export function demonstrateConditionalTypes(): void {
    console.log("型チェック例:");

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

// セクション2: Template Literal Types
type Greeting = `Hello, ${string}!`;
type EventName = `on${Capitalize<string>}`;
type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";
type APIEndpoint = `/api/${string}`;
type APICall = `${HTTPMethod} ${APIEndpoint}`;

function makeAPICall(endpoint: APICall): void {
    console.log(`APIを呼び出し: ${endpoint}`);
}

type CSSProperty = "margin" | "padding" | "border";
type CSSDirection = "top" | "right" | "bottom" | "left";
type CSSPropertyWithDirection = `${CSSProperty}-${CSSDirection}`;

export function demonstrateTemplateLiteralTypes(): void {
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

// セクション3: 高度なMapped Types
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

function getStringProperties<T extends object>(obj: T): (keyof T)[] {
    return Object.keys(obj).filter(key => 
        typeof obj[key as keyof T] === 'string'
    ) as (keyof T)[];
}

export function demonstrateAdvancedMappedTypes(): void {
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

// セクション4: Discriminated Unions（判別可能なユニオン型）
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

export function demonstrateDiscriminatedUnions(): void {
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

// セクション5: Type Guards（型ガード）
interface Dog {
    type: "dog";
    bark(): void;
}

interface Cat {
    type: "cat";
    meow(): void;
}

type Animal = Dog | Cat;

function isDog(animal: Animal): animal is Dog {
    return animal.type === "dog";
}

function isCat(animal: Animal): animal is Cat {
    return animal.type === "cat";
}

function makeSound(animal: Animal): void {
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

function makeSound2(animal: Animal): void {
    if ("bark" in animal) {
        animal.bark();
    } else {
        animal.meow();
    }
}

export function demonstrateTypeGuards(): void {
    // 動物の実装
    const dog: Dog = {
        type: "dog",
        bark() { console.log("ワンワン！"); }
    };

    const cat: Cat = {
        type: "cat",
        meow() { console.log("ニャーニャー！"); }
    };

    console.log("動物の鳴き声:");
    makeSound(dog);
    makeSound(cat);

    console.log("in演算子を使った例:");
    makeSound2(dog);
    makeSound2(cat);
}

// セクション6: Decorators（デコレータ）
function withLogging<T extends (...args: any[]) => any>(fn: T): T {
    return ((...args: any[]) => {
        console.log(`関数 ${fn.name} を実行中...`);
        console.log(`引数:`, args);
        
        const result = fn(...args);
        
        console.log(`関数 ${fn.name} の実行完了`);
        console.log(`結果:`, result);
        
        return result;
    }) as T;
}

function withTiming<T extends (...args: any[]) => any>(fn: T): T {
    return ((...args: any[]) => {
        const start = performance.now();
        const result = fn(...args);
        const end = performance.now();
        
        console.log(`${fn.name} の実行時間: ${(end - start).toFixed(2)}ms`);
        
        return result;
    }) as T;
}

export function demonstrateDecorators(): void {
    // 使用例
    const add = (a: number, b: number): number => a + b;
    const multiply = (a: number, b: number): number => a * b;

    // デコレータを適用
    const loggedAdd = withLogging(add);
    const timedMultiply = withTiming(multiply);

    console.log("デコレータの例:");
    loggedAdd(5, 3);
    timedMultiply(10, 20);
}

// セクション7: Modules と Namespaces
namespace MathUtils {
    export function add(a: number, b: number): number {
        return a + b;
    }
    
    export function multiply(a: number, b: number): number {
        return a * b;
    }
    
    export const PI = 3.14159;
    
    // プライベート関数（exportしない）
    function privateHelper(): string {
        return "これは内部関数です";
    }
    
    export function getInfo(): string {
        return privateHelper() + ` PI = ${PI}`;
    }
}

// Module パターンの実装
const StringUtils = (function() {
    // プライベート変数
    let counter = 0;
    
    return {
        capitalize(str: string): string {
            counter++;
            return str.charAt(0).toUpperCase() + str.slice(1);
        },
        
        reverse(str: string): string {
            counter++;
            return str.split('').reverse().join('');
        },
        
        getUsageCount(): number {
            return counter;
        }
    };
})();

export function demonstrateModulesAndNamespaces(): void {
    // 使用例
    console.log("Namespace例:");
    console.log("足し算:", MathUtils.add(5, 3));
    console.log("掛け算:", MathUtils.multiply(4, 6));
    console.log("情報:", MathUtils.getInfo());

    console.log("Module例:");
    console.log("大文字化:", StringUtils.capitalize("hello"));
    console.log("逆順:", StringUtils.reverse("world"));
    console.log("使用回数:", StringUtils.getUsageCount());
}

// セクション8: 非同期処理の型安全性
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

async function fetchUser(id: number): Promise<ApiResponse<UserData>> {
    try {
        console.log(`ユーザー ${id} のデータを取得中...`);
        
        // 模擬的な非同期処理
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (id > 0) {
            return {
                success: true,
                data: {
                    id,
                    name: `ユーザー${id}`,
                    email: `user${id}@example.com`
                }
            };
        } else {
            return {
                success: false,
                error: "無効なユーザーIDです"
            };
        }
    } catch (error) {
        return {
            success: false,
            error: "サーバーエラーが発生しました"
        };
    }
}

export async function demonstrateAsyncTypes(): Promise<void> {
    console.log("非同期処理の開始");
    
    const result = await fetchUser(123);
    
    if (result.success && result.data) {
        console.log("取得成功:");
        console.log(`ID: ${result.data.id}`);
        console.log(`名前: ${result.data.name}`);
        console.log(`メール: ${result.data.email}`);
    } else {
        console.log("取得失敗:", result.error);
    }
}

// セクション9: 実践的なTypeScript設計パターン
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
            throw new Error("必須フィールドが不足しています");
        }
        
        return {
            id: this.user.id,
            name: this.user.name,
            email: this.user.email
        };
    }
}

class UserFactory {
    static createAdmin(name: string): UserData {
        return new UserBuilder()
            .setId(Date.now())
            .setName(name)
            .setEmail(`${name.toLowerCase()}@admin.com`)
            .build();
    }
    
    static createGuest(): UserData {
        return new UserBuilder()
            .setId(0)
            .setName("ゲスト")
            .setEmail("guest@example.com")
            .build();
    }
}

export function demonstrateDesignPatterns(): void {
    console.log("設計パターンの例:");

    const user1 = new UserBuilder()
        .setId(1)
        .setName("田中太郎")
        .setEmail("tanaka@example.com")
        .build();

    const admin = UserFactory.createAdmin("管理者");
    const guest = UserFactory.createGuest();

    console.log("ビルダーで作成:", user1);
    console.log("ファクトリで作成（管理者）:", admin);
    console.log("ファクトリで作成（ゲスト）:", guest);
}

// セクション10: TypeScript型チャレンジ
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

function getNestedProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

// 型の条件チェック例
type IsArray<T> = T extends any[] ? true : false;
type ArrayCheck1 = IsArray<string[]>;  // true
type ArrayCheck2 = IsArray<string>;    // false

export function demonstrateTypeChallenges(): void {
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
    function displayResult(resultId: string, content: string): void {
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
    function captureConsoleOutput(fn: () => void): string {
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

    // 各ボタンのイベントリスナー
    if (btn1) {
        btn1.addEventListener('click', () => {
            const output = captureConsoleOutput(() => demonstrateConditionalTypes());
            displayResult('result1', output);
        });
    }

    if (btn2) {
        btn2.addEventListener('click', () => {
            const output = captureConsoleOutput(() => demonstrateTemplateLiteralTypes());
            displayResult('result2', output);
        });
    }

    if (btn3) {
        btn3.addEventListener('click', () => {
            const output = captureConsoleOutput(() => demonstrateAdvancedMappedTypes());
            displayResult('result3', output);
        });
    }

    if (btn4) {
        btn4.addEventListener('click', () => {
            const output = captureConsoleOutput(() => demonstrateDiscriminatedUnions());
            displayResult('result4', output);
        });
    }

    if (btn5) {
        btn5.addEventListener('click', () => {
            const output = captureConsoleOutput(() => demonstrateTypeGuards());
            displayResult('result5', output);
        });
    }

    if (btn6) {
        btn6.addEventListener('click', () => {
            const output = captureConsoleOutput(() => demonstrateDecorators());
            displayResult('result6', output);
        });
    }

    if (btn7) {
        btn7.addEventListener('click', () => {
            const output = captureConsoleOutput(() => demonstrateModulesAndNamespaces());
            displayResult('result7', output);
        });
    }

    if (btn8) {
        btn8.addEventListener('click', async () => {
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
            displayResult('result8', output);
        });
    }

    if (btn9) {
        btn9.addEventListener('click', () => {
            const output = captureConsoleOutput(() => demonstrateDesignPatterns());
            displayResult('result9', output);
        });
    }

    if (btn10) {
        btn10.addEventListener('click', () => {
            const output = captureConsoleOutput(() => demonstrateTypeChallenges());
            displayResult('result10', output);
        });
    }
}); 
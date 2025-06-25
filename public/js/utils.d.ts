/**
 * Shared utility functions for TypeScript learning examples
 */
/**
 * Display results in HTML page
 */
export declare function displayResult(resultId: string, content: string): void;
/**
 * Capture console output and return as string
 */
export declare function captureConsoleOutput(fn: () => void): string;
/**
 * Capture async console output and return as Promise<string>
 */
export declare function captureAsyncConsoleOutput(fn: () => Promise<void>): Promise<string>;

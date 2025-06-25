/**
 * Shared utility functions for TypeScript learning examples
 */
/**
 * Display results in HTML page
 */
export function displayResult(resultId, content) {
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
 * Capture console output and return as string
 */
export function captureConsoleOutput(fn) {
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
 * Capture async console output and return as Promise<string>
 */
export function captureAsyncConsoleOutput(fn) {
    return new Promise((resolve) => {
        const originalLog = console.log;
        let output = '';
        console.log = (...args) => {
            output += args.join(' ') + '\n';
            originalLog.apply(console, args);
        };
        fn().then(() => {
            console.log = originalLog;
            resolve(output);
        });
    });
}
//# sourceMappingURL=utils.js.map
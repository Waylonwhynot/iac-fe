export function getEnv(key: string): string | undefined {
    if (typeof process !== 'undefined') {
        return process.env[key];
    }
}
import { getEnv } from '~/utils/env';

export const backend = getEnv("BACKEND") || "http://127.0.0.1:8000"
export const sessionSecret = getEnv("SESSION_SECRET")
export const loginPath = "/login"
export const websocketBasename = getEnv("WEBSOCKET_BASENAME") || "ws://127.0.0.1:8000"
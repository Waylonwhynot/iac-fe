import {backend} from '~/settings';


export const removeTrailingSlash = (input: string): string => {
    if (input.endsWith("/")) {
        return input.slice(0, -1);
    }
    return input;
}

export const getSearchParams = (url: string): URLSearchParams => {
    return new URLSearchParams(new URL(url).search);
}

export const rewrite = (url: string) => {
    console.log('url: ', url);
    try {
        const obj = new URL(url);
        const _backend = new URL(backend);
        obj.protocol = _backend.protocol;
        obj.host = _backend.host;
        obj.port = _backend.port;
        obj.pathname = `${removeTrailingSlash(_backend.pathname)}${obj.pathname}`;
        console.log('obj: ', obj.toString());
        return obj.toString();
    } catch (e) {
        return `${removeTrailingSlash(backend.toString())}${url}`;
    }
}
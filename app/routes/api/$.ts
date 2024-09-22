import { ActionFunction, LoaderFunction } from 'remix';
import { rewrite } from '~/api/utils';
import { getAuthorization } from '~/utils/session.server';

const proxy = async (request: Request) => {
    const url = rewrite(request.url);
    console.log('url: ', url);
    const authorization = await getAuthorization(request);
    if (authorization) {
        request.headers.set('Authorization', authorization);
    }
    const req = new Request(url, request);
    return await fetch(req);
};

export const loader: LoaderFunction = async ({ request }) => {
    return proxy(request);
};

export const action: ActionFunction = async ({ request }) => {
    return proxy(request);
};
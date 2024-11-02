import { FetchParams, Middleware, RequestContext, ResponseContext } from '~/generated';
import { rewrite } from '~/api/utils';
import { getAuthorization } from '~/utils/session.server';
import { redirect } from 'remix';
import { loginPath } from '~/settings';

export const server: (request: Request) => Middleware = (request: Request) => ({
    async pre(context: RequestContext): Promise<FetchParams | void> {
        const url = rewrite(context.url);
        const authorization = await getAuthorization(request);
        if (authorization) {
            return {
                url,
                init: {
                    ...context.init,
                    headers: { ...context.init.headers, 'Authorization': authorization },
                },
            };
        }
        return { url, init: context.init };

    },
});

export const auth: Middleware = {
    async post(context: ResponseContext): Promise<Response | void> {
        if (typeof window !== 'undefined') {
            if (context.response.status === 401 || context.response.status === 403) {
                let next = window.location.pathname;
                if (window.location.search) {
                    next = `${next}?${window.location.search}`;
                }
                if (window.location.hash) {
                    next = `${next}${window.location.hash}`;
                }
                const searchParams = new URLSearchParams([
                    ['redirectTo', next],
                ]);
                window.location.href = `${loginPath}?${searchParams}`;
            }
        }
        return context.response;
    },
};
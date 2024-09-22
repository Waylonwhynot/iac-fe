import { FetchParams, Middleware, RequestContext } from '~/generated';
import { rewrite } from '~/api/utils';
import { getAuthorization } from '~/utils/session.server';

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
import { createCookieSessionStorage, redirect } from 'remix';
import { sessionSecret } from '~/env';
import { Authorization } from '~/generated';
import dayjs from 'dayjs';

const storage = createCookieSessionStorage({
    cookie: {
        name: 'codebox_session',
        secure: process.env.NODE_ENV === 'production',
        secrets: [sessionSecret || ""],
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24,
        httpOnly: true,
    },
});

export async function createUserSession(authorization: Authorization, redirectTo: string) {
    const session = await storage.getSession();
    session.set('token', authorization.token);
    return redirect(redirectTo, {
        headers: {
            'Set-Cookie': await storage.commitSession(session),
        },
    })
}



export async function getAuthorization(request: Request): Promise<string | undefined> {
    const session = await storage.getSession(request.headers.get('Cookie'));
    const token = session.get('token');
    const expiredAt = session.get('expiredAt');
    if (expiredAt && (typeof expiredAt !== 'number' || dayjs().isAfter(dayjs(expiredAt)))) {
        const url = new URL(request.url)
        let next = url.pathname
        if (url.search) {
            next = `${next}?${url.search}`
        }
        if (url.hash) {
            next = `${next}${url.hash}`
        }
        const searchParams = new URLSearchParams([
            ['redirectTo', encodeURIComponent(next)],
        ]);
        throw redirect(`/login?${searchParams}`);
    }
    if (token && typeof token === 'string') {
        return `Bearer ${token}`;
    }
}
import { ActionFunction, json, LinksFunction, useSearchParams } from 'remix';
import styles from '~/styles/login.css';
import { authApi } from '~/api';
import { server } from '~/api/middlewares';
import { AuthorizationFromJSON } from '~/generated';
import { createUserSession } from '~/utils/session.server';

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: styles }];
};

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData();
    const username = form.get('username') as string;
    const password = form.get('password') as string;
    const redirectTo = form.get('redirectTo') as string || '/';
    if (!username || !password) {
        return json({ message: 'login failed' }, { status: 400 });
    }
    const authorization = await authApi.withMiddleware(server(request)).login({
        authorization: AuthorizationFromJSON({
            username,
            password,
        }),
    });
    return await createUserSession(authorization, redirectTo);
};

export default function() {
    const [searchParams] = useSearchParams();

    return (
        <div className="page">
            <form className="login" method="post">
                <input type="hidden" name="redirectTo" value={searchParams.get('redirectTo') ?? undefined} />
                <input type="text" placeholder="username" name="username" />
                <input type="text" placeholder="password" name="password" />
                <input type="submit" value="login" />
            </form>
        </div>
    );
}
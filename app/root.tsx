import {
    Links,
    Link,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration, LinksFunction, useLocation,
} from 'remix';
import type {MetaFunction} from "remix";
import {Layout, Menu} from "antd";
import React from "react";
import antdCompactStyle from "antd/dist/antd.compact.css";
import antdStyle from "antd/dist/antd.css";
import style from "~/styles/root.css";

const {Header} = Layout;

export const meta: MetaFunction = () => {
    return {title: "New Remix App"};
};

export const links: LinksFunction = () => {
    return [
        {rel: "stylesheet", href: antdStyle},
        {rel: "stylesheet", href: antdCompactStyle},
        {rel: "stylesheet", href: style},
    ];
}

const Document = ({children}: { children: React.ReactNode }) => {
    const location = useLocation()
    const key = location.pathname.split("/")[1]
    return (
        <Layout>
            <Header className="header" style={{paddingLeft: 16}}>
                <Link to="/" className="logo"/>
                <Menu theme="dark" mode="horizontal" selectedKeys={[key]}>
                    <Menu.Item key="iac">
                        <Link to="/iac">IAC</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        In Progress
                    </Menu.Item>
                </Menu>
            </Header>
            {children}
        </Layout>
    )
}

export default function App() {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width,initial-scale=1"/>
            <Meta/>
            <Links/>
        </head>
        <body>
        <Document>
            <Outlet/>
        </Document>
        <ScrollRestoration/>
        <Scripts/>
        <LiveReload/>
        </body>
        </html>
    );
}

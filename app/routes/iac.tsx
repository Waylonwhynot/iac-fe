import {Layout, Menu} from "antd";
import {BranchesOutlined, CodeOutlined} from "@ant-design/icons";
// import {useRoute} from "~/hooks"
import {useState} from "react";

import { Link, Outlet, useLocation } from 'remix';

const {Content, Sider} = Layout;

export default function () {
    // const [base, key] = useRoute("routes/iac");
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation()
    const key = location.pathname.slice("/iac".length).split("/")[1]

    return (
        <Layout style={{minHeight: "calc(100vh - 64px)"}}>
            <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
                <Menu theme="dark" selectedKeys={[key]}>
                    <Menu.Item icon={<BranchesOutlined/>} key="repository">
                        <Link to={`/iac/repository`}>Repository</Link>
                    </Menu.Item>
                    <Menu.Item icon={<CodeOutlined/>} key="task">
                        <Link to={`/iac/task`}>Task</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Content>
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    );
}
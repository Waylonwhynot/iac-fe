import { json, LoaderFunction, useLoaderData, useNavigate, Link } from 'remix';
import { templateApi } from '~/api';
import { server } from '~/api/middlewares';
import { Descriptions, PageHeader, Space, Button } from 'antd';
import { Section } from '~/components';
import { Template } from '~/generated';

export const loader: LoaderFunction = async ({ request, params }) => {
    const id = Number.parseInt(params['id'] || 'id');
    const template = await templateApi.withMiddleware(server(request)).getTemplate({ id });
    return json(template);
};


export default function() {
    const navigate = useNavigate();
    const template = useLoaderData<Template>();

    const extra = (
        <Space>
            <Button type="dashed">
                <Link to={`/iac/template/${template.id}/edit`}>Edit template</Link>
            </Button>
            <Button type="primary">
                <Link to={{
                    pathname: '/iac/template/create',
                    search: new URLSearchParams([['from', template.id.toString()], ["type", "template"]]).toString(),
                }}>CopyTemplate</Link>
            </Button>
            <Button type="primary" danger>
                <Link to={{
                    pathname: '/iac/schedule/create',
                    search: new URLSearchParams([['from', template.id.toString()], ["type", "template"]]).toString(),
                }}>Create Schedule Job</Link>
            </Button>
            <Button type="primary" danger>
                <Link to={{
                    pathname: '/iac/mission/create',
                    search: new URLSearchParams([['from', template.id.toString()], ["type", "template"]]).toString(),
                }}>CreateTask</Link>
            </Button>
        </Space>
    )
    return (
        <>
            <PageHeader className="bg-white" title="Template detail" extra={extra}
                        onBack={() => navigate("/iac/template")}
            ></PageHeader>
            <Section>
                <Descriptions column={3} bordered={true}>
                    <Descriptions.Item label="Name">{template?.name}</Descriptions.Item>
                    <Descriptions.Item label="Repo">{template?.release?.repository.displayName}</Descriptions.Item>
                    <Descriptions.Item label="Version">{template?.release?.versionName}</Descriptions.Item>
                    <Descriptions.Item label="Entrypoint">{template?.playbook}</Descriptions.Item>
                    <Descriptions.Item label="Forks">{template?.forks}</Descriptions.Item>
                    <Descriptions.Item label="Timeout">{template?.timeout}</Descriptions.Item>
                    <Descriptions.Item label="Hosts" span={3}>
                        <pre>
                            {template?.inventories}
                        </pre>
                    </Descriptions.Item>
                    <Descriptions.Item label="Envvars" span={3}>
                        <pre>
                            {template?.envvars}
                        </pre>
                    </Descriptions.Item>
                    <Descriptions.Item label="Extravars" span={3}>
                        <pre>
                            {template?.extravars}
                        </pre>
                    </Descriptions.Item>
                    <Descriptions.Item label="Description" span={3}>
                        {template?.description}
                    </Descriptions.Item>
                </Descriptions>
            </Section>
        </>
    );
}
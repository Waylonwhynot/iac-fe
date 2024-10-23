import { LoaderFunction, Link, json, useLoaderData, useNavigate, useSearchParams } from 'remix';
import { templateApi } from '~/api';
import { server } from '~/api/middlewares';
import { PaginatedTemplateList } from '~/generated';
import { useAsync, usePagination } from '~/hooks';
import { Button, PageHeader, Space, Table, Input } from 'antd';
import { Section } from '~/components';
import dayjs from 'dayjs';
import { useEffect } from 'react';


export const loader: LoaderFunction = async ({ request }) => {

    const query = new URL(request.url).searchParams;
    const page = Number.parseInt(query.get('page') || '1');
    const size = Number.parseInt(query.get('size') || '10');
    const kw = query.get('kw') || undefined;
    const resp = await templateApi.withMiddleware(server(request)).listTemplates({ page, size, kw });
    return json(resp);
};

export default function() {
    const templates = useLoaderData<PaginatedTemplateList>();
    const [pagination, setPagination] = usePagination(templates);
    const deleteTemplate = useAsync(templateApi.deleteTemplate.bind(templateApi));
    const navigate = useNavigate();
    const [query] = useSearchParams()

    useEffect(() => {
        if (templates) {
            setPagination(templates);
        }
    }, [templates]);

    const handleDelete = (id: number) => {
        deleteTemplate.run({ id });
    };

    useEffect(() => {
        if (deleteTemplate.state === 'COMPLETED') {
            navigate(0);
        }
    }, [deleteTemplate.state]);

    const handleSearch = (kw: string) => {
        navigate(`/iac/template/?kw=${kw}`);
    }

    const dateRender = (date: Date) => dayjs(date).format('YYYY-MM-DD HH:mm');
    const colums = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Repo', dataIndex: ["release","repository", "displayName"], key: 'repository' },
        { title: 'Version', dataIndex: ["release","versionName",], key: 'version' },
        { title: 'Created by', dataIndex: ['createdBy', 'username'], key: 'createdBy' },
        { title: 'Created time', dataIndex: 'createAt', key: 'createAt', render: dateRender },
        { title: 'Updated by', dataIndex: ['updated_by', 'username'], key: 'updatedBy' },
        { title: 'Updated time', dataIndex: 'updateAt', key: 'updateAt', render: dateRender },
        {
            title: '', dataIndex: 'id', key: 'id', render: (id: number) =>
                (
                    <Space>
                        <Link to={`/iac/template/${id}/edit`}>Edit</Link>
                        <Link to={`/iac/template/${id}`}>Detail</Link>
                        <Link to={{
                            pathname: '/iac/mission/create',
                            search: new URLSearchParams([['from', id.toString()], ['type', 'template']]).toString(),
                        }}>CreateTask</Link>
                        <Button type="link" onClick={() => handleDelete(id)}>Delete</Button>
                    </Space>
                ),
        },
    ];

    const extra = (
        <Space>
            <Input.Search
                allowClear
                placeholder="template name"
                size="large"
                onSearch={handleSearch}
                value={query.get('kw')||undefined}
            />
            <Button type="primary">
                <Link to="/iac/template/create">Create template</Link>
            </Button>
        </Space>
    );


    return (
        <>
            <PageHeader className="bg-white" title="Template List" extra={extra} />
            <Section>
                <Table columns={colums} dataSource={templates.results} pagination={pagination} rowKey="id" />
            </Section>
        </>
    );
}
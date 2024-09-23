import { json, Link, LoaderFunction, useLoaderData, useLocation, useNavigate } from 'remix';
import { repositoryApi } from '~/api';
import { server } from '~/api/middlewares';
import { PaginatedRepositoryList } from '~/generated';
import dayjs from 'dayjs';
import { Button, PageHeader, Space, Table } from 'antd';
import { Section } from '~/components';
import { useAsync, usePagination } from '~/hooks';
import { useEffect } from 'react';

export const loader: LoaderFunction = async ({ request }) => {
    const query = new URL(request.url).searchParams
    const page = Number.parseInt(query.get("page") || "1")
    const size = Number.parseInt(query.get("size") || "10")
    const resp = await repositoryApi.withMiddleware(server(request)).listRepositories({page, size});
    return json(resp);
};


export default function() {
    const repositories = useLoaderData<PaginatedRepositoryList>();
    const remove = useAsync(repositoryApi.deleteRepository.bind(repositoryApi));
    const navigate = useNavigate();
    const [pagination, setPagination] = usePagination(repositories)

    useEffect(() => {
        if (remove.state === 'COMPLETED') {
            navigate(0);
        }
    }, [remove.state]);

    useEffect(() => {
        setPagination(repositories);
    }, [repositories]);

    const handleRemove = (id: number) => {
        remove.run({ id });
    };

    const dateRender = (date: Date) => dayjs(date).format('YYYY-MM-DD HH:mm');
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Signature',
            dataIndex: 'signature',
            key: 'signature',
        },
        {
            title: 'created_by',
            dataIndex: ['createdBy', 'username'],
            key: 'createdBy',
        },
        {
            title: 'updated_by',
            dataIndex: ['updatedBy', 'username'],
            key: 'updatedBy',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: dateRender,
        },
        {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: dateRender,
        },
        {
            title: 'Action',
            key: 'op',
            dataIndex: 'id',
            render: (id: number) => (
                <Space>
                    <Link to={`/iac/repository/${id}/edit`}>Edit</Link>
                    <Button type="link" onClick={() => handleRemove(id)}>Delete</Button>
                    <Link to={`/iac/task/create?repository=${id}`}>Execute</Link>
                </Space>
            ),
        },
    ];
    const extra = (
        <Button type="primary">
            <Link to="/iac/repository/create">Create</Link>
        </Button>
    );
    return (
        <>
            <PageHeader className="bg-white" title="Repository List" extra={extra} />
            <Section>
                <Table columns={columns} dataSource={repositories.results} rowKey="id" pagination={pagination}/>
            </Section>
        </>
    );
}
import { json, LoaderFunction, useLoaderData, useNavigate, Link } from 'remix';
import { repositoryApi } from '~/api';
import { PaginatedReleaseList, Repository } from '~/generated';
import { useAsync, usePagination } from '~/hooks';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { PageHeader, Space, Table, Button } from 'antd';
import { Section } from '~/components';
import { server } from '~/api/middlewares';

export const loader: LoaderFunction = async ({ request, params }) => {
    const id = Number.parseInt(params.id || '0');
    const query = new URL(request.url).searchParams;
    const page = Number.parseInt(query.get('page') || '1');
    const size = Number.parseInt(query.get('size') || '10');
    const releases = await repositoryApi.withMiddleware(server(request)).listReleases({ id: id, page, size });
    const repository = await repositoryApi.withMiddleware(server(request)).getRepository({ id: id });
    return json({ releases, repository });
};


export default function() {
    const { releases, repository } = useLoaderData<{releases: PaginatedReleaseList, repository: Repository}>();
    const navigate = useNavigate();
    const [pagination, setPagination] = usePagination(releases);
    const remove = useAsync(repositoryApi.deleteRepository.bind(repositoryApi));
    const sync = useAsync(repositoryApi.syncReleases.bind(repositoryApi));

    useEffect(() => {
        setPagination(releases);
    }, [releases]);
    useEffect(() => {
        if (remove.state === 'COMPLETED') {
            navigate('/iac/repository');
        }
    }, [remove.state]);

    useEffect(() => {
        if (sync.state === 'COMPLETED') {
            navigate(0);
        }
    }, [sync.state]);

    const dateRender = (date: Date) => dayjs(date).format('YYYY-MM-DD HH:mm');
    const columns = [
        { title: 'version', dataIndex: 'versionName', key: 'versionName' },
        {
            title: 'createAt',
            dataIndex: 'createAt',
            key: 'createAt',
            render: dateRender,
        },
        { title: 'commit', dataIndex: 'commit', key: 'commit' },
        {
            title: 'Execute',
            dataIndex: 'id',
            key: 'op',
            render: (id: number) => (
                <Space>
                    <Link to={`/iac/mission/create?release=${id}`}>Execute</Link>
                </Space>
            ),
        },
    ];
    const extra = (
        <Space>
            <Button type="primary" danger onClick={() => remove.run({id: repository.id})}>Delete</Button>
            <Button type="primary" onClick={() => sync.run({id: repository.id})}>Sync</Button>
        </Space>
    )
    return (
        <>
            <PageHeader className="bg-white" title={repository.name} onBack={() => navigate(-1)} extra={extra}/>
            <Section>
                <Table columns={columns} dataSource={releases.results} pagination={pagination} rowKey="id" />
            </Section>
        </>
    );
}
import { json, LoaderFunction, useLoaderData, useNavigate, Link } from 'remix';
import { repositoryApi } from '~/api';
import { PaginatedReleaseList, Repository } from '~/generated';
import { useAsync, usePagination, useWebSocket } from '~/hooks';
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { PageHeader, Space, Table, Button } from 'antd';
import { Section } from '~/components';
import { server } from '~/api/middlewares';
import { websocketBasename } from '~/settings';

export const loader: LoaderFunction = async ({ request, params }) => {
    const id = Number.parseInt(params.id || '0');
    const query = new URL(request.url).searchParams;
    const page = Number.parseInt(query.get('page') || '1');
    const size = Number.parseInt(query.get('size') || '10');
    const releases = await repositoryApi.withMiddleware(server(request)).listReleases({ id: id, page, size });
    const repository = await repositoryApi.withMiddleware(server(request)).getRepository({ id: id });
    return json({ releases, repository, websocketBasename });
};


export default function() {
    const { releases: init, repository, websocketBasename } = useLoaderData<{ releases: PaginatedReleaseList, repository: Repository, websocketBasename:string }>();
    const navigate = useNavigate();
    const [pagination, setPagination] = usePagination(init);
    const listReleases = useAsync(repositoryApi.listReleases.bind(repositoryApi));
    const remove = useAsync(repositoryApi.deleteRepository.bind(repositoryApi));
    const sync = useAsync(repositoryApi.syncReleases.bind(repositoryApi));
    const socket = useRef<WebSocket>();
    const [releases, setReleases] = useState(init);
    const [webSocketUrl, setWebSocketUrl] = useState<string>();
    const { message } = useWebSocket(webSocketUrl);

    useEffect(() => {
        setWebSocketUrl(`${websocketBasename}/ws/iac/repository/${repository.id}/`);
    }, [repository]);

    useEffect(() => {
        listReleases.run({ id: repository.id });
    }, [message]);

    useEffect(() => {
        if (listReleases.state && listReleases.data) {
            setReleases(listReleases.data);
        }
    }, [listReleases.state]);

    useEffect(() => {
        setPagination(releases);
    }, [releases]);
    useEffect(() => {
        if (remove.state === 'COMPLETED') {
            navigate('/iac/repository');
        }
    }, [remove.state]);

    // useEffect(() => {
    //     if (sync.state === 'COMPLETED') {
    //         navigate(0);
    //     }
    // }, [sync.state]);

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
            <Button type="primary" danger onClick={() => remove.run({ id: repository.id })}>Delete</Button>
            <Button type="primary" onClick={() => sync.run({ id: repository.id })}
                    disabled={sync.state === 'RUNNING'}>Sync</Button>
        </Space>
    );
    return (
        <>
            <PageHeader className="bg-white" title={repository.name} onBack={() => navigate(-1)} extra={extra} />
            <Section>
                <Table columns={columns} dataSource={releases.results} pagination={pagination} rowKey="id" />
            </Section>
        </>
    );
}
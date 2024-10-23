import { LoaderFunction, Link, json, useLoaderData } from 'remix';
import { missionApi } from '~/api';
import { server } from '~/api/middlewares';
import { PaginatedMissionList } from '~/generated';
import { usePagination } from '~/hooks';
import { PageHeader, Table } from 'antd';
import { Section } from '~/components';
import dayjs from 'dayjs';
import { states } from './_states';
import { useEffect } from 'react';


export const loader: LoaderFunction = async ({ request }) => {
    const query = new URL(request.url).searchParams;
    const page = Number.parseInt(query.get('page') || '1');
    const size = Number.parseInt(query.get('size') || '10');
    const resp = await missionApi.withMiddleware(server(request)).listMissions({ page, size });
    return json(resp);
};

export default function() {
    const missions = useLoaderData<PaginatedMissionList>();
    const [pagination, setPagination] = usePagination(missions);

    useEffect(() => {
        if (missions) {
            setPagination(missions);
        }
    }, [missions]);
    const dateRender = (date: Date) => dayjs(date).format('YYYY-MM-DD HH:mm');
    const colums = [
        { title: 'Repo', dataIndex: ["release","repository", "displayName"], key: 'repository' },
        { title: 'Version', dataIndex: ["release","versionName",], key: 'version' },
        { title: 'Created_by', dataIndex: ['createdBy', 'username'], key: 'createdBy', },
        { title: 'Execute time', dataIndex: 'createAt', key: 'createAt', render: dateRender },
        { title: 'Finish time', dataIndex: 'updateAt', key: 'updateAt', render: dateRender },
        { title: 'State', dataIndex: 'state', key: 'state', render: (state: number) => states[state] },
        { title: '', dataIndex: 'id', key: 'id', render: (id: number) => <Link to={`/iac/mission/${id}`}>Detail</Link> },
    ];

    return (
        <>
            <PageHeader className="bg-white" title="Mission List" />
            <Section>
                <Table columns={colums} dataSource={missions.results} pagination={pagination} />
            </Section>
        </>
    );
}
import { LoaderFunction, Link, json, useLoaderData, useNavigate, useSearchParams } from 'remix';
import { scheduleApi } from '~/api';
import { server } from '~/api/middlewares';
import { PaginatedPeriodicMissionList, PeriodicMission } from '~/generated';
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
    const resp = await scheduleApi.withMiddleware(server(request)).listPeriodicMissions({ page, size, kw });
    return json(resp);
};

export default function() {
    const missions = useLoaderData<PaginatedPeriodicMissionList>();
    const [pagination, setPagination] = usePagination(missions);
    const deletePeriodicMission = useAsync(scheduleApi.deletePeriodicMission.bind(scheduleApi));
    const navigate = useNavigate();
    const [query] = useSearchParams()

    useEffect(() => {
        if (missions) {
            setPagination(missions);
        }
    }, [missions]);

    const handleDelete = (id: number) => {
        deletePeriodicMission.run({ id });
    };

    useEffect(() => {
        if (deletePeriodicMission.state === 'COMPLETED') {
            navigate(0);
        }
    }, [deletePeriodicMission.state]);

    const handleSearch = (kw: string) => {
        navigate(`/iac/schedule?kw=${kw}`);
    }

    const dateRender = (date: Date) => dayjs(date).format('YYYY-MM-DD HH:mm');

    const scheduleRender = (text: unknown, r: PeriodicMission) => {
        if (r.interval) {
            return `Every ${r.interval.every} ${r.interval.period}`;
        }
        if (r.crontab) {
            return `${r.crontab.minute} ${r.crontab.hour} ${r.crontab.dayOfMonth} ${r.crontab.monthOfYear} ${r.crontab.dayOfWeek}`;
        }
        return ""
    }
    const colums = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Repo', dataIndex: ["release","repository", "displayName"], key: 'repository' },
        { title: 'Version', dataIndex: ["release","versionName",], key: 'version' },
        { title: 'Schedule', dataIndex: 'id', key: 'schedule', render: scheduleRender },
        { title: 'Created by', dataIndex: ['createdBy', 'username'], key: 'createdBy' },
        { title: 'Created time', dataIndex: 'createAt', key: 'createAt', render: dateRender },
        { title: 'Updated by', dataIndex: ['updatedBy', 'username'], key: 'updatedBy' },
        { title: 'Updated time', dataIndex: 'updateAt', key: 'updateAt', render: dateRender },
        {
            title: '', dataIndex: 'id', key: 'id', render: (id: number) =>
                (
                    <Space>
                        <Link to={`/iac/schedule/${id}/edit`}>Edit</Link>
                        <Link to={`/iac/schedule/${id}`}>Detail</Link>
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
                <Link to="/iac/schedule/create">Create Schedule Job</Link>
            </Button>
        </Space>
    );


    return (
        <>
            <PageHeader className="bg-white" title="Template List" extra={extra} />
            <Section>
                <Table columns={colums} dataSource={missions.results} pagination={pagination} rowKey="id" />
            </Section>
        </>
    );
}
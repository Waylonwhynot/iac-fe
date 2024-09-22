import { LoaderFunction, Link, json, useLoaderData } from 'remix';
import { taskApi } from '~/api';
import { server } from '~/api/middlewares';
import { PaginatedTaskList } from '~/generated';
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
    const resp = await taskApi.withMiddleware(server(request)).listTasks({ page, size });
    return json(resp);
};

export default function() {
    const tasks = useLoaderData<PaginatedTaskList>();
    const [pagination, setPagination] = usePagination(tasks);

    useEffect(() => {
        if (tasks) {
            setPagination(tasks);
        }
    }, [tasks]);
    const dateRender = (date: Date) => dayjs(date).format('YYYY-MM-DD HH:mm');
    const colums = [
        { title: 'Repo', dataIndex: ["repository", "name"], key: 'repository' },
        { title: 'Create time', dataIndex: 'createAt', key: 'createAt', render: dateRender },
        { title: 'Update time', dataIndex: 'updateAt', key: 'updateAt', render: dateRender },
        { title: 'State', dataIndex: 'state', key: 'state', render: (state: number) => states[state] },
        { title: '', dataIndex: 'id', key: 'id', render: (id: number) => <Link to={`/iac/task/${id}`}>Detail</Link> },
    ];

    return (
        <>
            <PageHeader className="bg-white" title="Task List" />
            <Section>
                <Table columns={colums} dataSource={tasks.results} pagination={pagination} />
            </Section>
        </>
    );
}
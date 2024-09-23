import { json, LoaderFunction, useLoaderData, useNavigate, Link } from 'remix';
import { repositoryApi, taskApi } from '~/api';
import { server } from '~/api/middlewares';
import { Button, Descriptions, PageHeader, Space } from 'antd';
import dayjs from 'dayjs';
import { Section } from '~/components';
import { Repository, Task } from '~/generated';
import Term from 'ansi_up';
import { states } from './_states';
import { useInterval } from 'ahooks';
import { useAsync } from '~/hooks';
import { useEffect, useState } from 'react';

export const loader: LoaderFunction = async ({ request, params }) => {
    const id = Number.parseInt(params['id'] || 'id');
    const task = await taskApi.withMiddleware(server(request)).getTask({ id });
    const repository = await repositoryApi.withMiddleware(server(request)).getRepository({ id: task.repository.id });
    return json({ task, repository });
};

const term = new Term();


export default function() {
    const navigate = useNavigate();
    const { task: init, repository } = useLoaderData<{ task: Task, repository: Repository }>();
    const [task, setTask] = useState<Task>(init);
    const getTask = useAsync(taskApi.getTask.bind(taskApi));
    const [interval, setInterval] = useState<number | undefined>(2 * 1000);
    const copyTask = useAsync(taskApi.copyTask.bind(taskApi));

    useInterval(() => {
        if (getTask.state !== 'RUNNING') {
            getTask.run({ id: task.id });
        }
    }, interval);

    useEffect(() => {
        if (getTask.state === 'COMPLETED' && getTask.state) {
            setTask(getTask.data);
        }
    }, [getTask.state]);

    useEffect(() => {

        if ((task?.state || 0) > 1) {
            setInterval(undefined);
        }
    }, [task.state]);

    useEffect(() => {
        if (copyTask.state === 'COMPLETED') {
            navigate(`/iac/task/${copyTask.data?.id}`);
        }
    }, [copyTask.state]);

    useEffect(() => {
        setTask(init);
        if ((init?.state || 0) <= 1) {
            setInterval(1 * 1000);
        }
    }, [init]);

    const handleCopyTask = () => {
        copyTask.run({ id: task.id });
    };

    const extra = (
        <Space>
            <Button type="primary" disabled={(task?.state || 0) <= 1} onClick={handleCopyTask}>Execute again</Button>
            <Button type="primary">
                <Link to={{
                    pathname: '/iac/task/create',
                    search: new URLSearchParams([['from', task.id.toString()]]).toString(),
                }}>
                    Copy task
                </Link>
            </Button>
        </Space>
    );

    return (
        <>
            <PageHeader className="bg-white" title="Task detail" subTitle={states[task?.state || 0]}
                        onBack={() => navigate('/idc/task')}
                        extra={extra}
            ></PageHeader>
            <Section title="Executed detail">
                <Descriptions column={3} bordered>
                    <Descriptions.Item label="Executed by">{repository.createdBy?.username}</Descriptions.Item>
                    <Descriptions.Item
                        label="Execute time">{dayjs(repository.createdAt).format('YYYY-MM-DD HH:mm')}</Descriptions.Item>
                    <Descriptions.Item
                        label="Finish time">{dayjs(repository.updatedAt).format('YYYY-MM-DD HH:mm')}</Descriptions.Item>
                </Descriptions>
            </Section>
            <Section title="Repo detail">
                <Descriptions column={2} bordered>
                    <Descriptions.Item label="name">{repository.name}</Descriptions.Item>
                    <Descriptions.Item label="sign">{repository.signature}</Descriptions.Item>
                </Descriptions>
            </Section>
            <Section title="Task params">
                <Descriptions column={3} bordered={true}>
                    <Descriptions.Item label="Entrypoint">{task?.playbook}</Descriptions.Item>
                    <Descriptions.Item label="Forks">{task?.forks}</Descriptions.Item>
                    <Descriptions.Item label="Timeout">{task?.timeout}</Descriptions.Item>
                    <Descriptions.Item label="Tags" span={3}>{task?.tags}</Descriptions.Item>
                    <Descriptions.Item label="Hosts" span={3}>
                        <pre>
                            {task?.inventories}
                        </pre>
                    </Descriptions.Item>
                    <Descriptions.Item label="Envvars" span={3}>
                        <pre>
                            {task?.envvars}
                        </pre>
                    </Descriptions.Item>
                    <Descriptions.Item label="Extravars" span={3}>
                        <pre>
                            {task?.extravars}
                        </pre>
                    </Descriptions.Item>
                </Descriptions>
            </Section>
            <Section title="Output">
                <pre dangerouslySetInnerHTML={{ __html: term.ansi_to_html(task.output) }}></pre>
                {/*<pre>{term.ansi_to_html(task.output)}</pre>*/}
            </Section>
        </>
    );
}
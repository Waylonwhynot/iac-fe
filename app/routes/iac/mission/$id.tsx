import { json, LoaderFunction, useLoaderData, useNavigate, Link } from 'remix';
import { repositoryApi, missionApi } from '~/api';
import { server } from '~/api/middlewares';
import { Button, Descriptions, PageHeader, Space, Table, Tag } from 'antd';
import dayjs from 'dayjs';
import { ClientOnly, ReleaseSection, Section } from '~/components';
import { ReleaseSummary, Mission, MissionDetail, MissionDetailFromJSON } from '~/generated';
import Term from 'ansi_up';
import { states } from './_states';
import { useInterval } from 'ahooks';
import { useAsync, useWebSocket } from '~/hooks';
import { useEffect, useRef, useState } from 'react';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    DisconnectOutlined,
    ExclamationCircleOutlined, LogoutOutlined, MinusCircleOutlined, EnterOutlined, MinusSquareOutlined,
} from '@ant-design/icons';
import { websocketBasename } from '~/settings';

export const loader: LoaderFunction = async ({ request, params }) => {
    const id = Number.parseInt(params['id'] || 'id');
    const mission = await missionApi.withMiddleware(server(request)).getMission({ id });
    const release = await repositoryApi.withMiddleware(server(request)).getRelease({ id: mission.release.id });
    return json({ mission, release, websocketBasename });
};

const term = new Term();


export default function() {
    const navigate = useNavigate();
    const { mission: init, release, websocketBasename } = useLoaderData<{ mission: MissionDetail, release: ReleaseSummary; websocketBasename:string }>();
    const [mission, setMission] = useState<MissionDetail>(init);
    // const getMission = useAsync(missionApi.getMission.bind(missionApi));
    // const [interval, setInterval] = useState<number | undefined>(2 * 1000);
    const copyMission = useAsync(missionApi.copyMission.bind(missionApi));
    const [webSocketUrl, setWebSocketUrl] = useState<string>();
    const {
        message,
        disconnect,
    } = useWebSocket<MissionDetail>(webSocketUrl, { transform: event => MissionDetailFromJSON(JSON.parse(event.data)) });
    // const socket = useRef<WebSocket>();
    //
    // useInterval(() => {
    //     if (getMission.state !== 'RUNNING') {
    //         getMission.run({ id: mission.id });
    //     }
    // }, interval);

    // useEffect(() => {
    //     if (getMission.state === 'COMPLETED' && getMission.state) {
    //         // @ts-ignore
    //         setMission(getMission.data);
    //     }
    // }, [getMission.state]);

    useEffect(() => {

        if ((mission?.state || 0) > 1) {
            disconnect();
        }
    }, [mission.state]);

    useEffect(() => {
        if (copyMission.state === 'COMPLETED') {
            navigate(`/iac/mission/${copyMission.data?.id}`);
        }
    }, [copyMission.state]);

    useEffect(() => {
        setMission(init);
        if ((init?.state || 0) <= 1) {
            // setInterval(1000);
            setWebSocketUrl(`${websocketBasename}/ws/iac/mission/${init.id}/`);

        }
    }, [init]);

    useEffect(() => {
        if (message) {
            setMission(message);
        }
    }, [message]);

    const handleCopyMission = () => {
        copyMission.run({ id: mission.id });
    };

    const extra = (
        <Space>
            <Button type="primary" disabled={(mission?.state || 0) <= 1} onClick={handleCopyMission}>Execute
                again</Button>
            <Button type="primary">
                <Link to={{
                    pathname: '/iac/mission/create',
                    search: new URLSearchParams([['from', mission.id.toString()], ['type', 'mission']]).toString(),
                }}>
                    Copy mission
                </Link>
            </Button>
            <Button type="primary">
                <Link to={{
                    pathname: '/iac/template/create',
                    search: new URLSearchParams([['from', mission.id.toString()], ['type', 'mission']]).toString(),
                }}>
                    Create as a template
                </Link>
            </Button>
            <Button type="primary">
                <Link to={{
                    pathname: '/iac/schedule/create',
                    search: new URLSearchParams([['from', mission.id.toString()], ['type', 'mission']]).toString(),
                }}>
                    Create as a schedule job
                </Link>
            </Button>
        </Space>
    );

    return (
        <>
            <PageHeader className="bg-white" title="Mission detail" subTitle={states[mission?.state || 0]}
                        onBack={() => navigate('/iac/mission')}
                        extra={extra}
            />
            <Section title="Executed detail">
                <Descriptions column={3} bordered>
                    <Descriptions.Item label="Executed by">{mission.createdBy?.username}</Descriptions.Item>
                    <Descriptions.Item
                        label="Execute time">{dayjs(mission.createdAt).format('YYYY-MM-DD HH:mm')}</Descriptions.Item>
                    <Descriptions.Item
                        label="Finish time">{dayjs(mission.updatedAt).format('YYYY-MM-DD HH:mm')}</Descriptions.Item>
                </Descriptions>
            </Section>
            <ReleaseSection release={release} />
            <Section title="Mission params">
                <Descriptions column={3} bordered={true}>
                    <Descriptions.Item label="Entrypoint">{mission?.playbook}</Descriptions.Item>
                    <Descriptions.Item label="Forks">{mission?.forks}</Descriptions.Item>
                    <Descriptions.Item label="Timeout">{mission?.timeout}</Descriptions.Item>
                    <Descriptions.Item label="Tags" span={3}>{mission?.tags}</Descriptions.Item>
                    <Descriptions.Item label="Hosts" span={3}>
                        <pre>
                            {mission?.inventories}
                        </pre>
                    </Descriptions.Item>
                    <Descriptions.Item label="Envvars" span={3}>
                        <pre>
                            {mission?.envvars}
                        </pre>
                    </Descriptions.Item>
                    <Descriptions.Item label="Extravars" span={3}>
                        <pre>
                            {mission?.extravars}
                        </pre>
                    </Descriptions.Item>
                </Descriptions>
            </Section>
            <Section title="Result stats">
                <Table dataSource={mission.statsSet} rowKey="id" pagination={false}>
                    <Table.Column title="Host" dataIndex="host" key="host" />
                    <Table.Column title={<Tag color="success" icon={<CheckCircleOutlined />}>ok</Tag>}
                                  key="ok"
                                  dataIndex="ok" />
                    <Table.Column title={<Tag color="orange" icon={<ExclamationCircleOutlined />}>changed</Tag>}
                                  key="changed"
                                  dataIndex="changed" />
                    <Table.Column title={<Tag color="error" icon={<ExclamationCircleOutlined />}>unreachable</Tag>}
                                  key="unreachable"
                                  dataIndex="unreachable" />
                    <Table.Column title={<Tag color="error" icon={<DisconnectOutlined />}>unreachable</Tag>}
                                  key="dark"
                                  dataIndex="dark" />
                    <Table.Column title={<Tag color="error" icon={<CloseCircleOutlined />}>failures</Tag>}
                                  key="failures"
                                  dataIndex="failures" />
                    <Table.Column title={<Tag color="default" icon={<LogoutOutlined />}>skipped</Tag>}
                                  key="skipped"
                                  dataIndex="skipped" />
                    <Table.Column title={<Tag color="default" icon={<EnterOutlined />}>rescued</Tag>}
                                  key="rescued"
                                  dataIndex="rescued" />
                    <Table.Column title={<Tag color="default" icon={<MinusCircleOutlined />}>ignored</Tag>}
                                  key="ignored"
                                  dataIndex="ignored" />
                </Table>

            </Section>
            <Section title="Output">
                <ClientOnly>
                    <pre dangerouslySetInnerHTML={{ __html: term.ansi_to_html(mission.output || '') }}></pre>
                </ClientOnly>
            </Section>
        </>
    );
}
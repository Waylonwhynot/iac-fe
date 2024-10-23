import { json, LoaderFunction, useLoaderData, useNavigate, Link } from 'remix';
import { scheduleApi } from '~/api';
import { server } from '~/api/middlewares';
import { Descriptions, PageHeader, Space, Button } from 'antd';
import { Section } from '~/components';
import { PeriodicMission } from '~/generated'

export const loader: LoaderFunction = async ({ request, params }) => {
    const id = Number.parseInt(params['id'] || 'id');
    const mission = await scheduleApi.withMiddleware(server(request)).getPeriodicMission({ id });
    return json(mission);
};


export default function() {
    const navigate = useNavigate();
    const mission = useLoaderData<PeriodicMission>();

    const extra = (
        <Space>
            <Button type="dashed">
                <Link to={`/iac/schedule/${mission.id}/edit`}>Edit schedule job</Link>
            </Button>
            <Button type="primary" danger>
                <Link to={{
                    pathname: '/iac/schedule/create',
                    search: new URLSearchParams([['from', mission.id.toString()], ["type", "schedule"]]).toString(),
                }}>Copy Schedule Job</Link>
            </Button>
        </Space>
    )

    const scheduleRender = (r: PeriodicMission) => {
        if (r.interval) {
            return `Every ${r.interval.every} ${r.interval.period}`;
        }
        if (r.crontab) {
            return `${r.crontab.minute} ${r.crontab.hour} ${r.crontab.dayOfMonth} ${r.crontab.monthOfYear} ${r.crontab.dayOfWeek} ${r.crontab.timezone}`;
        }
        return ""
    }

    return (
        <>
            <PageHeader className="bg-white"
                        title="Schedule Job Detail"
                        subTitle={mission.enabled ? "Enabled" : "Disabled"}
                        extra={extra}
                        onBack={() => navigate("/iac/schedule")}
            ></PageHeader>
            <Section>
                <Descriptions column={3} bordered={true}>
                    <Descriptions.Item label="Name">{mission?.name}</Descriptions.Item>
                    <Descriptions.Item label="Repo">{mission?.release?.repository.displayName}</Descriptions.Item>
                    <Descriptions.Item label="Version">{mission?.release?.versionName}</Descriptions.Item>
                    <Descriptions.Item label="Entrypoint">{mission?.playbook}</Descriptions.Item>
                    <Descriptions.Item label="Forks">{mission?.forks}</Descriptions.Item>
                    <Descriptions.Item label="Timeout">{mission?.timeout}</Descriptions.Item>
                    <Descriptions.Item label="Schedule" span={3}>{scheduleRender(mission)}</Descriptions.Item>
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
        </>
    );
}
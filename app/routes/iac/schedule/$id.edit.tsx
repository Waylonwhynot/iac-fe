import {
    Descriptions,
    PageHeader,
    Form,
    Input,
    InputNumber,
    Button,
    Select,
    Radio,
    RadioChangeEvent,
    Space, Switch,
} from 'antd';
import { json, LoaderFunction, useLoaderData, useNavigate } from 'remix';
import { Section } from '~/components';
import { repositoryApi, missionApi, scheduleApi, templateApi } from '~/api';
import { server } from '~/api/middlewares';
import {
    Mission,
    PeriodicMission,
    PeriodicMissionCreation,
    PeriodicMissionMutation,
    Template,
    TemplateCreation,
} from '~/generated';
import { useAsync } from '~/hooks';
import { useEffect, useState } from 'react';

export const loader: LoaderFunction = async ({ request, params }) => {
    const id = Number.parseInt(params['id'] || 'id');
    const mission = await scheduleApi.withMiddleware(server(request)).getPeriodicMission({ id });
    return json(mission);
};


const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
};
const tailLayout = {
    wrapperCol: { offset: 2, span: 20 },
};

const getScheduleType = (value: PeriodicMission) => {
    if (value && ("crontab" in value || "interval" in value)) {
        return (value as PeriodicMission).crontab ? 'crontab' : 'interval';
    }
    return 'interval';
}
export default function() {
    const navigate = useNavigate();
    const from = useLoaderData<PeriodicMission>();
    const updatePeriodicMission = useAsync(scheduleApi.updatePeriodicMission.bind(scheduleApi));
    const searchRepositories = useAsync(repositoryApi.listRepositories.bind(repositoryApi));
    const [repositories, setRepositories] = useState<{ label: string, value: number }[]>();
    const [releases, setReleases] = useState<{ label: string, value: number }[]>();
    const [repository, setRepository] = useState<number>();
    const searchReleases = useAsync(repositoryApi.listReleases.bind(repositoryApi));
    const [scheduleType, setScheduleType] = useState<string>(getScheduleType(from));


    useEffect(() => {
        if (updatePeriodicMission.state === 'COMPLETED') {
            navigate(`/iac/schedule/${updatePeriodicMission.data?.id}`);
        }
    }, [updatePeriodicMission.state]);

    useEffect(() => {
        if (searchRepositories.state === 'COMPLETED') {
            const opts = searchRepositories.data?.results?.map(repo => ({ label: repo.displayName, value: repo.id }));
            setRepositories(opts);
        }
    }, [searchRepositories.state]);

    useEffect(() => {
        if (from && from.release) {
            setRepositories([{ label: from.release.repository.displayName, value: from.release.repository.id }]);
            setReleases([{ label: from.release.versionName, value: from.release.id }]);
            setRepository(from.release.repository.id);
        }
    }, [from]);

    useEffect(() => {
        if (searchReleases.state === 'COMPLETED') {
            const opts = searchReleases.data?.results?.map(release => ({
                label: release.versionName,
                value: release.id,
            }));
            setReleases(opts);
        }
    }, [searchReleases.state]);

    const handleSubmit = (values: PeriodicMissionMutation) => {
        // console.log(values);
        if (values.crontab && !values.crontab.timezone) {
            values.crontab.timezone = 'UTC';
        }
        updatePeriodicMission.run({ periodicMissionMutation: values, id: from.id });
    };

    const handleSearchRepositories = (kw: string) => {
        searchRepositories.run({ kw });
    };
    const handleSearchReleases = (kw: string) => {
        if (kw && repository) {
            searchReleases.run({ id: repository, kw });
        }
    };
    const handleChangeScheduleType = (e: RadioChangeEvent) => {
        setScheduleType(e.target.value);
    };
    const scheduleTypeOptions = [
        { label: 'Interval', value: 'interval' },
        { label: 'Crontab', value: 'crontab' },
    ];
    //
    const periodUnits = [
        { label: 'Days', value: 'days' },
        { label: 'Hours', value: 'hours' },
        { label: 'Minutes', value: 'minutes' },
        { label: 'Seconds', value: 'seconds' },
        { label: 'Microseconds', value: 'microseconds' },
    ];
    let scheduleFormItem = (
        <Form.Item label="Interval" required>
            <Space>
                <Form.Item name={['interval', 'every']} noStyle>
                    <InputNumber min={1} />
                </Form.Item>
                <Form.Item name={['interval', 'period']} noStyle>
                    <Select style={{ minWidth: 100 }} options={periodUnits} />
                </Form.Item>
            </Space>
        </Form.Item>
    );
    if (scheduleType === 'crontab') {
        scheduleFormItem = (
            <Form.Item label="Crontab" required>
                <Space>
                    <Form.Item name={['crontab', 'minute']} noStyle>
                        <Input placeholder="*" />
                    </Form.Item>
                    <Form.Item name={['crontab', 'hour']} noStyle>
                        <Input placeholder="*" />
                    </Form.Item>
                    <Form.Item name={['crontab', 'dayOfMonth']} noStyle>
                        <Input placeholder="*" />
                    </Form.Item>
                    <Form.Item name={['crontab', 'monthOfYear']} noStyle>
                        <Input placeholder="*" />
                    </Form.Item>
                    <Form.Item name={['crontab', 'dayOfWeek']} noStyle>
                        <Input placeholder="*" />
                    </Form.Item>
                    <Form.Item name={['crontab', 'timezone']} noStyle>
                        <Input placeholder="UTC" />
                    </Form.Item>
                </Space>
            </Form.Item>
        );
    }

    return (
        <>
            <PageHeader className="bg-white" title="Create Schedule Job" onBack={() => navigate(-1)} />
            <Section>
                <Form {...layout} onFinish={handleSubmit} initialValues={{ ...from, release: from?.release?.id }}>
                    <Form.Item label="Name" name="name" required>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Schedule Type">
                        <Radio.Group options={scheduleTypeOptions}
                                     buttonStyle="solid"
                                     optionType="button"
                                     value={scheduleType}
                                     onChange={handleChangeScheduleType}
                        />
                    </Form.Item>
                    {scheduleFormItem}
                    <Form.Item label="Enabled" name="enabled" valuePropName="checked" required>
                        <Switch />
                    </Form.Item>
                    <Form.Item label="Repositroy" required>
                        <Select
                            showSearch
                            loading={searchRepositories.state === 'RUNNING'}
                            options={repositories}
                            value={repository}
                            onSearch={handleSearchRepositories}
                            onChange={(value: number) => setRepository(value)}
                            showArrow={false}
                            filterOption={false}
                            notFoundContent={null}
                        />
                    </Form.Item>
                    <Form.Item label="Release" name="release" required>
                        <Select
                            showSearch
                            disabled={!repository}
                            loading={searchReleases.state === 'RUNNING'}
                            options={releases}
                            value={repository}
                            onSearch={handleSearchReleases}
                            onChange={(value: number) => setRepository(value)}
                            showArrow={false}
                            filterOption={false}
                            notFoundContent={null}
                        />
                    </Form.Item>
                    <Form.Item label="Entrypoint" name="playbook" required>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Forks" name="forks" required>
                        <InputNumber step={1} style={{ width: '100%' }} min={1} />
                    </Form.Item>
                    <Form.Item label="Timeout(s)" name="timeout" required>
                        <InputNumber step={60} style={{ width: '100%' }} min={180} />
                    </Form.Item>
                    <Form.Item label="Tags" name="tags">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Extra variables" name="extravars">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item label="Hosts" name="inventories">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item label="Env variables" name="envvars">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </Section>
        </>
    );
}
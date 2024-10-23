import { Descriptions, PageHeader, Form, Input, InputNumber, Button } from 'antd';
import { json, LoaderFunction, useLoaderData, useNavigate } from 'remix';
import { Section, ReleaseSection } from '~/components';
import { repositoryApi, missionApi, templateApi } from '~/api';
import { server } from '~/api/middlewares';
import { CreateMissionRequest, Repository, Mission, Template, ReleaseSummary } from '~/generated';
import dayjs from 'dayjs';
import { useAsync } from '~/hooks';
import { useEffect } from 'react';

interface LoaderResult {
    from?: Mission | Template;
    release: ReleaseSummary;
}

export const loader: LoaderFunction = async ({ request }) => {
    const query = new URL(request.url).searchParams;
    if (query.has('from')) {
        const fromId = Number.parseInt(query.get('from') || '0');
        if (query.get("type") === 'mission') {
            const from = await missionApi.withMiddleware(server(request)).getMission({ id: fromId });
            const release = await repositoryApi.withMiddleware(server(request)).getRelease({ id: from.release.id });
            return json({ from, release });
        }
        if (query.get("type") === 'template') {
            const from = await templateApi.withMiddleware(server(request)).getTemplate({ id: fromId });
            const release = await repositoryApi.withMiddleware(server(request)).getRelease({ id: from.release.id });
            return json({ from, release });
        }

    }
    const releaseId = Number.parseInt(new URL(request.url).searchParams.get('release') || '0');
    const release = await repositoryApi.withMiddleware(server(request)).getRelease({ id: releaseId });
    return json({ release });
};

const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
};
const tailLayout = {
    wrapperCol: { offset: 2, span: 20 },
};

export default function() {
    const navigate = useNavigate();
    const {from, release} = useLoaderData<LoaderResult>();
    const createMission = useAsync(missionApi.createMission.bind(missionApi));

    useEffect(() => {
        if (createMission.state === 'COMPLETED') {
            navigate(`/iac/mission/${createMission.data?.id}`);
        }
    }, [createMission.state]);

    const handleSubmit = (values: CreateMissionRequest) => {
        createMission.run({ missionCreation: { ...values, release: release.id } });
    };


    return (
        <>
            <PageHeader className="bg-white" title="Create Mission" onBack={() => navigate('/iac/mission')} />
            <ReleaseSection release={release} />
            <Section>
                <Form {...layout} onFinish={handleSubmit}>
                    <Form.Item label="Entrypoint" name="playbook" initialValue={from?.playbook || "site.yml"} required>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Forks" name="forks" initialValue={from?.forks || 1} required>
                        <InputNumber step={1} style={{ width: '100%' }} min={1} />
                    </Form.Item>
                    <Form.Item label="Timeout(s)" name="timeout" initialValue={from?.timeout ||3600} required>
                        <InputNumber step={60} style={{ width: '100%' }} min={180} />
                    </Form.Item>
                    <Form.Item label="Tags" name="tags" initialValue={from?.tags}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Extra variables" name="extravars" initialValue={from?.extravars}>
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item label="Hosts" name="inventories" initialValue={from?.inventories}>
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item label="Env variables" name="envvars" initialValue={from?.envvars}>
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Execute
                        </Button>
                    </Form.Item>
                </Form>
            </Section>
        </>
    );
}
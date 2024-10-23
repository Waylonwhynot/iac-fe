import { Descriptions, PageHeader, Form, Input, InputNumber, Button, Select } from 'antd';
import { json, LoaderFunction, useLoaderData, useNavigate } from 'remix';
import { Section } from '~/components';
import { repositoryApi, missionApi, templateApi } from '~/api';
import { server } from '~/api/middlewares';
import {  Mission, Template, TemplateCreation } from '~/generated';
// import dayjs from 'dayjs';
import { useAsync } from '~/hooks';
import { useEffect, useState } from 'react';

export const loader: LoaderFunction = async ({ request }) => {
    const query = new URL(request.url).searchParams;
    console.log('query: ', query);
    if (query.has('from')) {
        const fromId = Number.parseInt(query.get('from') || '0');
        console.log(fromId);
        if (query.get("type") === 'mission') {
            const from = await missionApi.withMiddleware(server(request)).getMission({ id: fromId });
            return json(from);
        }
        if (query.get("type") === 'template') {
            const from = await templateApi.withMiddleware(server(request)).getTemplate({ id: fromId });
            return json(from);
        }
    }
    return json({});
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
    const from = useLoaderData<Mission | Template | undefined>();
    const createTemplate = useAsync(templateApi.createTemplate.bind(templateApi));
    const searchRepositories = useAsync(repositoryApi.listRepositories.bind(repositoryApi));
    const [repositories, setRepositories] = useState<{ label: string, value: number }[]>();
    const [releases, setReleases] = useState<{ label: string, value: number }[]>();
    const [repository, setRepository] = useState<number>();
    const searchReleases = useAsync(repositoryApi.listReleases.bind(repositoryApi));


    useEffect(() => {
        if (createTemplate.state === 'COMPLETED') {
            navigate(`/iac/template/${createTemplate.data?.id}`);
        }
    }, [createTemplate.state]);

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
            const opts = searchReleases.data?.results?.map(release => ({ label: release.versionName, value: release.id }));
            setReleases(opts);
        }
    }, [searchReleases.state]);

    const handleSubmit = (values: TemplateCreation) => {
        // console.log(values);
        createTemplate.run({ templateCreation: values });
    };

    const handleSearchRepositories = (kw: string) => {
        searchRepositories.run({ kw });
    };
    const handleSearchReleases = (kw: string) => {
        if (kw && repository) {
            searchReleases.run({ id: repository, kw });
        }
    };

    return (
        <>
            <PageHeader className="bg-white" title="Create Template" onBack={() => navigate(-1)} />
            <Section>
                <Form {...layout} onFinish={handleSubmit} initialValues={{ ...from, release: from?.release?.id }}>
                    <Form.Item label="Name" name="name" required>
                        <Input />
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
                    <Form.Item label="Entrypoint" name="playbook" initialValue={'site.yml'} required>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Forks" name="forks" initialValue={1} required>
                        <InputNumber step={1} style={{ width: '100%' }} min={1} />
                    </Form.Item>
                    <Form.Item label="Timeout(s)" name="timeout" initialValue={3600} required>
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
                    <Form.Item label="Description" name="description">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </Section>
        </>
    );
}
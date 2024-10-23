import { Button, Form, Input, PageHeader } from 'antd';
import { json, LoaderFunction, useLoaderData, useNavigate } from 'remix';
import { Section } from '~/components';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAsync } from '~/hooks';
import { repositoryApi } from '~/api';
import { Repository, RepositoryMutation, UpdateRepositoryRequest } from '~/generated';
import { server } from '~/api/middlewares';


const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
};
const tailLayout = {
    wrapperCol: { offset: 2, span: 20 },
};
export const loader: LoaderFunction = async ({ request, params }) => {
    const id = Number.parseInt(params["id"] || "0")
    const resp = await repositoryApi.withMiddleware(server(request)).getRepository({id})
    return json(resp)
}

export default function() {
    const repository = useLoaderData<Repository>();
    const navigate = useNavigate();
    const update = useAsync(repositoryApi.updateRepository.bind(repositoryApi));

    useEffect(() => {
        if (update.state === 'COMPLETED') {
            goHome();
        }
    }, [update.state]);

    const goHome = () => {
        navigate('/iac/repository');
    };

    const handleSubmit = (values: RepositoryMutation) => {
        update.run({ id: repository.id, repositoryMutation: values });
    };

    return (
        <>
            <PageHeader className="bg-white" title="Update Repository" onBack={goHome} />
            <Section>
                <Form {...layout} method="post" onFinish={handleSubmit} initialValues={repository}>
                    <Form.Item label="URL" name="url">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Token" name="token">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Provider" name="providerClass">
                        <Input />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">Update</Button>
                    </Form.Item>
                </Form>
            </Section>
        </>
    );
}
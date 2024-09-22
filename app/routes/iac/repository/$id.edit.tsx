import { Button, Form, Input, PageHeader } from 'antd';
import { json, LoaderFunction, useLoaderData, useNavigate } from 'remix';
import { Section } from '~/components';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAsync } from '~/hooks';
import { repositoryApi } from '~/api';
import { Repository, UpdateRepositoryRequest } from '~/generated';
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
    const [form] = Form.useForm<UpdateRepositoryRequest>();
    const [store, setStore] = useState<File>();
    const update = useAsync(repositoryApi.updateRepository.bind(repositoryApi));

    useEffect(() => {
        if (update.state === 'COMPLETED') {
            goHome();
        }
    }, [update.state]);

    const goHome = () => {
        navigate('/iac/repository');
    };
    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        setStore(event.target?.files?.[0]);
    };

    const handleSubmit = (values: UpdateRepositoryRequest) => {
        const request: UpdateRepositoryRequest = { id: repository.id };
        if (values.name) {
            request.name = values.name;
        }
        if (store) {
            request.store = store;
        }
        update.run(request);
    };

    return (
        <>
            <PageHeader className="bg-white" title="Update Repository" onBack={goHome} />
            <Section>
                <Form {...layout} method="post" onFinish={handleSubmit} form={form}>
                    <Form.Item label="Name" name="name" initialValue={repository.name}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="File" name="store">
                        <Input type="file" name="store" onChange={handleFileUpload} />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">Update</Button>
                    </Form.Item>
                </Form>
            </Section>
        </>
    );
}
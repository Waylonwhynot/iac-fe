import { Button, Form, Input, PageHeader } from 'antd';
import { useNavigate } from 'remix';
import { Section } from '~/components';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAsync } from '~/hooks';
import { repositoryApi } from '~/api';
import { CreateRepositoryRequest } from '~/generated';


const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
}
const tailLayout = {
    wrapperCol: { offset: 2, span: 20 },
}

export default function () {
    const navigate = useNavigate();
    const [form] = Form.useForm<CreateRepositoryRequest>();
    const [store, setStore] = useState<File>();
    const create = useAsync(repositoryApi.createRepository.bind(repositoryApi));

    useEffect(() => {
        if (create.state === "COMPLETED") {
            goHome();
        }
    }, [create.state])

    const goHome = () => {
        navigate("/iac/repository");
    }
    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        setStore(event.target?.files?.[0]);
    };

    const handleSubmit = (values: CreateRepositoryRequest) => {
        console.log('values: ', values);
        if (values.name && store) {
            const request = {name: values.name, store}
            create.run(request)
        }
    }

    return (
        <>
            <PageHeader className="bg-white" title="Create Repository" onBack={goHome} />
            <Section>
                <Form {...layout} method="post" onFinish={handleSubmit} form={form}>
                    <Form.Item label="Name" name="name" required>
                        <Input />
                    </Form.Item>
                    <Form.Item label="File" name="store" required>
                        <Input type="file" name="store" onChange={handleFileUpload}/>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">Create</Button>
                    </Form.Item>
                </Form>
            </Section>
        </>

    );
}
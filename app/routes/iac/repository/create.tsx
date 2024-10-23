import { Button, Form, Input, PageHeader } from 'antd';
import { useNavigate } from 'remix';
import { Section } from '~/components';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAsync } from '~/hooks';
import { repositoryApi } from '~/api';
import { CreateRepositoryRequest, RepositoryCreation } from '~/generated';
import Repository from '~/routes/iac/repository/index';


const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
}
const tailLayout = {
    wrapperCol: { offset: 2, span: 20 },
}

export default function () {
    const navigate = useNavigate();
    const create = useAsync(repositoryApi.createRepository.bind(repositoryApi));

    useEffect(() => {
        if (create.state === "COMPLETED") {
            goHome();
        }
    }, [create.state])

    const goHome = () => {
        navigate("/iac/repository");
    }
    const handleSubmit = (values: RepositoryCreation) => {
        create.run({ repositoryCreation: values });
    }

    return (
        <>
            <PageHeader className="bg-white" title="Create Repository" onBack={goHome} />
            <Section>
                <Form {...layout} method="post" onFinish={handleSubmit}>
                    <Form.Item label="URL" name="url" required>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Token" name="token" required>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Provider" name="providerClass" initialValue="iac.repositories.GiteaRepositoryProvider">
                        <Input />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">Create</Button>
                    </Form.Item>
                </Form>
            </Section>
        </>

    );
}
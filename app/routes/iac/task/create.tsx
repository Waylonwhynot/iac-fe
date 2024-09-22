import { Descriptions, PageHeader, Form, Input, InputNumber, Button } from 'antd';
import { json, LoaderFunction, useLoaderData, useNavigate } from 'remix';
import { Section } from '~/components';
import { repositoryApi, taskApi } from '~/api';
import { server } from '~/api/middlewares';
import { CreateTaskRequest, Repository } from '~/generated';
import dayjs from 'dayjs';
import { useAsync } from '~/hooks';
import { useEffect } from 'react';

export const loader: LoaderFunction = async ({request}) => {
    const repositoryId = Number.parseInt(new URL(request.url).searchParams.get("repository")||"0")
    const repository = await repositoryApi.withMiddleware(server(request)).getRepository({id: repositoryId})
    return json(repository)
}

const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
}
const tailLayout = {
    wrapperCol: { offset: 2, span: 20 },
}

export default function() {
    const navigate = useNavigate()
    const repository = useLoaderData<Repository>()
    const createTask = useAsync(taskApi.createTask.bind(taskApi))

    useEffect(() => {
        if (createTask.state === "COMPLETED") {
            navigate(`/iac/task/${createTask.data?.id}`)
        }
    }, [createTask.state])

    const handleSubmit = (values: CreateTaskRequest) => {
        console.log(values);
        createTask.run({ taskCreation: {...values, repository: repository.id}})
    }


    return (
        <>
            <PageHeader className="bg-white" title="Create Task" onBack={()=>navigate("/iac/task")}/>
            <Section title="Repo Detail">
                <Descriptions column={2} bordered>
                    <Descriptions.Item label="name">{repository.name}</Descriptions.Item>
                    <Descriptions.Item label="sign">{repository.signature}</Descriptions.Item>
                    <Descriptions.Item label="create time">{dayjs(repository.createdAt).format("YYYY-MM-DD HH:mm")}</Descriptions.Item>
                    <Descriptions.Item label="update time">{dayjs(repository.updatedAt).format("YYYY-MM-DD HH:mm")}</Descriptions.Item>
                </Descriptions>
            </Section>
            <Section>
                <Form {...layout} onFinish={handleSubmit}>
                    <Form.Item label="Entrypoint" name="playbook" initialValue="site.yml" required>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Forks" name="forks" initialValue={1} required>
                        <InputNumber step={1} style={{width: "100%"}} min={1} />
                    </Form.Item>
                    <Form.Item label="Timeout(s)" name="timeout" initialValue={3600} required>
                        <InputNumber step={60} style={{width: "100%"}} min={180} />
                    </Form.Item>
                    <Form.Item label="Tags" name="tags">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Extra variables" name="extravars">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item label="Env variables" name="envvars">
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
    )
}
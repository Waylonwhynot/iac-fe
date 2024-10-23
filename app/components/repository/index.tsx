import { ReleaseSummary } from '~/generated';
import { Section } from '~/components';
import { Descriptions } from 'antd';

export const ReleaseSection = (props: { release: ReleaseSummary }) => (
    <Section title="Repo Detail">
        <Descriptions column={3} bordered>
            <Descriptions.Item label="name">{props.release.repository.displayName}</Descriptions.Item>
            <Descriptions.Item label="version">{props.release.versionName}</Descriptions.Item>
            <Descriptions.Item label="url">
                <a href={props.release.repository.url} target="_blank">{props.release.repository.url}</a>
            </Descriptions.Item>
        </Descriptions>
    </Section>
);
import { PropsWithChildren, ReactNode, useState } from 'react';
import { Card } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';

export interface SectionProps {
    title?: string;
    collapsed?: boolean;
}

export const Section = (props: PropsWithChildren<SectionProps>) => {
    const [collapsed, setCollapsed] = useState(props?.collapsed || false);
    const actions: ReactNode[] = [];
    if (props.title) {
        actions.push(<DoubleRightOutlined key="collapsed" rotate={collapsed ? 90 : 270}
                                          onClick={() => setCollapsed(!collapsed)}
        />);
    }
    if (props.title && collapsed) {
        return <Card title={props.title} actions={actions} style={{margin: 24}} />
    }
    return (
        <Card title={props.title} actions={actions} style={{ margin: 24 }}>{props.children}</Card>
    );
};
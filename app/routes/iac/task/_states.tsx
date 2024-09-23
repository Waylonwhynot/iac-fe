import { Tag } from 'antd';
import {
    CheckCircleOutlined,
    ClockCircleFilled,
    ClockCircleOutlined,
    ExclamationCircleOutlined, MinusCircleOutlined,
    SyncOutlined,
} from '@ant-design/icons';

export const states = [
    <Tag color="warning" icon={<ClockCircleFilled />}>Wait</Tag>,
    <Tag color="processing" icon={<SyncOutlined spin />}>In Progress</Tag>,
    <Tag color="success" icon={<CheckCircleOutlined />}>Success</Tag>,
    <Tag color="error" icon={<ClockCircleOutlined />}>Error</Tag>,
    <Tag color="warning" icon={<ExclamationCircleOutlined />}>Cancel</Tag>,
    <Tag color="error" icon={<MinusCircleOutlined />}>Timeout</Tag>,
];
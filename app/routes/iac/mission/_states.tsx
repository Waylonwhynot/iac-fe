import { Tag } from 'antd';
import {
    CheckCircleOutlined,
    ClockCircleFilled,
    ClockCircleOutlined, CloseCircleOutlined, DisconnectOutlined,
    ExclamationCircleOutlined, LogoutOutlined, MinusCircleOutlined,
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

export const taskStates = [
    <Tag color="success" icon={<CheckCircleOutlined />}>Ok</Tag>,
    <Tag color="error" icon={<CloseCircleOutlined />}>Failed</Tag>,
    <Tag color="default" icon={<LogoutOutlined />}>SKIPPED</Tag>,
    <Tag color="error" icon={<DisconnectOutlined />}>UNREACHABLE</Tag>,
];
import React from 'react';
import { Table, Typography, Avatar } from 'antd';
import { useGetAllEventQuery } from '../../Redux/Apis/eventApis';
import { url } from '../../Utils/BaseUrl';

const { Text } = Typography;

const TopEvent = () => {
    const { data } = useGetAllEventQuery({})
    console.log(data)
    const columns = [
        {
            title: 'Event Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={`${url}/${record.event_image?.[0]}`} style={{ marginRight: 8 }} />
                    {text}
                </div>
            ),
        },
        {
            title: 'Total',
            dataIndex: 'favorites',
            key: 'favorites',
        },
    ];

    return (
        <div className='card-shadow w-full h-full rounded-md'>
            <Text className='p-1 ml-3' strong>Top Event</Text>
            <Table
                dataSource={data?.data?.result?.slice(0, 5) || 0}
                columns={columns}
                pagination={false}
                bordered={false}
                showHeader
            />
        </div>
    );
};

export default TopEvent;

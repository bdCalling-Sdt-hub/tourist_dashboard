import React from 'react';
import { Table, Typography, Avatar } from 'antd';

const { Text } = Typography;

const TopEvent = () => {
    const dataSource = [
        {
            key: '1',
            serial: '01',
            image: 'https://example.com/image-music.jpg', // Replace with actual image URL
            eventName: 'Music',
            total: 84,
        },
        {
            key: '2',
            serial: '02',
            image: 'https://example.com/image-food-drink.jpg', // Replace with actual image URL
            eventName: 'Food & Drink',
            total: 67,
        },
        {
            key: '3',
            serial: '03',
            image: 'https://example.com/image-arts-culture.jpg', // Replace with actual image URL
            eventName: 'Arts & Culture',
            total: 52,
        },
    ];

    const columns = [
        {
            title: 'SL no.',
            dataIndex: 'serial',
            key: 'serial',
        },
        {
            title: 'Event Name',
            dataIndex: 'eventName',
            key: 'eventName',
            render: (text, record) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={record.image} style={{ marginRight: 8 }} />
                    {text}
                </div>
            ),
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
        },
    ];

    return (
        <div className='card-shadow w-full h-full rounded-md'>
            <Text className='p-1 ml-3' strong>Top Event</Text>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                bordered={false}
                showHeader
            />
        </div>
    );
};

export default TopEvent;

import React from 'react';
import { Table, Button, Badge, Tooltip } from 'antd';
import { DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

const dataSource = [
    {
        key: '1',
        serialNo: '#1233',
        place: 'Costa Rica',
        eventItem: '/path/to/event1.png', // Replace with the actual image path
        category: 'Music',
        startTime: '10/06/24',
        startingDate: '10/06/24',
        endTime: 'at 7:45 PM',
        status: 'Active',
    },
    {
        key: '2',
        serialNo: '#1233',
        place: 'Costa Rica',
        eventItem: '/path/to/event2.png',
        category: 'Food & Drink',
        startTime: '10/06/24',
        startingDate: '10/06/24',
        endTime: 'at 8:45 PM',
        status: 'Upcoming',
    },
    {
        key: '3',
        serialNo: '#1233',
        place: 'Costa Rica',
        eventItem: '/path/to/event3.png',
        category: 'Arts & Culture',
        startTime: '10/06/24',
        startingDate: '10/06/24',
        endTime: 'at 8:45 PM',
        status: 'Active',
    },
    {
        key: '4',
        serialNo: '#1233',
        place: 'Costa Rica',
        eventItem: '/path/to/event4.png',
        category: 'Sports',
        startTime: '10/06/24',
        startingDate: '10/06/24',
        endTime: 'at 8:45 PM',
        status: 'Completed',
    },
    {
        key: '5',
        serialNo: '#1233',
        place: 'Costa Rica',
        eventItem: '/path/to/event5.png',
        category: 'Outdoor Activities',
        startTime: '10/06/24',
        startingDate: '10/06/24',
        endTime: 'at 8:45 PM',
        status: 'Upcoming',
    },
];

const EventManagementTable = () => {
    const columns = [
        {
            title: 'SL no.',
            dataIndex: 'serialNo',
            key: 'serialNo',
        },
        {
            title: 'Place',
            dataIndex: 'place',
            key: 'place',
        },
        {
            title: 'Event Item',
            key: 'eventItem',
            render: (_, record) => (
                <img
                    src={`https://i.ibb.co.com/4WtRdgz/audience-1853662-1280.jpg`}
                    alt="Event"
                    className="w-12 h-12 object-cover rounded-md"
                />
            ),
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Start Time',
            dataIndex: 'startTime',
            key: 'startTime',
        },
        {
            title: 'Starting Date',
            dataIndex: 'startingDate',
            key: 'startingDate',
        },
        {
            title: 'End Time',
            dataIndex: 'endTime',
            key: 'endTime',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color;
                if (status === 'Active') color = 'green';
                else if (status === 'Upcoming') color = 'yellow';
                else if (status === 'Completed') color = 'blue';
                return <Badge color={color} text={status} />;
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div className="flex space-x-2">
                    <Tooltip title="Approve">
                        <Button
                            type="primary"
                            icon={<CheckOutlined />}
                            className="bg-green-500 border-none hover:bg-green-600"
                        />
                    </Tooltip>
                    <Tooltip title="Disapprove">
                        <Button
                            type="primary"
                            danger
                            icon={<CloseOutlined />}
                            className="bg-yellow-500 text-black border-none hover:bg-yellow-600"
                        />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button
                            type="primary"
                            danger
                            icon={<DeleteOutlined />}
                            className="bg-red-500 border-none hover:bg-red-600"
                        />
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{
                pageSize: 5,
                showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total}`,
                position: ['bottomCenter'],
            }}
        />
    );
};

export default EventManagementTable;

import React, { useState } from 'react';
import { Table, Button, Badge, Tooltip, Modal, Input, Form, DatePicker } from 'antd';
import { DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import moment from 'moment';

const initialData = [
    {
        key: '1',
        serialNo: '#1233',
        place: 'Costa Rica',
        eventItem: '/path/to/event1.png',
        category: 'Music',
        startTime: '10/06/24',
        startingDate: '10/06/24',
        endTime: 'at 7:45 PM',
        status: 'Active',
        featured: true,
        featuredEndDate: '2024-12-31',
        viewedBy: '14 People'
    },
    {
        key: '2',
        serialNo: '#1234',
        place: 'Costa Rica',
        eventItem: '/path/to/event2.png',
        category: 'Music',
        startTime: '10/06/24',
        startingDate: '10/06/24',
        endTime: 'at 7:45 PM',
        status: 'Active',
        featured: false,
        featuredEndDate: null,
        viewedBy: '18 People'
    },
];

const EventManagementTable = () => {
    const [dataSource, setDataSource] = useState(initialData);
    const [isDisapproveModalVisible, setIsDisapproveModalVisible] = useState(false);
    const [isFeaturedModalVisible, setIsFeaturedModalVisible] = useState(false);
    const [disapproveReason, setDisapproveReason] = useState('');
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [featuredEndDate, setFeaturedEndDate] = useState(null);

    const handleDisapproveClick = (record) => {
        setSelectedRecord(record);
        setIsDisapproveModalVisible(true);
    };

    const handleDisapproveModalOk = () => {
        console.log('Disapprove reason:', disapproveReason);
        console.log('Record:', selectedRecord);
        setIsDisapproveModalVisible(false);
        setDisapproveReason('');
        setSelectedRecord(null);
    };

    const handleDisapproveModalCancel = () => {
        setIsDisapproveModalVisible(false);
        setDisapproveReason('');
        setSelectedRecord(null);
    };

    const toggleFeaturedStatus = (record) => {
        if (!record.featured) {
            setSelectedRecord(record);
            setIsFeaturedModalVisible(true);
        } else {
            updateFeaturedStatus(record, null, false);
        }
    };

    const updateFeaturedStatus = (record, endDate, isFeatured) => {
        setDataSource((prevData) =>
            prevData.map((item) =>
                item.key === record.key
                    ? { ...item, featured: isFeatured, featuredEndDate: endDate }
                    : item
            )
        );
        setIsFeaturedModalVisible(false);
        setFeaturedEndDate(null);
        setSelectedRecord(null);
    };

    const handleFeaturedFormSubmit = () => {
        if (featuredEndDate) {
            updateFeaturedStatus(selectedRecord, featuredEndDate.format('YYYY-MM-DD'), true);
        }
    };

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
            render: () => (
                <img
                    src="https://i.ibb.co/4WtRdgz/audience-1853662-1280.jpg"
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
            title: 'Viewed By',
            dataIndex: 'viewedBy',
            key: 'viewedBy',
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
            title: 'Featured',
            key: 'featured',
            render: (_, record) => (
                <Button
                    style={{ width: '110px' }}
                    type="text"
                    className={`${record.featured ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        } px-3 py-1 rounded-md`}
                    onClick={() => toggleFeaturedStatus(record)}
                >
                    {record.featured ? 'Featured' : 'Normal'}
                </Button>
            ),
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
                            onClick={() => handleDisapproveClick(record)}
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
        <>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={{
                    pageSize: 5,
                    showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total}`,
                    position: ['bottomCenter'],
                }}
            />

            {/* Disapprove Modal */}
            <Modal
                title="Disapprove Event"
                visible={isDisapproveModalVisible}
                onOk={handleDisapproveModalOk}
                onCancel={handleDisapproveModalCancel}
                okText="Submit"
                cancelText="Cancel"
                centered
            >
                <p>Please provide a reason for disapproval:</p>
                <Input.TextArea
                    value={disapproveReason}
                    onChange={(e) => setDisapproveReason(e.target.value)}
                    placeholder="Enter reason here"
                    rows={4}
                />
            </Modal>

            {/* Featured End Date Modal */}
            <Modal
                title="Set Featured End Date"
                visible={isFeaturedModalVisible}
                onOk={handleFeaturedFormSubmit}
                onCancel={() => setIsFeaturedModalVisible(false)}
                okText="Confirm"
                cancelText="Cancel"
                centered
            >
                <Form layout="vertical">
                    <Form.Item
                        label="Featured End Date"
                        rules={[{ required: true, message: 'Please select a featured end date!' }]}
                    >
                        <DatePicker
                            style={{ width: '100%' }}
                            disabledDate={(current) => current && current < moment().endOf('day')}
                            onChange={(date) => setFeaturedEndDate(date)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default EventManagementTable;

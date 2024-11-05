import React from 'react';
import { Table, Button, Modal } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import UserImageName from '../Shared/UserImageName';

const dataSource = [
    {
        key: '1',
        serialNo: '#1233',
        userName: 'Kathryn Murp',
        category: 'Live Music',
        contactNumber: '(201) 555-0124',
        email: 'bockley@att.com',
        dob: '4/4/04',
        location: 'West Greenwich, RI7',
        eventAdd: 24,
    },
    {
        key: '2',
        serialNo: '#1233',
        userName: 'Devon Lane',
        category: 'Comedy',
        contactNumber: '(219) 555-0114',
        email: 'csilvers@rizon.com',
        dob: '9/23/08',
        location: 'Jericho, NY 11753',
        eventAdd: 22,
    },
    // Add more data entries as needed...
];

const UserTable = () => {
    const [isBlockModalVisible, setIsBlockModalVisible] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState(null);

    const showBlockModal = (record) => {
        setSelectedUser(record);
        setIsBlockModalVisible(true);
    };

    const handleBlockConfirm = () => {
        console.log(`User blocked: ${selectedUser.userName}`);
        setIsBlockModalVisible(false);
        setSelectedUser(null);
    };

    const handleBlockCancel = () => {
        setIsBlockModalVisible(false);
        setSelectedUser(null);
    };

    const columns = [
        {
            title: 'SL no.',
            dataIndex: 'serialNo',
            key: 'serialNo',
            className: 'text-center font-semibold',
        },
        {
            title: "User's Name",
            dataIndex: 'userName',
            key: 'userName',
            render: (text) => <UserImageName name={text} image={null} />
        },
        {
            title: 'Event Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Contact Number',
            dataIndex: 'contactNumber',
            key: 'contactNumber',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Date of Birth',
            dataIndex: 'dob',
            key: 'dob',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Event add',
            dataIndex: 'eventAdd',
            key: 'eventAdd',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button
                    type="primary"
                    danger
                    icon={<StopOutlined />}
                    className="bg-red-500 border-none hover:bg-red-600"
                    onClick={() => showBlockModal(record)}
                >
                    Block
                </Button>
            ),
        },
    ];

    return (
        <div className="p-4">
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={{
                    pageSize: 10,
                    total: 1239,
                    showTotal: (total, range) => `Showing ${range[0]}-${range[1]} out of ${total}`,
                    position: ['bottomCenter'],
                    itemRender: (page, type, originalElement) => {
                        if (type === 'prev') {
                            return <a>Previous</a>;
                        }
                        if (type === 'next') {
                            return <a>Next</a>;
                        }
                        return originalElement;
                    },
                }}
            />

            {/* Block Confirmation Modal */}
            <Modal
                title="Confirm Block"
                visible={isBlockModalVisible}
                onOk={handleBlockConfirm}
                onCancel={handleBlockCancel}
                okText="Confirm"
                cancelText="Cancel"
                centered
            >
                <p>Are you sure you want to block {selectedUser?.userName}?</p>
            </Modal>
        </div>
    );
};

export default UserTable;

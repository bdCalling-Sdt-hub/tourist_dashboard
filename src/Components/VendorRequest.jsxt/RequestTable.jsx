import React, { useState } from 'react';
import { Button, Table, Modal, Input } from 'antd';

const { TextArea } = Input;

const dataSource = [
  {
    key: '1',
    serialNo: '#1233',
    userName: 'Kathryn Murp',
    email: 'ca@gmail.com',
    contact: '+122333',
  },
  {
    key: '2',
    serialNo: '#1233',
    userName: 'Devon Lane',
    email: 'ca@gmail.com',
    contact: '+1557296',
  },
  {
    key: '3',
    serialNo: '#1233',
    userName: 'Foysal Rahman',
    email: 'ca@gmail.com',
    contact: '+184230',
  },
];

const RequestTable = () => {
  const [isApproveModalVisible, setApproveModalVisible] = useState(false);
  const [isCancelModalVisible, setCancelModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

  const handleApprove = (record) => {
    setSelectedRecord(record);
    setApproveModalVisible(true);
  };

  const handleCancel = (record) => {
    setSelectedRecord(record);
    setCancelModalVisible(true);
  };

  const confirmApprove = () => {
    // Handle approval logic here
    console.log(`Approved user: ${selectedRecord.userName}`);
    setApproveModalVisible(false);
    setSelectedRecord(null);
  };

  const confirmCancel = () => {
    // Handle cancellation logic here
    console.log(`Cancelled user: ${selectedRecord.userName} for reason: ${cancelReason}`);
    setCancelModalVisible(false);
    setSelectedRecord(null);
    setCancelReason("");
  };

  const columns = [
    {
      title: 'SL no.',
      dataIndex: 'serialNo',
      key: 'serialNo',
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button
            type="primary"
            className="bg-green-500 border-none hover:bg-green-600"
            onClick={() => handleApprove(record)}
          >
            Approve
          </Button>
          <Button
            type="primary"
            danger
            className="bg-red-500 border-none hover:bg-red-600"
            onClick={() => handleCancel(record)}
          >
            Cancel
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Table dataSource={dataSource} columns={columns} pagination={false} />

      {/* Approve Modal */}
      <Modal
        title="Confirm Approval"
        visible={isApproveModalVisible}
        onCancel={() => setApproveModalVisible(false)}
        footer={[
          <Button
            key="cancel"
            onClick={() => setApproveModalVisible(false)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700"
          >
            Cancel
          </Button>,
          <Button
            key="confirm"
            onClick={confirmApprove}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Confirm
          </Button>,
        ]}
        centered
      >
        <p>Are you sure you want to approve {selectedRecord?.userName}?</p>
      </Modal>

      {/* Cancel Modal */}
      <Modal
        title="Confirm Cancellation"
        visible={isCancelModalVisible}
        onCancel={() => setCancelModalVisible(false)}
        footer={[
          <Button
            key="back"
            onClick={() => setCancelModalVisible(false)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700"
          >
            Back
          </Button>,
          <Button
            key="confirm"
            onClick={confirmCancel}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Confirm
          </Button>,
        ]}
        centered
      >
        <p>Are you sure you want to cancel {selectedRecord?.userName}?</p>
        <TextArea
          rows={4}
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
          placeholder="Please provide a reason for cancellation"
        />
      </Modal>
    </div>
  );
};

export default RequestTable;

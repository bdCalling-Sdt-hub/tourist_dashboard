import React, { useState } from 'react';
import { Button, Table, Modal, Input } from 'antd';
import { useAcceptVendorMutation, useDeclineRequestMutation, useGetAllVendorQuery } from '../../Redux/Apis/vendorApis';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const { TextArea } = Input;

const RequestTable = () => {
  const { data, isLoading } = useGetAllVendorQuery();
  const [approve, { isLoading: Loading }] = useAcceptVendorMutation();
  const [declined] = useDeclineRequestMutation();
  const [isApproveModalVisible, setApproveModalVisible] = useState(false);
  const [isCancelModalVisible, setCancelModalVisible] = useState(false);
  const [isDetailsModalVisible, setDetailsModalVisible] = useState(false);  // State for details modal
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const location = useLocation();

  const handleApprove = (record) => {
    setSelectedRecord(record);
    setApproveModalVisible(true);
  };

  const handleCancel = (record) => {
    setSelectedRecord(record);
    setCancelModalVisible(true);
  };

  const handlerDetails = (record) => {
    setSelectedRecord(record);
    setDetailsModalVisible(true); // Open the details modal
  };

  const confirmApprove = () => {
    approve(selectedRecord._id)
      .unwrap()
      .then((res) => {
        toast.success(res.message || 'Request Approved');
      })
      .catch((err) => {
        toast.error(err?.data?.message || 'Something Went wrong');
      });
    setApproveModalVisible(false);
    setSelectedRecord(null);
  };

  const confirmCancel = () => {
    declined({ id: selectedRecord._id, reasons: cancelReason, status: 'declined' })
      .unwrap()
      .then((res) => {
        toast.success(res.message || 'Request declined');
      })
      .catch((err) => {
        toast.error(err?.data?.message || 'Something Went wrong');
      });
    setCancelModalVisible(false);
    setSelectedRecord(null);
    setCancelReason('');
  };

  const columns = [
    {
      title: 'User Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Contact',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button
            type="primary"
            className="bg-yellow-500 border-none hover:bg-yellow-600"
            onClick={() => handlerDetails(record)} // Handle details button click
          >
            Details
          </Button>
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
      <Table
        dataSource={location.pathname === '/' ? data?.data?.slice(0, 4) : data?.data || []}
        columns={columns}
        pagination={false}
      />

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
        <p>Are you sure you want to approve {selectedRecord?.name}?</p>
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
        <p>Are you sure you want to cancel {selectedRecord?.name}?</p>
        <TextArea
          rows={4}
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
          placeholder="Please provide a reason for cancellation"
        />
      </Modal>

      {/* Details Modal */}
      <Modal
        title="Vendor Details"
        visible={isDetailsModalVisible}
        onCancel={() => setDetailsModalVisible(false)}
        footer={[
          <Button
            key="close"
            onClick={() => setDetailsModalVisible(false)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700"
          >
            Close
          </Button>,
        ]}
        centered
      >
        {selectedRecord && (
          <div>
            <p><strong>Name:</strong> {selectedRecord.name}</p>
            <p><strong>Email:</strong> {selectedRecord.email}</p>
            <p><strong>Phone:</strong> {selectedRecord.phone_number}</p>
            <p><strong>Address:</strong> {selectedRecord.address}</p>
            <p><strong>Description:</strong> <span dangerouslySetInnerHTML={{ __html: selectedRecord.description }} /></p>
            <h3>Questions</h3>
            <ul>
              {selectedRecord.questions.map((q, index) => (
                <li key={index}>
                  <strong>{q.question}:</strong> {q.answer}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RequestTable;

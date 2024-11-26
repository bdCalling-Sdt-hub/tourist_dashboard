import React, { useState } from 'react';
import { Button, Table, Modal, Input } from 'antd';
import { useAcceptVendorMutation, useDeclineRequestMutation, useGetAllVendorQuery } from '../../Redux/Apis/vendorApis';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
const { TextArea } = Input;
const RequestTable = () => {
  const { data, isLoading } = useGetAllVendorQuery()
  const [approve, { isLoading: Loading }] = useAcceptVendorMutation()
  const [declined,] = useDeclineRequestMutation()
  const [isApproveModalVisible, setApproveModalVisible] = useState(false);
  const [isCancelModalVisible, setCancelModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const location = useLocation()
  const handleApprove = (record) => {
    setSelectedRecord(record);
    setApproveModalVisible(true);
  };

  const handleCancel = (record) => {
    setSelectedRecord(record);
    setCancelModalVisible(true);
  };

  const confirmApprove = () => {
    approve(selectedRecord._id).unwrap()
      .then(res => {
        toast.success(res.message || 'Request Approved')
      }).catch(err => {
        toast.error(err?.data?.message || 'Something Went wrong')
      })
    setApproveModalVisible(false);
    setSelectedRecord(null);
  };

  const confirmCancel = () => {
    declined({ id: selectedRecord._id, reasons: cancelReason, status: 'declined' }).unwrap()
      .then(res => {
        console.log(res)
        toast.success(res.message || 'Request declined')
      }).catch(err => {
        console.log(err)
        toast.error(err?.data?.message || 'Something Went wrong')
      })
    setCancelModalVisible(false);
    setSelectedRecord(null);
    setCancelReason("");
  };

  const columns = [
    // {
    //   title: 'SL no.',
    //   dataIndex: 'serialNo',
    //   key: 'serialNo',
    // },
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
      <Table dataSource={location.pathname == '/' ? data?.data?.slice(0, 4) : data?.data || []} columns={columns} pagination={false} />
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
    </div>
  );
};

export default RequestTable;

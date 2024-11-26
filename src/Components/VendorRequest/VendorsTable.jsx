import React, { useState } from 'react';
import { Table, Button, Dropdown, Menu, Tooltip } from 'antd';
import UserImageName from '../Shared/UserImageName';
import { useDeclineRequestMutation } from '../../Redux/Apis/vendorApis';
import toast from 'react-hot-toast';
const VendorsTable = ({ data, meta, setPage, loading }) => {
  const [activeDeActive,] = useDeclineRequestMutation()
  const toggleStatus = (record) => {
    activeDeActive({ id: record._id, reasons: '', status: record?.status === 'approved' ? 'deactivate' : 'approved' }).unwrap()
      .then(res => {
        toast.success(res.message || `Vendor declined ${record?.status === 'approved' ? 'deactivated' : 'activated'}}`)
      }).catch(err => {
        toast.error(err?.data?.message || 'Something Went wrong')
      })
  };

  console.log(meta)
  const columns = [
    // {
    //   title: 'S no.',
    //   dataIndex: 'serialNo',
    //   key: 'serialNo',
    //   className: 'text-center font-semibold',
    // },
    {
      title: 'Name',
      key: 'name',
      render: (_, record) => < UserImageName name={record?.name} image={record?.business_profile} />,
    },
    {
      title: 'Contact Number',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    // {
    //   title: 'Date',
    //   dataIndex: 'date',
    //   key: 'date',
    // },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <Button
            style={{
              width: '110px'
            }}
            type="text"
            className={`${record.status === 'approved'
              ? 'bg-green-100 text-green-600'
              : 'bg-red-100 text-red-600'
              } px-3 py-1 rounded-md`}
            onClick={() => toggleStatus(record)}
          >
            {record.status === 'active' ? 'Activate' : 'Deactivate'}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 bg-gray-100">
      <Table loading={loading}
        dataSource={data || []}
        columns={columns}
        pagination={{
          pageSize: meta?.limit,
          total: meta?.total,
          onChange: (page) => setPage(page),
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
    </div>
  );
};

export default VendorsTable;

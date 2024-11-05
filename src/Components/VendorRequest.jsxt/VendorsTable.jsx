import React, { useState } from 'react';
import { Table, Button, Dropdown, Menu, Tooltip } from 'antd';
import { DownOutlined, EyeOutlined } from '@ant-design/icons';
import UserImageName from '../Shared/UserImageName';

const dataSource = [
  {
    key: '1',
    serialNo: '1',
    name: 'Hawaiian Music',
    subtitle: 'Costa ricaA',
    contactNumber: '+1 (229) 555-0109',
    date: '05/12/2024',
    email: 'cgcra@yahoo.com',
    status: 'active',
  },
  {
    key: '2',
    serialNo: '2',
    name: 'Hawaiian Sports',
    subtitle: 'Costa ricaA',
    contactNumber: '+1 (229) 555-0109',
    date: '05/12/2024',
    email: 'cgcra@yahoo.com',
    status: 'inactive',
  },
];

const VendorsTable = () => {
  const [data, setData] = useState(dataSource);

  const toggleStatus = (record) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === record.key
          ? { ...item, status: item.status === 'active' ? 'inactive' : 'active' }
          : item
      )
    );
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">Option 1</Menu.Item>
      <Menu.Item key="2">Option 2</Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: 'S no.',
      dataIndex: 'serialNo',
      key: 'serialNo',
      className: 'text-center font-semibold',
    },
    {
      title: 'Name',
      key: 'name',
      render: (_, record) => < UserImageName name={record?.name} image={null}/>,
    },
    {
      title: 'Contact Number',
      dataIndex: 'contactNumber',
      key: 'contactNumber',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
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
            width:'110px'
          }}
            type="text"
            className={`${
              record.status === 'active'
                ? 'bg-green-100 text-green-600'
                : 'bg-red-100 text-red-600'
            } px-3 py-1 rounded-md`}
            onClick={() => toggleStatus(record)}
          >
            {record.status === 'active' ? 'Activate' : 'Deactivate'}
          </Button>

          <Dropdown overlay={menu}>
            <Button type="text" className="border border-gray-300 rounded-md">
              <DownOutlined />
            </Button>
          </Dropdown>

          {/* <Tooltip title="View Details">
            <Button
              type="text"
              icon={<EyeOutlined />}
              className="text-gray-600 hover:text-gray-800"
            />
          </Tooltip> */}
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 bg-gray-100">
      <Table
        dataSource={data}
        columns={columns}
        pagination={{
          pageSize: 10,
          total: data.length,
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
